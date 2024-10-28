import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  return NextResponse.json({
    success: true,
    heroImages: [
      "/istockphoto-1128932923-612x612.jpg",
      "/istockphoto-1359499268-612x612.jpg",
      "/istockphoto-1141737652-612x612.jpg",
      "/istockphoto-1309256708-612x612.jpg",
    ],
  });
}
