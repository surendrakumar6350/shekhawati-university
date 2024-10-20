import mongoose from "mongoose";

let isConnected = false; // Track connection state

export const connectDb = async (): Promise<void> => {
  try {
    if (!process.env.DB) {
      throw new Error("DB environment variable is not set");
    }

    if (isConnected) {
      console.log("Using existing database connection");
      return; // If already connected, exit the function
    }

    await mongoose.connect(process.env.DB, {
      dbName: "PG_FORMS",
    });

    isConnected = true; // Update connection state
    console.log("Connected to the database");
  } catch (error: any) {
    console.log(error);
    console.log("Database error: Not connected");
  }
};