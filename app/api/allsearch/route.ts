import { connectDb } from "@/dbconnection/connect";
import { NextResponse } from "next/server";
import { click } from "@/dbconnection/Schemas/click";

export async function POST(request: Request): Promise<NextResponse> {
  let { userId } = await request.json();
  try {
    connectDb();
    const res = await click.find();
    let allSearch:any = [];
    const result = await Promise.all(
      res.map(async (element) => {
            if(element.user._id.equals(userId)) {
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
    return NextResponse.json({ success: false });
  }
}
