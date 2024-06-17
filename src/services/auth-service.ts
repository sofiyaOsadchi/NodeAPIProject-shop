import bcrypt, { compare } from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IJWTPayload } from "../@types/@types";
//security methods
export const authService = {
  hashPassword: (plainTextPassword: string, rounds = 12) => {
    return bcrypt.hash(plainTextPassword, rounds);
  },

  comparePassword: (plainTextPassword: string, hash: string) => {
    return bcrypt.compare(plainTextPassword, hash);
  },

  generateJWT: (payload: IJWTPayload) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.log("JWT_SECRET must be included in .env file");
    }
    return jwt.sign(payload, secret);
  },

  validateJWT: (token: string) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.log("JWT_SECRET must be included in .env file");
    }

    const payload = jwt.verify(token, secret) as IJWTPayload;
    
    return payload;
  },
};
