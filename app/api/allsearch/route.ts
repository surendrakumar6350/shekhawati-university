import { connectDb } from "@/dbconnection/connect";
import { NextResponse } from "next/server";
import { click } from "@/dbconnection/Schemas/click";
import { signup } from "@/dbconnection/Schemas/signup";
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest): Promise<NextResponse> {
  let { userId } = await request.json();
  try {
    connectDb();
    const usercookie = await request.cookies.get("user");
    const userid = usercookie?.value;

    if (!userid) {
      return NextResponse.json({
        success: false,
        message: "login first",
      });
    }

    const ans = await signup.findOne({ _id: userid });
    if (!ans) {
      return NextResponse.json({ sucess: false, message: "please Login as Admin" });
    }
    else if (ans.email != process.env.ADMIN_EMAIL) {
      return NextResponse.json({ sucess: false, message: "please Login as Admin" });
    }

    const res = await click.find();
    let allSearch: any = [];
    await Promise.all(
      res.map(async (element) => {
        if (element.user._id.equals(userId)) {
          if (element.search?.imgSrc?.length > 4) {
            allSearch.push(element);
          }
        }
      })
    );
    const response = NextResponse.json({ success: true, find: allSearch });
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
