import { NextResponse } from "next/server";
import { redisClient, connectRedis, closeRedisClient } from "@/config/redisClient";
import { headers } from "next/headers";
import isIpLimitExceeded from "@/utils/isIpLimitExceeded";
import isMobileLimitExceeded from "@/utils/isMobileLimitExceeded";
import { sendotp } from "@/utils/sendotp";
import isOtpLimitExceeded from "@/utils/isOtpLimitExceeded";
import { signup } from "@/dbconnection/Schemas/signup";
import { connectDb } from "@/dbconnection/connect";

export async function POST(request: Request): Promise<NextResponse> {
    let data;

    // Parse JSON data
    try {
        data = await request.json();
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return NextResponse.json(
            { success: false, message: "Invalid request data" },
            { status: 400 }
        );
    }

    try {
        // Connect to Redis and fetch IP from headers
        await connectRedis();
        const headersList = headers();
        const ip = headersList.get("x-forwarded-for");

        // Check OTP limit
        if (await isOtpLimitExceeded("app", redisClient)) {
            return NextResponse.json(
                { success: false, message: "Server Busy" },
                { status: 503 }
            );
        }

        // Check mobile and IP request limits
        if (
            await isMobileLimitExceeded(data.mobile, redisClient) ||
            (ip && await isIpLimitExceeded(ip, redisClient))
        ) {
            return NextResponse.json(
                { success: false, message: "Too many requests" },
                { status: 429 }
            );
        }

        // Send OTP
        const response = await sendotp({
            SIGNUP_KEY: process.env.SIGNUP_KEY,
            mobile: data.mobile,
        });
        if (!response) {
            return NextResponse.json(
                { success: false, message: "API error" },
                { status: 400 }
            );
        }

        // Connect to the database and check if the user already exists
        await connectDb();
        const existingUser = await signup.findOne({ email: data.mobile });
        const returnResponse = {
            success: true,
            allReadyRegistered: !!existingUser,
        };

        // Store OTP in Redis with a 15-minute expiration
        await redisClient.set(`M${data.mobile}`, JSON.stringify(response));
        await redisClient.expire(`M${data.mobile}`, 900);

        return NextResponse.json(returnResponse);
    } catch (error) {
        console.error("API error:", error);
        return NextResponse.json(
            { success: false, message: "API error" },
            { status: 500 }
        );
    } finally {
        // Ensure Redis connection is closed
        await closeRedisClient();
    }
}
