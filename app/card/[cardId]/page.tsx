import { getEmergencyCard, EmergencyCard } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import EmergencyCardView from '@/components/EmergencyCardView';

interface PageProps {
  params: Promise<{
    cardId: string;
  }>;
}

export default async function EmergencyCardPage({ params }: PageProps) {
  const resolvedParams = await params;
  const card = await getEmergencyCard(resolvedParams.cardId);

  if (!card) {
    notFound();
  }

  return <EmergencyCardView card={card} />;
}

// 메타데이터 생성
export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const card = await getEmergencyCard(resolvedParams.cardId);

  if (!card) {
    return {
      title: '긴급 연락 정보를 찾을 수 없습니다',
    };
  }

  return {
    title: `🆘 ${card.public_pet_name || '반려동물'} 긴급 연락 정보`,
    description: `${card.public_pet_name || '반려동물'}의 긴급 연락 정보입니다. 발견 시 보호자에게 연락해주세요.`,
    openGraph: {
      title: `🆘 ${card.public_pet_name || '반려동물'} 긴급 연락 정보`,
      description: `${card.public_pet_name || '반려동물'}의 긴급 연락 정보입니다. 발견 시 보호자에게 연락해주세요.`,
    },
  };
}

