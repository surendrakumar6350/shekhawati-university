import { NextResponse } from "next/server";
import { signup } from "@/dbconnection/Schemas/signup";
import { connectDb } from "@/dbconnection/connect";
import extractUser from "../../../utils/extractUser";

export async function POST(request: Request): Promise<NextResponse> {
    try {
        await connectDb();
        let data = await signup.find({})
            .sort({ date: -1 }).limit(5);
        data = data.map((e) => extractUser(e));

        return NextResponse.json({
            success: true,
            data: data
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
