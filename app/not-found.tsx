import { getMessages, defaultLocale } from '@/lib/i18n';
import Link from 'next/link';

export default async function NotFound() {
  const messages = await getMessages(defaultLocale);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
        <div className="mb-6">
          <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {messages.pageNotFound}
          </h2>
          <p className="text-gray-600">
            {messages.pageNotExist}
          </p>
        </div>

        <Link 
          href={`/${defaultLocale}`}
          className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          {messages.backToHome}
        </Link>
      </div>
    </div>
  );
}

