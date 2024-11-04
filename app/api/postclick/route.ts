import { connectDb } from "@/dbconnection/connect";
import { NextResponse } from "next/server";
import { click } from "@/dbconnection/Schemas/click";
import { signup } from "@/dbconnection/Schemas/signup";
import { headers } from 'next/headers';
import rateLimit from "../../../rateLimit";
import { UAParser } from 'ua-parser-js';
import { sendMessage } from "@/utils/functions";
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const headersList = headers();
    const ip = headersList.get("x-forwarded-for");
    const userAgent = headersList.get("user-agent");
    const parser = userAgent ? new UAParser(userAgent) : null;
    let parserResults = parser ? parser.getResult() : null;

    const usercookie = await req.cookies.get("user");
    let data = await req.json();

    const userid = usercookie?.value;
    if (!userid) {
      return NextResponse.json({
        success: false,
        message: "login first",
      });
    }


    await connectDb();
    const res = await signup.findOne({ _id: userid });
    if (!res) {
      return NextResponse.json({ sucess: false });
    } else {
      const resObj = await rateLimit(res._id);
      if (!resObj.success) {
        return NextResponse.json({ success: false, message: "Rate limit exceeded" });
      }
      let obj = { search: data, user: res, ip: ip, device: parserResults }
      const ress = new click(obj);
      const savedclick = await ress.save();
      await sendMessage(savedclick);
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: { errors: "API ERROR" } }, { status: 500 });
  }

}