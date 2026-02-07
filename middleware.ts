import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the path is the secret admin path
    const secretPath = process.env.SECRET_ADMIN_PATH || 'admin-$ecret-P@nel';

    if (pathname.startsWith(`/${secretPath}`)) {
        // Allow access to the login page itself
        if (pathname === `/${secretPath}`) {
            return NextResponse.next();
        }

        // Allow access to api routes (they handle their own auth or are used by login)
        // Actually, we want to protect dashboard and other pages. API routes usually have their own checks,
        // but double protection is good. However, login API needs to be accessible.
        // Let's protect "pages" specifically or verify session for everything except login.

        // Get the session cookie
        const session = request.cookies.get('admin_session')?.value;

        if (!session) {
            // Redirect to login if no session
            return NextResponse.redirect(new URL(`/${secretPath}`, request.url));
        }

        try {
            // Verify JWT
            const secret = process.env.ADMIN_SESSION_SECRET || 'secret';
            const key = new TextEncoder().encode(secret);
            await jwtVerify(session, key);
            return NextResponse.next();
        } catch (error) {
            // Invalid token
            return NextResponse.redirect(new URL(`/${secretPath}`, request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
