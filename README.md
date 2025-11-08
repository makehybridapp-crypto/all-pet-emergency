# All-Pet Emergency Card Service

All-Pet 앱의 긴급 연락 카드 공개 웹 서비스입니다.

## 🚀 배포 방법 (Vercel)

### 1. Vercel 계정 생성
1. [vercel.com](https://vercel.com) 접속
2. GitHub 계정으로 로그인

### 2. 프로젝트 배포
1. Vercel 대시보드에서 "Add New" → "Project" 클릭
2. GitHub 저장소 선택 (또는 직접 업로드)
3. 프로젝트 이름: `all-pet-emergency` (원하는 이름)
4. Framework Preset: **Next.js** (자동 감지됨)
5. **Environment Variables** 설정:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
6. "Deploy" 클릭

### 3. 배포 후 URL 확인
배포가 완료되면 다음과 같은 URL을 받게 됩니다:
```
https://all-pet-emergency.vercel.app
```

### 4. 앱에서 URL 업데이트
All-Pet 앱의 `hooks/useEmergencyCard.ts`에서 `generatePublicEmergencyUrl` 함수를 업데이트하세요:

```typescript
export function generatePublicEmergencyUrl(cardId: string): string {
  return `https://all-pet-emergency.vercel.app/card/${cardId}`;
}
```

## 🔧 로컬 개발

### 환경변수 설정
`.env.local` 파일을 생성하고 Supabase 정보를 입력하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 개발 서버 실행
```bash
npm run dev
```

http://localhost:3000 에서 확인 가능합니다.

## 📱 URL 구조

```
https://all-pet-emergency.vercel.app/card/[cardId]
```

예시:
```
https://all-pet-emergency.vercel.app/card/abc-123-def-456
```

## 🔐 보안

- Supabase RLS 정책으로 공개 읽기만 허용
- 민감한 정보는 `public_` 접두사가 붙은 필드만 노출
- 익명(anon) 역할만 읽기 가능

## 📄 페이지 구성

- **홈 (`/`)**: 서비스 소개
- **긴급 카드 (`/card/[cardId]`)**: 펫 긴급 연락 정보 표시
- **404**: 페이지/카드를 찾을 수 없음

## 🎨 디자인

- Material Design 3 기반
- 반응형 (모바일/태블릿/데스크톱)
- Tailwind CSS
- 그라데이션 배경
- 다크 모드 미지원 (긴급 상황에서 가독성 우선)
