import mongoose from "mongoose";

export const connectDb = async (): Promise<void> => {
  try {
    if (!process.env.DB) {
      throw new Error("DB environment variable is not set");
    }
    await mongoose.connect(process.env.DB, {
      dbName: "PG_FORMS",
    });
    console.log("Connected To DataBase");
  } catch (error: any) {
    console.log(error);
    console.log("database error Not connected");
  }
};
