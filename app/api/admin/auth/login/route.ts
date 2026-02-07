import { prisma } from '@/lib/prisma';
import { createAdminSession } from '@/lib/auth-admin';
import { sendApprovalEmail } from '@/lib/email';
import { NextResponse } from 'next/server';

const INITIAL_ADMIN_EMAILS = [
    process.env.INITIAL_ADMIN_1,
    process.env.INITIAL_ADMIN_2,
].filter(Boolean) as string[];

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;
        const ip = (req.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];

        // Validate environment variables
        const initialPassword = process.env.INITIAL_ADMIN_PASSWORD;
        const approvalPassword = process.env.APPROVAL_PASSWORD;
        const secretPath = process.env.SECRET_ADMIN_PATH || 'admin-$ecret-P@nel';

        if (!initialPassword || !approvalPassword) {
            console.error("Missing Admin Environment Variables");
            return NextResponse.json({ success: false, message: 'Server Configuration Error' }, { status: 500 });
        }

        // Log attempt (optional but good practice)
        console.log(`Admin login attempt: ${email} from ${ip}`);

        // --- CASE 1: INITIAL ADMINS ---
        if (INITIAL_ADMIN_EMAILS.includes(email)) {
            if (password === initialPassword) {
                // Background attempt to sync with DB
                try {
                    const existing = await prisma.approvedAdmin.findUnique({ where: { email } });

                    // DEVICE CHECK
                    const userAgent = (req.headers.get('user-agent') || '').toLowerCase();
                    const isMobile = /mobile|android|iphone|ipad|ipod/.test(userAgent);
                    const deviceType = isMobile ? 'MOBILE' : 'DESKTOP';

                    let adminRecord = existing;

                    if (!existing) {
                        // Create new admin logic (default to DESKTOP, but for specific user set MOBILE)
                        const isMainAdmin = email === 'mabdulrasheedtalal@gmail.com';
                        adminRecord = await prisma.approvedAdmin.create({
                            data: {
                                email,
                                approvedBy: 'system',
                                allowedDevice: isMainAdmin ? 'MOBILE' : 'DESKTOP'
                            }
                        });
                    }

                    // Enforce Device Restriction
                    if (adminRecord) {
                        // Update this specific user if not set (temporary fix for existing records)
                        if (email === 'mabdulrasheedtalal@gmail.com' && adminRecord.allowedDevice !== 'MOBILE') {
                            adminRecord = await prisma.approvedAdmin.update({
                                where: { email },
                                data: { allowedDevice: 'MOBILE' }
                            });
                        }

                        if (adminRecord.allowedDevice === 'MOBILE' && !isMobile) {
                            return NextResponse.json({ success: false, message: 'Access Denied: You can only access from Mobile.' }, { status: 403 });
                        }
                        if (adminRecord.allowedDevice === 'DESKTOP' && isMobile) {
                            return NextResponse.json({ success: false, message: 'Access Denied: You can only access from PC/Laptop.' }, { status: 403 });
                        }
                    }

                } catch (dbError) {
                    console.error("Database sync/check failed:", dbError);
                    // Fallback security if DB fails? Better to fail open or closed? 
                    // Failing closed is safer for "high security".
                    return NextResponse.json({ success: false, message: 'Security Verification Failed' }, { status: 500 });
                }

                await createAdminSession(email);
                return NextResponse.json({ success: true, redirect: `/${secretPath}/dashboard` });
            } else {
                return NextResponse.json({ success: false, message: 'Wrong password' }, { status: 401 });
            }
        }

        // --- CASE 2: NEW USER (WAITING FOR APPROVAL) ---
        if (password === approvalPassword) {
            // Check if already approved
            const isApproved = await prisma.approvedAdmin.findUnique({ where: { email } });

            if (isApproved) {
                // DEVICE CHECK
                const userAgent = (req.headers.get('user-agent') || '').toLowerCase();
                const isMobile = /mobile|android|iphone|ipad|ipod/.test(userAgent);

                if (isApproved.allowedDevice === 'MOBILE' && !isMobile) {
                    return NextResponse.json({ success: false, message: 'Access Denied: You can only access from Mobile.' }, { status: 403 });
                }
                if (isApproved.allowedDevice === 'DESKTOP' && isMobile) {
                    return NextResponse.json({ success: false, message: 'Access Denied: You can only access from PC/Laptop.' }, { status: 403 });
                }

                await createAdminSession(email);
                return NextResponse.json({ success: true, redirect: `/${secretPath}/dashboard` });
            }

            // Check if already pending
            const existingRequest = await prisma.pendingRequest.findUnique({ where: { email } });
            if (!existingRequest) {
                // Store request in database
                await prisma.pendingRequest.create({
                    data: { email }
                });

                // Send email to INITIAL ADMINS
                await Promise.all(
                    INITIAL_ADMIN_EMAILS.map((adminEmail) =>
                        sendApprovalEmail(adminEmail, email, 'registration')
                    )
                );
            }

            return NextResponse.json({
                success: true,
                message: 'Waiting for approval from Ali Raza and Abdul Rasheed',
                status: 'PENDING'
            });
        }

        // --- CASE 3: WRONG PASSWORD ---
        return NextResponse.json({
            success: false,
            message: 'Wrong password'
        }, { status: 401 });

    } catch (error) {
        console.error('Admin login error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
