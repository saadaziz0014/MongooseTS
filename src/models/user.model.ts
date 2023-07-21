import { Auth } from "interfaces/auth.interface";
import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  auth: {
    password: { type: String, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

export const user = model("User", userSchema);

export const getUserEmail = (email: string) => user.findOne({ email });
export const createUser = (val: Auth) => {
  new user(val).save().then((us) => us.toObject());
};
