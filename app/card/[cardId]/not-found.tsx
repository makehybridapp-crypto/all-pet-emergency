export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
        <div className="mb-6">
          <div className="bg-red-100 rounded-full w-24 h-24 mx-auto flex items-center justify-center mb-4">
            <svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            긴급 카드를 찾을 수 없습니다
          </h1>
          <p className="text-gray-600 leading-relaxed">
            요청하신 긴급 연락 정보가 존재하지 않거나<br />
            삭제되었을 수 있습니다.
          </p>
        </div>

        <div className="bg-blue-50 rounded-2xl p-4 mb-6">
          <p className="text-sm text-gray-700">
            💡 QR 코드나 NFC 태그가 올바른지 확인해주세요
          </p>
        </div>

        <a 
          href="/"
          className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        >
          홈으로 돌아가기
        </a>
      </div>
    </div>
  );
}

