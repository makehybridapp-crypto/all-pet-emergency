/**
 * CDN URL 변환 유틸리티
 * 
 * Cloudflare Workers가 Supabase Storage를 프록시하는 구조:
 * - Workers URL: https://twilight-shape-6c41.appaipet.workers.dev/aipet_images/pets/...
 * - 실제 요청: https://ucyotrsmsztivnqjmpge.supabase.co/storage/v1/object/public/aipet_images/pets/...
 */

const CDN_BASE_URL = 'https://twilight-shape-6c41.appaipet.workers.dev';
const SUPABASE_PROJECT_URL = 'https://ucyotrsmsztivnqjmpge.supabase.co';
const STORAGE_PREFIX = '/storage/v1/object/public';

/**
 * Supabase Storage URL에서 경로만 추출
 * 
 * @param supabaseUrl - Supabase Storage URL
 *   예시: https://ucyotrsmsztivnqjmpge.supabase.co/storage/v1/object/public/aipet_images/pets/808be194-09ab-4d3f-bc1a-6ab20e9e4b1e/1764485407545_944659d1-c716-4743-b357-c88a5e29adeb.png
 * @returns 경로 (예: aipet_images/pets/808be194-09ab-4d3f-bc1a-6ab20e9e4b1e/1764485407545_944659d1-c716-4743-b357-c88a5e29adeb.png)
 */
function extractStoragePath(supabaseUrl: string): string | null {
  // /storage/v1/object/public/ 이후의 모든 경로를 추출
  const storagePathMatch = supabaseUrl.match(/\/storage\/v1\/object\/public\/(.+)$/);
  return storagePathMatch && storagePathMatch[1] ? storagePathMatch[1] : null;
}

/**
 * Supabase Storage URL을 Cloudflare Workers CDN URL로 변환
 * 
 * Workers는 경로만 받아서 자동으로 Supabase Storage로 프록시합니다.
 * 
 * @param supabaseUrl - Supabase Storage URL
 *   예시: https://ucyotrsmsztivnqjmpge.supabase.co/storage/v1/object/public/aipet_images/pets/808be194-09ab-4d3f-bc1a-6ab20e9e4b1e/1764485407545_944659d1-c716-4743-b357-c88a5e29adeb.png
 * @param useCdn - CDN 사용 여부 (기본값: true)
 * @returns CDN URL 또는 원본 Supabase URL
 */
export function convertToCdnUrl(supabaseUrl: string | null, useCdn: boolean = true): string | null {
  if (!supabaseUrl) {
    return null;
  }

  // 이미 CDN URL인 경우 그대로 반환
  if (supabaseUrl.includes('workers.dev')) {
    return supabaseUrl;
  }

  // CDN을 사용하지 않으면 원본 URL 반환 (Workers가 안정화될 때까지)
  if (!useCdn) {
    return supabaseUrl;
  }

  // Supabase Storage URL에서 경로 추출
  const path = extractStoragePath(supabaseUrl);
  
  if (path) {
    // CDN URL로 변환 (Workers가 자동으로 Supabase Storage로 프록시)
    const cdnUrl = `${CDN_BASE_URL}/${path}`;
    console.log('🔄 Converting to CDN:', { original: supabaseUrl, cdn: cdnUrl });
    return cdnUrl;
  }

  // 매칭되지 않으면 원본 URL 반환 (fallback)
  console.warn('⚠️ Failed to convert URL to CDN:', supabaseUrl);
  return supabaseUrl;
}

/**
 * CDN URL을 Supabase Storage URL로 역변환 (디버깅용)
 * 
 * @param cdnUrl - CDN URL
 * @returns Supabase Storage URL
 */
export function convertCdnToSupabaseUrl(cdnUrl: string | null): string | null {
  if (!cdnUrl) {
    return null;
  }

  // 이미 Supabase URL인 경우 그대로 반환
  if (cdnUrl.includes('supabase.co')) {
    return cdnUrl;
  }

  // CDN URL에서 경로 추출
  const cdnUrlObj = new URL(cdnUrl);
  const path = cdnUrlObj.pathname.startsWith('/') 
    ? cdnUrlObj.pathname.slice(1) 
    : cdnUrlObj.pathname;

  if (path) {
    return `${SUPABASE_PROJECT_URL}${STORAGE_PREFIX}/${path}`;
  }

  return cdnUrl;
}

/**
 * 여러 URL을 일괄 변환
 */
export function convertUrlsToCdn(urls: (string | null)[]): (string | null)[] {
  return urls.map(url => convertToCdnUrl(url));
}

