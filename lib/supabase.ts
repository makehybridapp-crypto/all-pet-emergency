import { createClient } from '@supabase/supabase-js';
import { convertToCdnUrl } from './cdn';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // 공개 페이지이므로 세션 불필요
  },
});

/**
 * 긴급 카드 타입 정의
 */
export interface EmergencyCard {
  id: string;
  pet_id: string;
  public_pet_name: string | null;
  public_owner_phone: string | null;
  public_vet_info: string | null;
  public_notes: string | null;
  nfc_enabled: boolean;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * 긴급 카드 조회 (공개 API)
 */
export async function getEmergencyCard(cardId: string): Promise<EmergencyCard | null> {
  console.log('🔍 Fetching emergency card:', cardId);
  console.log('📡 Supabase URL:', supabaseUrl);
  console.log('🔑 Anon Key exists:', !!supabaseAnonKey);
  
  const { data, error } = await supabase
    .from('emergency_cards')
    .select('*')
    .eq('id', cardId)
    .maybeSingle();

  if (error) {
    console.error('❌ Error fetching emergency card:', error);
    return null;
  }

  if (!data) {
    console.log('⚠️ No card found with ID:', cardId);
    return null;
  }

  console.log('✅ Card found:', data.public_pet_name);
  
  // avatar_url을 CDN URL로 변환
  const card = data as EmergencyCard;
  if (card.avatar_url) {
    // 환경 변수로 제어 가능, 기본값은 true (CDN 사용)
    const useCdn = process.env.NEXT_PUBLIC_USE_CDN !== 'false';
    card.avatar_url = convertToCdnUrl(card.avatar_url, useCdn);
  }
  
  return card;
}

