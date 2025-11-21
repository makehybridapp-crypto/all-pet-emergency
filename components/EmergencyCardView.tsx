'use client';

import { useState } from 'react';
import Image from 'next/image';
import { EmergencyCard } from '@/lib/supabase';

interface EmergencyCardViewProps {
  card: EmergencyCard;
}

export default function EmergencyCardView({ card }: EmergencyCardViewProps) {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const formatPhoneNumber = (phone: string | null) => {
    if (!phone) return '정보 없음';
    // 전화번호 포맷팅 (010-1234-5678)
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
    }
    return phone;
  };

  const handleCall = () => {
    if (card.public_owner_phone) {
      window.location.href = `tel:${card.public_owner_phone}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* 긴급 헤더 */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-t-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-1">긴급 연락 정보</h1>
              <p className="text-red-100 text-sm">이 반려동물을 발견하셨나요?</p>
            </div>
          </div>
        </div>

        {/* 카드 본문 */}
        <div className="bg-white rounded-b-3xl shadow-2xl overflow-hidden">
          {/* 펫 정보 - 큰 사진 섹션 */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex flex-col items-center gap-6 mb-6">
              {/* 큰 펫 사진 */}
              {card.avatar_url ? (
                <div 
                  className="relative w-48 h-48 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white cursor-pointer hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-green-400 to-teal-500"
                  onClick={() => setIsImageModalOpen(true)}
                >
                  <Image 
                    src={card.avatar_url} 
                    alt={card.public_pet_name || '반려동물'}
                    fill
                    className="object-cover"
                    sizes="192px"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="opacity-0 hover:opacity-100 transition-opacity">
                      <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-green-400 to-teal-500 rounded-3xl w-48 h-48 flex items-center justify-center shadow-2xl ring-4 ring-white">
                  <span className="text-8xl">🐾</span>
                </div>
              )}
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {card.public_pet_name || '반려동물'}
                </h2>
                <p className="text-base text-gray-500">보호자를 찾고 있습니다</p>
                {card.avatar_url && (
                  <p className="text-xs text-gray-400 mt-2">사진을 클릭하면 크게 볼 수 있습니다</p>
                )}
              </div>
            </div>
          </div>

          {/* 연락 정보 */}
          <div className="p-8 space-y-6">
            {/* 보호자 연락처 */}
            {card.public_owner_phone && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 rounded-full p-3 shadow-md">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-600 mb-1">보호자 연락처</p>
                    <p className="text-2xl font-bold text-gray-900 mb-3">
                      {formatPhoneNumber(card.public_owner_phone)}
                    </p>
                    <button
                      onClick={handleCall}
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      전화 걸기
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 동물병원 정보 */}
            {card.public_vet_info && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                <div className="flex items-start gap-4">
                  <div className="bg-green-500 rounded-full p-3 shadow-md">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-600 mb-2">동물병원 정보</p>
                    <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                      {card.public_vet_info}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 알레르기/주의사항 */}
            {card.public_notes && (
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-100">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-500 rounded-full p-3 shadow-md">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-600 mb-2">알레르기 / 주의사항</p>
                    <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                      {card.public_notes}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 푸터 */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
            <p className="text-center text-sm text-gray-500">
              💚 All-Pet 앱에서 생성된 긴급 연락 카드입니다
            </p>
            <p className="text-center text-xs text-gray-400 mt-2">
              마지막 업데이트: {new Date(card.updated_at).toLocaleDateString('ko-KR')}
            </p>
          </div>
        </div>

        {/* 안내 메시지 */}
        <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <p className="text-center text-gray-700 leading-relaxed">
            🙏 이 반려동물을 발견하셨다면<br />
            <span className="font-bold text-blue-600">위 연락처로 즉시 연락</span>해주세요.<br />
            보호자가 애타게 기다리고 있습니다.
          </p>
        </div>
      </div>

      {/* 이미지 확대 모달 */}
      {isImageModalOpen && card.avatar_url && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center">
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-colors"
              aria-label="닫기"
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div 
              className="relative w-full max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={card.avatar_url} 
                alt={card.public_pet_name || '반려동물'}
                className="w-full h-auto max-h-[90vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

