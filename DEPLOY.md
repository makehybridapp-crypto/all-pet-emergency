# 🚀 Vercel 배포 가이드

## 사전 준비

1. **GitHub 계정** 필요
2. **Vercel 계정** 생성 (GitHub로 로그인 가능)
3. **Supabase 정보** 준비:
   - Supabase URL
   - Anon Key

## 📦 1단계: GitHub에 코드 푸시

```bash
cd /Users/namjaemin/Documents/dev/all-pet-emergency

# Git 초기화 (이미 되어있음)
git add .
git commit -m "Initial commit: Emergency card service"

# GitHub 저장소 생성 후
git remote add origin https://github.com/YOUR_USERNAME/all-pet-emergency.git
git branch -M main
git push -u origin main
```

## 🌐 2단계: Vercel에서 프로젝트 import

1. **Vercel 접속**: https://vercel.com
2. **로그인**: GitHub 계정으로 로그인
3. **New Project** 클릭
4. **Import Git Repository**:
   - GitHub 저장소 선택: `all-pet-emergency`
   - "Import" 클릭

## ⚙️ 3단계: 환경변수 설정

**Configure Project** 화면에서:

1. **Framework Preset**: Next.js (자동 선택됨)
2. **Root Directory**: `./` (기본값)
3. **Build Command**: `npm run build` (기본값)
4. **Output Directory**: `.next` (기본값)
5. **Install Command**: `npm install` (기본값)

**Environment Variables** 섹션:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `your-anon-key-here` |

💡 **중요**: 
- All-Pet 앱의 `.env` 파일에서 같은 값 복사
- `NEXT_PUBLIC_` 접두사 필수! (클라이언트에서 접근)

## 🎯 4단계: 배포

1. **Deploy** 버튼 클릭
2. 약 1~2분 대기
3. 배포 완료! 🎉

## 📱 5단계: URL 확인

배포 완료 후:
```
https://all-pet-emergency.vercel.app
```

또는 커스텀 도메인:
```
https://your-custom-domain.com
```

## 🔄 6단계: All-Pet 앱 업데이트

`all-pet-app/hooks/useEmergencyCard.ts` 파일 수정:

```typescript
export function generatePublicEmergencyUrl(cardId: string): string {
  return `https://all-pet-emergency.vercel.app/card/${cardId}`;
}
```

## ✅ 7단계: 테스트

1. All-Pet 앱에서 긴급 카드 저장
2. QR 코드 생성
3. QR 코드 스캔 → 웹 페이지 확인
4. 전화 걸기 버튼 작동 확인

## 🔧 문제 해결

### "긴급 카드를 찾을 수 없습니다" 오류
- Supabase RLS 정책 확인
- 환경변수가 올바른지 확인
- cardId가 정확한지 확인

### 환경변수가 적용되지 않음
- Vercel 대시보드 → Settings → Environment Variables 확인
- 변경 후 **Redeploy** 필수!

### 빌드 오류
- `npm run build` 로컬에서 테스트
- TypeScript 오류 확인

## 🎨 커스텀 도메인 (선택사항)

Vercel 대시보드:
1. Project Settings → Domains
2. "Add Domain" 클릭
3. 본인 도메인 입력 (예: `emergency.all-pet.com`)
4. DNS 설정 (Vercel 안내 따라하기)

## 📊 모니터링

Vercel 대시보드에서:
- 방문자 통계
- 오류 로그
- 성능 분석
- 배포 기록

모두 무료로 제공됩니다! 🎉

