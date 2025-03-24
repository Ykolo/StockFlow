import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET

export const generateToken = (user: { id: string, email: string, role: string, password: string }) => {
  return jwt.sign(user, SECRET_KEY as string, {
    expiresIn: "1h"
  })
}