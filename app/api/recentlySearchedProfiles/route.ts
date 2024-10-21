import { NextResponse } from "next/server";
import { click } from "@/dbconnection/Schemas/click";
import { connectDb } from "@/dbconnection/connect";
import { encryptData } from "@/utils/encrypt";

export async function POST(request: Request): Promise<NextResponse> {
    try {
        await connectDb();
        const data = await click.find({})
            .sort({ date: -1 }).limit(100);


        let arr = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i]?.search.imgSrc?.length > 3) {
                arr.push(data[i]);
            }
            if (arr.length == 4) {
                break;
            }
        }

        return NextResponse.json({
            success: true,
            heroImages: encryptData(arr)
        })
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "api error",
        }, { status: 500 })
    }

}
