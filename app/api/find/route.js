import { connectDb } from "@/dbconnection/connect";
import { NextResponse } from "next/server";
import { forms } from "@/dbconnection/Schemas/forms";
import { headers } from "next/headers";
import { signup } from "@/dbconnection/Schemas/signup";
import { UAParser } from "ua-parser-js";
import { click } from "@/dbconnection/Schemas/click";
import rateLimit from "../../../rateLimit";

export async function GET(request) {
  const { url } = request;
  const queryParams = new URL(url).searchParams;
  const nameValue = queryParams.get("name");
  const fatherNameValue = queryParams.get("fatherName");
  const courseValue = queryParams.get("course");
  const mobile = queryParams.get("mobile");
  const address = queryParams.get("address");
  const page = queryParams.get("page");

  if (!nameValue && !fatherNameValue && !courseValue && !mobile && !address) {
    return NextResponse.json({});
  }

  const headersList = headers();
  const ip = headersList.get("x-forwarded-for");
  const ankit = headersList.get("user-agent");
  const parser = new UAParser(ankit);
  let parserResults = parser.getResult();

  const usercookie = await request?.cookies?.get("user");
  let data = { nameValue, fatherNameValue, courseValue, mobile, address, page };

  const userid = usercookie?.value;

  if (!userid) {
    return NextResponse.json({
      success: false,
      message: "login first",
    });
  }

  try {
    await connectDb();
    const res = await signup.findOne({ _id: userid });
    if (!res) {
      return NextResponse.json({ sucess: false });
    } else {
      const resObj =  await rateLimit(res._id);
      if(!resObj.success) {
        return NextResponse.json({success: false, message: "Rate limit exceeded"});
      }
      let obj = { search: data, user: res, ip: ip, device: parserResults };
      const ress = new click(obj);
      const savedclick = await ress.save();

      try {
        let queryOR = [];
        let optionsADD = [];

        if (nameValue) {
          queryOR.push({
            studentName: {
              $regex: `.*${nameValue?.replace(/./g, "(?:$&)?")}.*`,
              $options: "i",
            },
          });
          optionsADD.push({
            $cond: {
              if: {
                $regexMatch: {
                  input: "$studentName",
                  regex: `.*${nameValue}.*`,
                  options: "i",
                },
              },
              then: 3,
              else: 0,
            },
          });
          optionsADD.push({
            $cond: {
              if: {
                $regexMatch: {
                  input: "$studentName",
                  regex: `.*${nameValue?.replace(/./g, "(?:$&)?")}.*`,
                  options: "i",
                },
              },
              then: 3,
              else: 0,
            },
          }); // fuzzy match
        }
        if (fatherNameValue) {
          queryOR.push({
            fatherName: { $regex: `.*${fatherNameValue}.*`, $options: "i" },
          });
          optionsADD.push({
            $cond: {
              if: {
                $regexMatch: {
                  input: "$fatherName",
                  regex: `.*${fatherNameValue}.*`,
                  options: "i",
                },
              },
              then: 1,
              else: 0,
            },
          });
          optionsADD.push({
            $cond: {
              if: {
                $regexMatch: {
                  input: "$fatherName",
                  regex: `.*${fatherNameValue?.replace(/./g, "(?:$&)?")}.*`,
                  options: "i",
                },
              },
              then: 1,
              else: 0,
            },
          }); // fuzzy match
        }

        if (courseValue) {
          queryOR.push({
            course: { $regex: `.*${courseValue}.*`, $options: "i" },
          });
          optionsADD.push({
            $cond: {
              if: {
                $regexMatch: {
                  input: "$course",
                  regex: `.*${courseValue}.*`,
                  options: "i",
                },
              },
              then: 2,
              else: 0,
            },
          });
          optionsADD.push({
            $cond: {
              if: {
                $regexMatch: {
                  input: "$course",
                  regex: `.*${courseValue?.replace(/./g, "(?:$&)?")}.*`,
                  options: "i",
                },
              },
              then: 2,
              else: 0,
            },
          }); // fuzzy match
        }

        if (mobile) {
          queryOR.push({ mobile: { $regex: `.*${mobile}.*`, $options: "i" } });
          optionsADD.push({
            $cond: {
              if: {
                $regexMatch: {
                  input: "$mobile",
                  regex: `.*${mobile}.*`,
                  options: "i",
                },
              },
              then: 3,
              else: 0,
            },
          });
        }

        if (address) {
          queryOR.push({
            address: { $regex: `.*${address}.*`, $options: "i" },
          });
          optionsADD.push({
            $cond: {
              if: {
                $regexMatch: {
                  input: "$address",
                  regex: `.*${address}.*`,
                  options: "i",
                },
              },
              then: 2,
              else: 0,
            },
          });
          optionsADD.push({
            $cond: {
              if: {
                $regexMatch: {
                  input: "$address",
                  regex: `.*${address?.replace(/./g, "(?:$&)?")}.*`,
                  options: "i",
                },
              },
              then: 2,
              else: 0,
            },
          }); // fuzzy match
        }

        const query = {
          $or: queryOR,
        };

        const options = {
          score: {
            $add: optionsADD,
          },
        };

        let find = await forms.aggregate([
          { $match: query },
          { $addFields: { score: options.score } },
          { $sort: { score: -1 } },
          { $limit: 100 },
        ]);

        if(!page || page < 0 || page > 5 || isNaN(page)) {
          find = find.slice(0, 20);
        }

        if (page) {
          if (page == "1") {
            find = find.slice(0, 20);
          } else if (page == "2") {
            find = find.slice(20, 40);
          } else if (page == "3") {
            find = find.slice(40, 60);
          } else if (page == "4") {
            find = find.slice(60, 80);
          } else if (page == "5") {
            find = find.slice(80, 99);
          }
        }
       

        if (find) {
          return NextResponse.json({
            success: true,
            user: find,
          });
        } else {
          return NextResponse.json({
            success: false,
            message: "something wrong with your account",
          });
        }
      } catch (error) {
        console.log(error);
        return NextResponse.json({
          success: false,
          message: "api error",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false });
  }
}
