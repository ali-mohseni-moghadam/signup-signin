import { compare, hash } from "bcryptjs";
import { JwtPayload, verify } from "jsonwebtoken";

async function hashPassword(password: string) {
  const hashedPassword = await hash(password, 12);

  return hashedPassword;
}

async function verifyPassword(password: string, hashPassword: string) {
  const isValid = await compare(password, hashPassword);

  return isValid;
}

function verifyToken(token: string, secretKey: any) {
  try {
    const result = verify(token, secretKey);
    if (typeof result !== "string") return { email: result.email };
  } catch (error) {
    console.log(error);
    return false;
  }
}

export { hashPassword, verifyPassword, verifyToken };
