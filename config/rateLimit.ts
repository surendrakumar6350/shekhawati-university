import { UserRequest } from "@/dbconnection/Schemas/UserRequest";

async function rateLimit(userId : any) {
  let userRequest = await UserRequest.findOne({ userId });
  if (!userRequest) {
    userRequest = new UserRequest({ userId });
  }
  const now = Date.now();
  const dailyReset = new Date(now - (now % 86400000));
  if (userRequest.lastReset < dailyReset) {
    userRequest.requestCount = 0;
    userRequest.lastReset = dailyReset;
  }
  if (userRequest.requestCount >= 50) {
    return { error: "Rate limit exceeded", success: false };
  }
  userRequest.requestCount++;
  await userRequest.save();
  return { success: true };
}

export default rateLimit;
