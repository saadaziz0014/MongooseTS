export interface Auth {
  username: string;
  email: string;
  auth: {
    password: string;
    salt: string;
  };
}
