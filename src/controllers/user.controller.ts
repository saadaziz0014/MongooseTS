import express, { Request, Response } from "express";
import { User } from "interfaces/user.interface";
import { getUserEmail, createUser } from "models/user.model";
import { userToauth } from "wrappers/auth.wrapper";
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
    return res.status(200).json(result).end();
  } catch (error) {
    return res.sendStatus(500);
  }
};
