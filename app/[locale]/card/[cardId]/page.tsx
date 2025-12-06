import { getEmergencyCard, EmergencyCard } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import EmergencyCardView from '@/components/EmergencyCardView';
import { getMessages, isValidLocale, Locale, defaultLocale } from '@/lib/i18n';

interface PageProps {
  params: Promise<{
    locale: string;
    cardId: string;
  }>;
}

export default async function EmergencyCardPage({ params }: PageProps) {
  const resolvedParams = await params;
  const locale = isValidLocale(resolvedParams.locale) ? resolvedParams.locale : defaultLocale;
  const card = await getEmergencyCard(resolvedParams.cardId);

  if (!card) {
    notFound();
  }

  const messages = await getMessages(locale);

  return <EmergencyCardView card={card} locale={locale} messages={messages} />;
}

// 메타데이터 생성
export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const locale = isValidLocale(resolvedParams.locale) ? resolvedParams.locale : defaultLocale;
  const card = await getEmergencyCard(resolvedParams.cardId);
  const messages = await getMessages(locale);

  if (!card) {
    return {
      title: messages.notFoundTitle,
    };
  }

  return {
    title: `🆘 ${card.public_pet_name || messages.pet} ${messages.emergencyContactInfo}`,
    description: `${card.public_pet_name || messages.pet}${messages.notFoundDescription}`,
    openGraph: {
      title: `🆘 ${card.public_pet_name || messages.pet} ${messages.emergencyContactInfo}`,
      description: `${card.public_pet_name || messages.pet}${messages.notFoundDescription}`,
    },
  };
}

