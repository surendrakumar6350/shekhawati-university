import { connectDb } from "@/dbconnection/connect";
import { NextResponse } from "next/server";
import { AuthOtpModel } from "@/dbconnection/Schemas/AuthOtpModel";
import type { NextRequest } from "next/server";
import { redisClient, connectRedis, closeRedisClient } from "@/config/redisClient";

export async function POST(request: NextRequest): Promise<NextResponse> {
    let redisConnected = false;

    try {
        const { code, ip } = await request.json();

        if (!code || !ip) {
            return NextResponse.json(
                { success: false, message: "Both code and IP are required" },
                { status: 400 }
            );
        }
        await connectDb();
        const codeExists = await AuthOtpModel.findOne({
            _id: "67404a0292464366e020114b",
            otp: code,
        });

        if (!codeExists) {
            return NextResponse.json(
                { success: false, message: "Invalid code" },
                { status: 200 }
            );
        }
        await connectRedis();
        redisConnected = true;

        const currentIPObj = await redisClient.get("ip");
        const currentIPs = currentIPObj ? JSON.parse(currentIPObj) : [];

        if (!currentIPs.includes(ip)) {
            currentIPs.unshift(ip);
            await redisClient.set("ip", JSON.stringify(currentIPs));
            await redisClient.expire("ip", 900);
        }

        return NextResponse.json({ success: true, message: "IP added to Redis" });
    } catch (error) {
        console.error("Error handling POST request:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    } finally {
        if (redisConnected) {
            await closeRedisClient();
        }
    }
}
