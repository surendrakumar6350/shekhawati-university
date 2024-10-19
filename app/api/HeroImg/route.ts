import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
      return NextResponse.json({
        success: true,
        heroImages: [
            "https://exam.shekhauniexam.in/Image_2024/Photo/00b5ce9c-06b2-4437-bf98-e8a5b0b29f66.jpg",
            "https://exam.shekhauniexam.in/Image_2024/Photo/020603a1-22c4-41be-9b72-bcd7bb705ee3.jpg",
            "https://exam.shekhauniexam.in/Image_2024/Photo/9b235a56-6cf7-4274-9982-e385e619d104.jpg",
            "https://exam.shekhauniexam.in/Image_2024/Photo/10cd03a3-58b0-4f85-b738-b1d91bab292f.jpg",
          ]
      })
    }
