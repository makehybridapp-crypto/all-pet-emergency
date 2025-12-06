import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale, isValidLocale } from './lib/i18n';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // 이미 locale이 포함된 경로인지 확인
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // 정적 파일이나 API 경로는 건너뛰기
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // locale이 없으면 기본 locale로 리다이렉트
  if (!pathnameHasLocale) {
    const locale = getLocale(request) || defaultLocale;
    const newUrl = new URL(`/${locale}${pathname}`, request.url);
    return NextResponse.redirect(newUrl);
  }

  // locale이 유효하지 않으면 기본 locale로 리다이렉트
  const pathnameLocale = pathname.split('/')[1];
  if (!isValidLocale(pathnameLocale)) {
    const newUrl = new URL(`/${defaultLocale}${pathname.replace(`/${pathnameLocale}`, '')}`, request.url);
    return NextResponse.redirect(newUrl);
  }

  // pathname을 헤더에 추가 (not-found.tsx에서 사용)
  const response = NextResponse.next();
  response.headers.set('x-pathname', pathname);
  return response;
}

function getLocale(request: NextRequest): string | null {
  // Accept-Language 헤더에서 언어 감지
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    // 브라우저 언어 설정에서 우선순위로 언어 추출
    const languages = acceptLanguage.split(',').map(lang => lang.split(';')[0].trim().toLowerCase());
    
    for (const lang of languages) {
      if (lang.startsWith('ko')) return 'ko';
      if (lang.startsWith('ja')) return 'ja';
      if (lang.startsWith('en')) return 'en';
    }
  }
  
  return null;
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

