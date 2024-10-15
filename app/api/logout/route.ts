import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
      const response = NextResponse.json({ success: true });
      response.cookies.set("user", "", {
        expires: new Date(Date.now()),
        path: "/",
      });
      return response;
    }
