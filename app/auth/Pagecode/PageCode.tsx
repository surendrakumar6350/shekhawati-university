"use client";
import React, { useState } from "react";
import { Shield, Lock, AlertCircle } from "lucide-react";
import { addIp } from "@/apiCalls/allApiCalls";
import { useSearchParams } from "next/navigation";

function PageCode() {
  const searchParams = useSearchParams();
  const ip = searchParams.get("ip");

  const [accessCode, setAccessCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const ans = await addIp({ code: accessCode, ip });
      if (!ans) return;
      if (!ans.success) {
        setError(ans.message);
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Animated background overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-10"></div>

      <div className="max-w-md w-full space-y-8 bg-black/30 backdrop-blur-xl p-8 rounded-xl border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Top security icon */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Restricted Access
          </h2>
          <div className="flex items-center justify-center gap-2 text-red-400">
            <Lock className="h-4 w-4" />
            <p className="text-sm">Confidential Information</p>
          </div>
        </div>

        {/* Warning message */}
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
            <p className="text-sm text-yellow-200">
              This website contains confidential data and requires
              authorization. Please enter your access code to continue.
            </p>
          </div>
        </div>

        {/* Access code form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="accessCode" className="sr-only">
              Access Code
            </label>
            <input
              id="accessCode"
              name="accessCode"
              type="password"
              required
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              className="appearance-none relative block w-full px-4 py-3 border border-white/10 
                placeholder-gray-400 text-white rounded-lg bg-white/5 backdrop-blur-sm
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                transition-all duration-200"
              placeholder="Enter Access Code"
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent 
              text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
              disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Verify Access"
            )}
          </button>
        </form>

        {/* Footer notice */}
        <p className="mt-4 text-center text-xs text-gray-400">
          Unauthorized access attempts will be logged and reported.
        </p>
      </div>
    </div>
  );
}

export default PageCode;
