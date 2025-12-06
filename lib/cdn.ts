/**
 * CDN URL 변환 유틸리티
 */

const CDN_BASE_URL = 'https://twilight-shape-6c41.appaipet.workers.dev';

/**
 * Supabase Storage URL을 Cloudflare Workers CDN URL로 변환
 * 
 * @param supabaseUrl - Supabase Storage URL (예: https://ucyotrsmsztivnqjmpge.supabase.co/storage/v1/object/public/aipet/avatars/pet-1762509905202.png)
 * @returns CDN URL (예: https://twilight-shape-6c41.appaipet.workers.dev/aipet/avatars/pet-1762509905202.png)
 */
export function convertToCdnUrl(supabaseUrl: string | null): string | null {
  if (!supabaseUrl) {
    return null;
  }

  // 이미 CDN URL인 경우 그대로 반환
  if (supabaseUrl.includes('workers.dev')) {
    return supabaseUrl;
  }

  // Supabase Storage URL에서 경로 추출
  // 예: https://ucyotrsmsztivnqjmpge.supabase.co/storage/v1/object/public/aipet/avatars/pet-1762509905202.png
  // → /aipet/avatars/pet-1762509905202.png
  const storagePathMatch = supabaseUrl.match(/\/storage\/v1\/object\/public\/(.+)$/);
  
  if (storagePathMatch && storagePathMatch[1]) {
    const path = storagePathMatch[1];
    return `${CDN_BASE_URL}/${path}`;
  }

  // 매칭되지 않으면 원본 URL 반환 (fallback)
  return supabaseUrl;
}

/**
 * 여러 URL을 일괄 변환
 */
export function convertUrlsToCdn(urls: (string | null)[]): (string | null)[] {
  return urls.map(url => convertToCdnUrl(url));
}

