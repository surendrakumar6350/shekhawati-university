import mongoose, { Schema, Model } from "mongoose";

const userSchema = new Schema({
  aud: String,
  azp: String,
  email: String,
  email_verified: Boolean,
  exp: Number,
  given_name: String,
  iat: Number,
  iss: String,
  jti: String,
  name: String,
  nbf: Number,
  picture: String,
  sub: String,
  date: { type: Date, default: Date.now }
});


export const signup: Model<any, {}> = mongoose.models.signup || mongoose.model("signup", userSchema);