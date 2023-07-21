import { User } from "interfaces/user.interface";
import { Auth } from "interfaces/auth.interface";
import { randomN, hash } from "utils/crypting";
export const userToauth = (val: User) => {
  const salt = randomN();
  const change: Auth = {
    username: val.username,
    email: val.email,
    auth: {
      salt,
      password: hash(salt, val.password),
    },
  };
  return change;
};
