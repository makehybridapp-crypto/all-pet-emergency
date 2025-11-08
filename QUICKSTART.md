# ⚡ 빠른 시작 가이드

## 🎯 목표
All-Pet 앱의 긴급 카드를 QR/NFC로 공유할 수 있는 공개 웹 페이지 서비스

## ✅ 완료된 작업

1. ✅ Next.js 프로젝트 생성 (App Router, TypeScript, Tailwind)
2. ✅ Supabase 클라이언트 설정
3. ✅ 동적 라우트 페이지 (`/card/[cardId]`)
4. ✅ 반응형 UI 디자인 (Material Design 3)
5. ✅ Supabase RLS 정책 설정 (공개 읽기 허용)
6. ✅ 404 에러 페이지
7. ✅ 로컬 빌드 테스트 성공

## 🚀 다음 단계 (배포)

### 1️⃣ GitHub에 푸시
```bash
cd /Users/namjaemin/Documents/dev/all-pet-emergency
git add .
git commit -m "feat: Emergency card public service"
git remote add origin https://github.com/YOUR_USERNAME/all-pet-emergency.git
git push -u origin main
```

### 2️⃣ Vercel 배포 (5분)
1. https://vercel.com 접속
2. GitHub 로그인
3. "New Project" → `all-pet-emergency` 선택
4. **Environment Variables** 추가:
   - `NEXT_PUBLIC_SUPABASE_URL`: (All-Pet 앱의 .env에서 복사)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: (All-Pet 앱의 .env에서 복사)
5. "Deploy" 클릭

### 3️⃣ 배포 완료 후
Vercel이 제공하는 URL (예: `https://all-pet-emergency-abc123.vercel.app`)을 확인하고,
All-Pet 앱의 `hooks/useEmergencyCard.ts`에서 `baseUrl`을 실제 URL로 변경하세요.

## 🧪 로컬 테스트

```bash
# 개발 서버 실행
npm run dev

# 브라우저에서 접속
http://localhost:3000

# 긴급 카드 테스트 (cardId는 실제 ID로 변경)
http://localhost:3000/card/your-card-id-here
```

## 📂 프로젝트 구조

```
all-pet-emergency/
├── app/
│   ├── page.tsx              # 홈 페이지
│   ├── not-found.tsx         # 404 페이지
│   ├── layout.tsx            # 루트 레이아웃
│   └── card/
│       └── [cardId]/
│           ├── page.tsx      # 긴급 카드 상세 (서버 컴포넌트)
│           └── not-found.tsx # 카드 없음 페이지
├── components/
│   └── EmergencyCardView.tsx # 긴급 카드 UI (클라이언트)
├── lib/
│   └── supabase.ts           # Supabase 클라이언트
├── .env.local                # 로컬 환경변수 (git 무시)
├── .env.example              # 환경변수 예시
├── vercel.json               # Vercel 설정
├── setup-env.sh              # 환경변수 자동 설정 스크립트
├── DEPLOY.md                 # 상세 배포 가이드
└── README.md                 # 프로젝트 설명
```

## 🎨 주요 기능

### 긴급 카드 페이지 (`/card/[cardId]`)
- 📱 반응형 디자인 (모바일 최적화)
- 📞 원터치 전화 걸기 버튼
- 🏥 동물병원 정보 표시
- ⚠️ 알레르기/주의사항 강조
- 🎨 그라데이션 배경 (긴급 상황 시각화)
- 🔍 SEO 최적화 (Open Graph 메타데이터)

### 보안
- ✅ RLS로 공개 읽기만 허용
- ✅ 민감한 정보 노출 없음 (`public_` 필드만)
- ✅ 익명 접근 가능

## 💡 팁

### Vercel 커스텀 도메인
무료 도메인 대신 본인 도메인 사용 가능:
```
https://emergency.all-pet.com
```

### 성능
- 🚀 Vercel Edge Network (전 세계 CDN)
- ⚡ Next.js App Router (서버 컴포넌트)
- 📦 자동 이미지 최적화

### 비용
- 💯 완전 무료! (Hobby Plan)
- 100GB 대역폭/월
- 무제한 요청

## 🎉 완료!

이제 QR 코드를 스캔하거나 NFC 태그를 읽으면
예쁜 긴급 연락 페이지가 표시됩니다! 🐾

