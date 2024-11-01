import { NextResponse } from "next/server";
import { redisClient, connectRedis, closeRedisClient } from "@/redisClient";
import { signup } from "@/dbconnection/Schemas/signup";
import { connectDb } from "@/dbconnection/connect";

interface ResponseType {
    success: boolean;
    mobile: string;
    otp: string;
}

export async function POST(request: Request): Promise<NextResponse> {
    let data = await request.json();

    // Basic validation for required fields
    if (!data.mobile || !data.otp) {
        return NextResponse.json(
            { success: false, message: "Missing mobile or OTP" },
            { status: 400 }
        );
    }

    try {
        await connectRedis();

        // Fetch OTP from Redis
        let result: string | null = await redisClient.get(`M${data.mobile}`);
        if (!result) {
            return NextResponse.json(
                { success: false, message: "Otp Expired, please try again" },
                { status: 200 }
            );
        }

        // Parse and verify OTP
        const response: ResponseType = JSON.parse(result);
        if (response.otp !== data.otp) {
            return NextResponse.json(
                { success: false, message: "Wrong Otp" },
                { status: 200 }
            );
        }

        // Connect to the database
        await connectDb();

        // Check if user already exists
        const existingUser = await signup.findOne({ email: data.mobile });
        if (existingUser?._id) {
            const response = NextResponse.json({ success: true });
            response.cookies.set("user", existingUser._id, {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // Expires in 30 days
                path: "/",
            });
            return response;
        }

        // Validate name and avatar before creating a new user
        const namePattern = /^[A-Za-z\s]+$/;
        if (!data.name || !data.selectedAvatar || data.name.length < 2 || !namePattern.test(data.name)) {
            return NextResponse.json(
                { success: false, message: "Invalid name or Avatar" },
                { status: 400 }
            );
        }

        // Create a new user record
        const newUser = new signup({
            aud: "521164846169-acl32c6s15bu9hecu3mfaannc0cboeq6.apps.googleusercontent.com",
            azp: "521164846169-acl32c6s15bu9hecu3mfaannc0cboeq6.apps.googleusercontent.com",
            email: data.mobile,
            email_verified: true,
            exp: 1723527370,
            given_name: data.name,
            iat: 1723523770,
            iss: "https://accounts.google.com",
            jti: "0bce8a29bfb5ad26778ccfcc3bdb030202019ab5",
            name: data.name,
            nbf: 1723523470,
            picture: data.selectedAvatar,
            sub: "114120512382019566398",
        });
        const savedUser = await newUser.save();

        // Send success response with user ID in a cookie
        const responsee = NextResponse.json({ success: true });
        responsee.cookies.set("user", savedUser._id, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // Expires in 30 days
            path: "/",
        });
        return responsee;
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { success: false, message: "api error" },
            { status: 500 }
        );
    } finally {
        // Close the Redis connection after all operations
        await closeRedisClient();
    }
}
