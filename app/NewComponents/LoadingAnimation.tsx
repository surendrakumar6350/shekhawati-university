import { GraduationCap } from 'lucide-react'

export default function LoadingAnimation() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500">
      <div className="text-center">
        <div className="relative">
          <GraduationCap className="w-24 h-24 text-white animate-bounce" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-t-4 border-white rounded-full animate-spin"></div>
          </div>
        </div>
        <h2 className="mt-4 text-2xl font-bold text-white">Shekhawati</h2>
        <p className="mt-2 text-lg text-purple-100">Connecting students...</p>
      </div>
    </div>
  )
}