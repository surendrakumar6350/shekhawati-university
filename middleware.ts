import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { headers } from 'next/headers'

export async function middleware(request: NextRequest) {
  const headersList = headers();
  const ip = headersList.get("x-forwarded-for");

  const validationResponse = await fetch(new URL(`/api/verifyip/validate-token?ip=${ip}`, request.url), {
    method: 'GET'
  });
  const response = await validationResponse.json();
  if (!response.success) {
    return NextResponse.redirect(new URL(`/auth?ip=${ip}`, request.url))
  }

}

export const config = {
  matcher: ['/', '/find', '/admin', '/signup', '/explore', '/community', '/coming-soon']
}