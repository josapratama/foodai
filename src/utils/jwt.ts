import { sign } from "jsonwebtoken";

export const generateToken = (
  user: { id: string; username: string; email: string },
  secret: string,
  expiresIn: string
) => {
  return sign(user, secret, { expiresIn });
};
