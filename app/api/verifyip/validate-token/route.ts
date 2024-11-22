import { redisClient, connectRedis, closeRedisClient } from "@/config/redisClient";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { url } = request;
  console.log(url);
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("ip");

    if (!query) {
      return NextResponse.json(
        { success: false, message: "IP query parameter is missing" },
        { status: 200 }
      );
    }
    await connectRedis();
    const currentIPObj = await redisClient.get("ip");

    if (currentIPObj) {
      const currentIPs = JSON.parse(currentIPObj);

      if (currentIPs.includes(query)) {
        return NextResponse.json({ success: true });
      }
    }

    return NextResponse.json({ success: false });
  } catch (error) {
    console.error("Error handling GET request:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await closeRedisClient();
  }
}
