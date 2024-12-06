import { NextResponse } from "next/server";
import { connectDb } from "@/dbconnection/connect";
import axios from "axios";
import { Metadata } from "@/dbconnection/Schemas/Metadataone";
import sharp from "sharp";
import { redisClient, connectRedis, closeRedisClient } from "@/config/redisClient";

export async function GET(request: Request): Promise<NextResponse> {
    const url = new URL(request.url);
    const imgSrc = url.searchParams.get("imgSrc");

    if (!imgSrc) {
        return NextResponse.json(
            { success: false, message: "imgSrc parameter is required" },
            { status: 400 }
        );
    }
    try {
        await connectDb();
        await connectRedis();
        const document = await Metadata.findOne({ imgSrc });

        if (!document) {
            return NextResponse.json(
                { success: false, message: "Image not found in database" },
                { status: 404 }
            );
        }

        const { mergedImage, top, left, width, height } = document;
        const cacheKey = `cropped:${imgSrc}:${top}:${left}:${width}:${height}`;

        const cachedImage = await redisClient.get(cacheKey);

        if (cachedImage) {
            console.log("Serving from cache");
            const cachedBuffer = Buffer.from(cachedImage, "base64");

            await closeRedisClient();
            return new NextResponse(cachedBuffer, {
                headers: {
                    "Content-Type": "image/jpeg",
                },
            });
        }

        console.log("Fetching from S3 and processing");
        const s3Url = `${process.env.S3_LINK}/${mergedImage}`;

        const response = await axios.get(s3Url, { responseType: "arraybuffer" });
        const buffer = response.data;

        if (width > 0 && height > 0 && left >= 0 && top >= 0) {
            const croppedImageBuffer = await sharp(buffer)
                .extract({
                    width,
                    height,
                    left,
                    top,
                })
                .toBuffer();

            await redisClient.set(cacheKey, croppedImageBuffer.toString("base64"), {
                EX: 226400,
            });

            await closeRedisClient();
            return new NextResponse(croppedImageBuffer, {
                headers: {
                    "Content-Type": "image/jpeg",
                },
            });
        } else {
            await closeRedisClient();
            return NextResponse.json(
                { success: false, message: "Invalid crop dimensions in the document" },
                { status: 400 }
            );
        }
    } catch (error) {
        await closeRedisClient();
        console.error("Error:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }

}
