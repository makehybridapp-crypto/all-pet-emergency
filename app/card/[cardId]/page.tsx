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
      title: '緊急連絡情報が見つかりません',
    };
  }

  return {
    title: `🆘 ${card.public_pet_name || 'ペット'} 緊急連絡情報`,
    description: `${card.public_pet_name || 'ペット'}の緊急連絡情報です。発見時は飼い主に連絡してください。`,
    openGraph: {
      title: `🆘 ${card.public_pet_name || 'ペット'} 緊急連絡情報`,
      description: `${card.public_pet_name || 'ペット'}の緊急連絡情報です。発見時は飼い主に連絡してください。`,
    },
  };
}

