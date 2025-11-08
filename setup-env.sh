#!/bin/bash

echo "🔧 All-Pet Emergency 환경변수 설정"
echo ""

# All-Pet 앱의 .env 파일에서 Supabase 정보 읽기
PARENT_DIR="/Users/namjaemin/Documents/dev/all-pet-app"

if [ -f "$PARENT_DIR/.env" ]; then
  echo "✅ All-Pet 앱의 .env 파일을 찾았습니다."
  
  # .env 파일에서 값 추출
  SUPABASE_URL=$(grep "^SUPABASE_URL=" "$PARENT_DIR/.env" | cut -d '=' -f2)
  SUPABASE_ANON_KEY=$(grep "^SUPABASE_ANON_KEY=" "$PARENT_DIR/.env" | cut -d '=' -f2)
  
  if [ -n "$SUPABASE_URL" ] && [ -n "$SUPABASE_ANON_KEY" ]; then
    echo "✅ Supabase 정보를 찾았습니다."
    
    # .env.local 파일 생성
    cat > .env.local << EOF
# Supabase Configuration (from All-Pet App)
NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY
EOF
    
    echo "✅ .env.local 파일이 생성되었습니다!"
    echo ""
    echo "🎉 이제 다음 명령으로 개발 서버를 실행하세요:"
    echo "   npm run dev"
    echo ""
    echo "📱 브라우저에서 http://localhost:3000 접속"
  else
    echo "❌ Supabase 정보를 찾을 수 없습니다."
    echo "   $PARENT_DIR/.env 파일을 확인해주세요."
  fi
else
  echo "❌ All-Pet 앱의 .env 파일을 찾을 수 없습니다."
  echo ""
  echo "수동으로 .env.local 파일을 생성해주세요:"
  echo ""
  echo "NEXT_PUBLIC_SUPABASE_URL=your-supabase-url"
  echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key"
fi

