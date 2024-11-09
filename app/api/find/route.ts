import { connectDb } from "@/dbconnection/connect";
import { NextResponse } from "next/server";
import { forms } from "@/dbconnection/Schemas/forms";
import { headers } from "next/headers";
import { signup } from "@/dbconnection/Schemas/signup";
import { UAParser } from "ua-parser-js";
import { click } from "@/dbconnection/Schemas/click";
import rateLimit from "@/config/rateLimit";
import { encryptData } from "@/utils/encrypt";
import { searchLogic } from "@/utils/functions";
import type { NextRequest } from 'next/server';
import { QueryValues } from "@/app/types/homepage";
import { validateInputs } from "@/utils/functions";


export async function GET(request: NextRequest): Promise<NextResponse> {
  const { url } = request;

  const queryParams = new URL(url).searchParams;
  const paramNames: Array<keyof QueryValues> = ["name", "fatherName", "course", "mobile", "address", "page"];
  const queryValues: QueryValues = {} as QueryValues;

  paramNames.forEach((param) => {
    queryValues[param] = queryParams.get(param);
  });

  const validationErrors = validateInputs(queryValues);
  if (validationErrors.length > 0) {
    return NextResponse.json({ success: false, message: { errors: validationErrors } }, { status: 400 });
  }

  const { name, fatherName, course, mobile, address, page } = queryValues;

  if (!name && !fatherName && !course && !mobile && !address) {
    return NextResponse.json({ success: false, message: { errors: "Any one field is Required" } }, { status: 400 });
  }

  const headersList = headers();
  const ip = headersList.get("x-forwarded-for");
  const userAgent = headersList.get("user-agent");
  const parser = userAgent ? new UAParser(userAgent) : null;
  let parserResults = parser ? parser.getResult() : null;

  const usercookie = await request.cookies.get("user");
  let data = { name, fatherName, course, mobile, address, page };

  const userid = usercookie?.value;

  if (!userid) {
    return NextResponse.json({ success: false, message: { errors: "Please Login First" } });
  }

  try {
    await connectDb();
    const res = await signup.findOne({ _id: userid });
    if (!res) {
      return NextResponse.json({ success: false, message: { errors: "Please Login First" } });
    } else {
      const resObj = await rateLimit(res._id);
      if (!resObj.success) {
        return NextResponse.json({ success: false, message: { errors: "Rate Limit Exceeded" } });
      }
      let obj = { search: data, user: res, ip: ip, device: parserResults };
      const ress = new click(obj);
      await ress.save();

      try {
        const { query, options } = searchLogic(name, fatherName, course, mobile, address);
        let find = await forms.aggregate([
          { $match: query },
          { $addFields: { score: options.score } },
          { $sort: { score: -1 } },
          { $limit: 100 },
        ]);


        const pageNumber = Number(page);

        if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > 5) {
          find = find.slice(0, 20);
        } else {
          const startIndex = (pageNumber - 1) * 20;
          const endIndex = startIndex + 20;

          find = find.slice(startIndex, endIndex);
        }

        if (find) {
          return NextResponse.json({
            success: true,
            user: encryptData(find)
          });
        } else {
          return NextResponse.json({ success: false, message: { errors: "something wrong with your account" } }, { status: 403 });
        }
      } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: { errors: "Api Error" } }, { status: 400 });
      }
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: { errors: "Api Error" } }, { status: 400 });
  }
}
