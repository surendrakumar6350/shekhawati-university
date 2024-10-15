import { connectDb } from "@/dbconnection/connect";
import { NextResponse } from "next/server";
import { signup } from "@/dbconnection/Schemas/signup";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export async function POST(request: Request): Promise<NextResponse> {
  let data = await request.json();

  if (!data || !data?.credential) {
    return NextResponse.json({
      sucess: false,
      message: "Bad Request",
    });
  }
  const decoded = jwtDecode(data.credential);
  data = decoded;

  try {
    connectDb();
    const find = await signup.findOne({ email: data.email });
    if (find?._id) {
      const response = NextResponse.json({ success: true });
      response.cookies.set("user", find._id, {
        expires: new Date(Date.now() * 160),
        path: "/",
      });
      return response;
    } else {
      let imageUrl = data.picture;
      let base64;

      try {
        const res = await axios.get(imageUrl, {
          responseType: "arraybuffer",
        });
        const buffer = Buffer.from(res.data, "binary");
        const base64Image = buffer.toString("base64");
        base64 = `data:image/jpeg;base64,${base64Image}`;
      } catch (err) {
        console.error(err);
      }
      console.log(base64);
      const res = new signup({
        ...data,
        picture: base64,
      });
      const saveduser = await res.save();

      const response = NextResponse.json({ success: true });
      response.cookies.set("user", saveduser._id, {
        expires: new Date(Date.now() * 160),
        path: "/",
      });
      return response;
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false });
  }
}
