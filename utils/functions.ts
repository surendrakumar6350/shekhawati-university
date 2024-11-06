import { QueryValues } from "@/app/types/homepage";
import { redisClient, connectRedis, closeRedisClient } from "@/redisClient";
import axios from "axios";

const redirectToFind = () => {
  window.location.href = "/find"
}

async function sendMessage(data: any) {
  try {
    await connectRedis();
    const isFirstMessage = await redisClient.get(`SEND-${data.search.mobile}`);
    if (isFirstMessage) {
      await closeRedisClient();
      return;
    }

    await redisClient.set(`SEND-${data.search.mobile}`, 1);
    await redisClient.expire(`SEND-${data.search.mobile}`, 900);
    await axios.post(`${process.env.WHATSAPP_BOT_API}`, data);
    await closeRedisClient();
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

function isValidMobileNumber(value: any) {
  // Convert the value to a string in case it's a number
  const strValue = String(value);

  // Regular expression to check for a 10-digit mobile number
  const regex = /^\d{10}$/;

  // Test the value against the regex
  return regex.test(strValue);
}


function isValidOtp(otp: any) {
  const otpPattern = /^\d{4}$/;
  return otpPattern.test(otp);
}

function searchLogic(nameValue: any, fatherNameValue: any, courseValue: any, mobile: any, address: any) {
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
  return { query, options };
}



function validateInputs(queryValues: QueryValues) {
  const { name, fatherName, course, mobile, address, page } = queryValues;
  const errors: string[] = [];

  const MAX_LENGTH = 255;
  const MAX_MOBILE_LENGTH = 15;
  const MAX_PAGE = 5;

  // Validate types and lengths
  if (name) {
    if (typeof name !== 'string') {
      errors.push('Name must be a string');
    } else if (name.length > MAX_LENGTH) {
      errors.push('Name exceeds maximum length');
    }
  }

  if (fatherName) {
    if (typeof fatherName !== 'string') {
      errors.push('Father name must be a string');
    } else if (fatherName.length > MAX_LENGTH) {
      errors.push('Father name exceeds maximum length');
    }
  }

  if (course) {
    if (typeof course !== 'string') {
      errors.push('Course must be a string');
    } else if (course.length > MAX_LENGTH) {
      errors.push('Course exceeds maximum length');
    }
  }

  if (mobile) {
    if (typeof mobile !== 'string') {
      errors.push('Mobile must be a string');
    } else if (!/^\d{10}$/.test(mobile)) {
      errors.push('Mobile must be a valid 10-digit number');
    } else if (mobile.length > MAX_MOBILE_LENGTH) {
      errors.push('Mobile number exceeds maximum length');
    }
  }

  if (address) {
    if (typeof address !== 'string') {
      errors.push('Address must be a string');
    } else if (address.length > MAX_LENGTH) {
      errors.push('Address exceeds maximum length');
    }
  }

  if (page) {
    const pageNumber = Number(page);
    if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > MAX_PAGE) {
      errors.push(`Page must be a number between 1 and ${MAX_PAGE}`);
    }
  }

  return errors;
}


export { redirectToFind, sendMessage, isValidMobileNumber, isValidOtp, searchLogic, validateInputs }