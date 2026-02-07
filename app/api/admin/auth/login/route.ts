import { prisma } from '@/lib/prisma';
import { createAdminSession } from '@/lib/auth-admin';
import { sendApprovalEmail } from '@/lib/email';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

const INITIAL_ADMIN_EMAILS = [
    process.env.INITIAL_ADMIN_1 || 'mabdulrasheedtalal@gmail.com',
    process.env.INITIAL_ADMIN_2 || 'aliraza.dev.crusader@gmail.com',
];

const INITIAL_PASSWORD = process.env.INITIAL_ADMIN_PASSWORD || '@lira$heedrazatalal129';
const APPROVAL_PASSWORD = process.env.APPROVAL_PASSWORD || '@team_website@dmim$12';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;
        const ip = (req.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];

        // Log attempt (optional but good practice)
        console.log(`Admin login attempt: ${email} from ${ip}`);
        console.log(`Debug: INITIAL_PASSWORD length = ${INITIAL_PASSWORD?.length}`);
        console.log(`Debug: APPROVAL_PASSWORD length = ${APPROVAL_PASSWORD?.length}`);
        console.log(`Debug: Submitted password length = ${password?.length}`);

        // --- CASE 1: ALI RAZA OR ABDUL RASHEED (Initial Admins) ---
        if (INITIAL_ADMIN_EMAILS.includes(email)) {
            if (password === INITIAL_PASSWORD) {
                // Background attempt to sync with DB, but don't block login
                try {
                    const existing = await prisma.approvedAdmin.findUnique({ where: { email } });
                    if (!existing) {
                        await prisma.approvedAdmin.create({
                            data: { email, approvedBy: 'system' }
                        });
                    }
                } catch (dbError) {
                    console.error("Database sync failed for initial admin, proceeding with session anyway:", dbError);
                }

                const secretPath = process.env.SECRET_ADMIN_PATH || 'admin-$ecret-P@nel';
                await createAdminSession(email);
                return NextResponse.json({ success: true, redirect: `/${secretPath}/dashboard` });
            } else {
                return NextResponse.json({ success: false, message: 'Wrong password' }, { status: 401 });
            }
        }

        // --- CASE 2: NEW USER (WAITING FOR APPROVAL) ---
        if (password === APPROVAL_PASSWORD) {
            // Check if already approved
            const isApproved = await prisma.approvedAdmin.findUnique({ where: { email } });
            if (isApproved) {
                await createAdminSession(email);
                return NextResponse.json({ success: true, redirect: '/admin/dashboard' });
            }

            // Check if already pending
            const existingRequest = await prisma.pendingRequest.findUnique({ where: { email } });
            if (!existingRequest) {
                // Store request in database
                await prisma.pendingRequest.create({
                    data: { email }
                });

                // Send email to BOTH our emails
                await Promise.all(
                    INITIAL_ADMIN_EMAILS.map((adminEmail) =>
                        sendApprovalEmail(adminEmail, email, 'registration') // Simplified ID or handle appropriately
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
