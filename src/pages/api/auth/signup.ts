import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../../utils/connectDB";
import User from "../../../../models/User";
import { hashPassword } from "../../../../utils/auth";

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

  if (!email || !password) {
    return res.status(422).json({ status: "failed", message: "Invalid data" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(422)
      .json({ status: "failed", message: "user exists already" });
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await User.create({ email, password: hashedPassword });

  res.status(201).json({ status: "success", message: "User Created!" });
}
