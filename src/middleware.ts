import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['ar', 'en', 'fr', 'ur', 'id'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow static assets (including MP3) to pass through directly
  if (pathname.match(/\.(js|css|png|jpg|jpeg|svg|webp|gif|mp3|json|ico)$/i)) {
    return NextResponse.next();
  }

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Redirect if there is no locale
  request.nextUrl.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
  ],
};
