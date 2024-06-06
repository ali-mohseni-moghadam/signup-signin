import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "../../../utils/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return;

  const { token } = req.cookies;

  const secretKey = process.env.SECRET_KEY;

  if (!token) {
    return res.status(401).json({
      status: "failed",
      message: "you are not logged in",
    });
  }

  const result = verifyToken(token, secretKey!);

  if (result) {
    res.status(200).json({
      status: "success",
      data: result,
    });
  } else {
    res.status(401).json({
      status: "failed",
      message: "you are unauthorized",
    });
  }

  res.json({});
}
