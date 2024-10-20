import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  return NextResponse.json({
    success: true,
    heroImages: [
      "https://exam.shekhauniexam.in/Image_2024/Photo/19e0d5d5-483b-470a-aed7-e0e293365b32.jpg",
      "https://exam.shekhauniexam.in/Image_2024/Photo/686ad74a-51d1-42cf-b7d7-c194c1f7b1f9.jpg",
      "https://exam.shekhauniexam.in/Image_2024/Photo/30a2f466-cfc2-48df-97d6-5d55f7f659cc.jpg",
      "https://exam.shekhauniexam.in/Image_2024/Photo/ea424317-fc2a-4b1a-8fe5-0f25f7733310.jpg",
    ],
  });
}
