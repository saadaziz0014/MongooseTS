import { Request, Response } from "express";
import { User } from "../interfaces/user.interface";
import { getUserEmail, createUser } from "../models/user.model";
import { userToauth } from "../wrappers/auth.wrapper";
import { randomN, hash } from "../utils/crypting";
export const register = async (req: Request, res: Response) => {
  try {
    const requested: User = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    };
    const existEmail = await getUserEmail(requested.email);
    if (existEmail) {
      return res.sendStatus(401);
    }
    const useri = userToauth(requested);
    const result = await createUser(useri);
    return res.status(200).json({ result }).end();
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const isExxist = await getUserEmail(email).select(
      "+auth.salt +auth.password"
    );
    if (!isExxist) {
      return res.sendStatus(403);
    }
    const expectedHash = hash(isExxist.auth.salt, password);
    if (expectedHash !== isExxist.auth.password) {
      return res.sendStatus(403);
    }
    const salt = randomN();
    isExxist.auth.sessionToken = hash(salt, isExxist._id.toString());
    await isExxist.save();
    res.cookie("SAADAZIZ", isExxist.auth.sessionToken, {
      domain: "localhost",
      path: "/",
    });
    return res.sendStatus(200).json(isExxist).end();
  } catch (error) {
    return res.sendStatus(500);
  }
};
