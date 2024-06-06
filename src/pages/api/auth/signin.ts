import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../../utils/connectDB";
import User from "../../../../models/User";
import { verifyPassword } from "../../../../utils/auth";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return;
  }

  try {
    await connectDB();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Failed",
      message: "Error in connecting to DB",
    });
    return;
  }

  const { email, password } = req.body;
  const secretKey = process.env.SECRET_KEY;
  const expiration = 24 * 60 * 50;

  if (!email || !password) {
    return res.status(422).json({ status: "failed", message: "Invalid data" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      status: "failed",
      message: "user doesn't exist!",
    });
  }

  const isValid = await verifyPassword(password, user.password);

  if (!isValid) {
    return res.status(422).json({
      status: "failed",
      message: "username or password is incorrect!",
    });
  }

  const token = sign({ email }, secretKey!, { expiresIn: expiration });

  const serialized = serialize("token", token, {
    httpOnly: true,
    maxAge: expiration,
    path: "/",
  });

  res
    .status(200)
    .setHeader("Set-Cookie", serialized)
    .json({
      status: "success",
      message: "Logged In!",
      data: { email: user.email },
    });
}
