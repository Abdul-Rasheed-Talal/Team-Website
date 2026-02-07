import { prisma } from '@/lib/prisma'; // Assuming global prisma client exists
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const SECRET_KEY = process.env.ADMIN_SESSION_SECRET || 'secret';
const key = new TextEncoder().encode(SECRET_KEY);

export async function createAdminSession(adminEmail: string) {
    if (!process.env.ADMIN_SESSION_SECRET) {
        console.warn("Warning: ADMIN_SESSION_SECRET is not set, using default insecure secret.");
    }

    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
    const session = await new SignJWT({ adminEmail })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1day')
        .sign(key);

    const cookieStore = await cookies();
    cookieStore.set('admin_session', session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires,
        sameSite: 'lax',
        path: '/',
    });
}

export async function getAdminSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session')?.value;
    if (!session) return null;
    try {
        const { payload } = await jwtVerify(session, key);
        return payload as { adminEmail: string };
    } catch (error) {
        return null;
    }
}

export async function verifyAdmin() {
    const session = await getAdminSession();
    if (!session || !session.adminEmail) return null;

    const admin = await prisma.approvedAdmin.findUnique({
        where: { email: session.adminEmail },
    });

    return admin;
}
