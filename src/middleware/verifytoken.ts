import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenv.config();

const verifyingToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["token"];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Restricted Access, please provide a token" });
    }

    const decodedData: any = jwt.verify(token, process.env.SECRET);
    req.info = decodedData;
    console.log(decodedData);
  } catch (error) {
    return res.status(401).json({
      message: "not understood",
    });
  }
  next();
};

export { verifyingToken };
