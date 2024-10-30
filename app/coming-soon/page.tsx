"use client"
import { Home, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const page = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
                <div className="text-center">
                    <h1 className="text-9xl font-extrabold text-purple-600">503</h1>
                    <h2 className="mt-4 text-3xl font-bold text-gray-900">Page Under Construction</h2>
                    <p className="mt-2 text-lg text-gray-600">Sorry! The page you're trying to access is currently being developed</p>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="/" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                        <Home className="w-5 h-5 mr-2" />
                        Go to Homepage
                    </Link>
                    <button onClick={() => window.history.back()} className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-purple-600 bg-purple-100 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Go Back
                    </button>
                </div>
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        If you believe this is a mistake, please{' '}
                        <Link href="/contact" className="font-medium text-purple-600 hover:text-purple-500">
                            contact our support team
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </div>
    )
}

export default page
