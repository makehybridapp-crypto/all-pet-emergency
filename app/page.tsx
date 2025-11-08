export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-12 text-center">
        <div className="mb-8">
          <div className="bg-gradient-to-br from-green-400 to-teal-500 rounded-full w-32 h-32 mx-auto flex items-center justify-center shadow-2xl mb-6">
            <span className="text-6xl">🐾</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            All-Pet 긴급 연락 서비스
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            반려동물의 긴급 연락 정보를<br />
            QR 코드와 NFC로 간편하게 공유하세요
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 border border-blue-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">🔍 사용 방법</h2>
          <div className="space-y-3 text-left">
            <div className="flex items-start gap-3">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
              <p className="text-gray-700">All-Pet 앱에서 긴급 연락 정보 입력</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
              <p className="text-gray-700">QR 코드 또는 NFC 태그 생성</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
              <p className="text-gray-700">목걸이나 인식표에 부착</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
              <p className="text-gray-700">발견 시 즉시 보호자에게 연락 가능</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-2xl p-4 border border-green-200">
          <p className="text-sm text-gray-600">
            🆘 긴급 연락 카드 URL은 다음 형식입니다:<br />
            <code className="bg-white px-3 py-1 rounded-lg text-green-600 font-mono text-xs mt-2 inline-block">
              /card/[카드ID]
            </code>
          </p>
        </div>
      </div>
    </div>
  );
}
