import { request, Request, Response } from "express";
import * as mssql from "mssql";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import * as dotenv from "dotenv";
import * as joi from "joi";
import {
  userRegisterSchema,
  userLoginSchema,
} from "../validators/validator";
import { sqlConfig } from "../config/sqlConfig";

dotenv.config({ path: "../.env" });


const registerUser = async (req: Request, res: Response) => {
  try {
    const id = uuidv4();

    const { firstName, lastName, jituEmail, password, userCohort } = req.body;
    const { error } = userRegisterSchema.validate(req.body);

    if (error) {
      return res.status(422).json(error.details[0].message);
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const pool = await mssql.connect(sqlConfig);
    const result = await pool
      .request()
      .input("id", id)
      .input("firstName", firstName)
      .input("lastName", lastName)
      .input("jituEmail", jituEmail)
      .input("password", hashedPassword)
      .input("userCohort", userCohort)
      .execute("registerUserProc");

    if (result) {
      return res.status(200).json({ message: "User Registered as success" });
    } else {
      return res.status(400).json({ message: "Error Registering you" });
    }
  } catch (error) {
    res.json({ Error: error });
  }
};

const userLogin = async (req: Request, res: Response) => {
  try {
    const { jituEmail, password } = req.body;
    const { error } = userLoginSchema.validate(req.body);

    if (error) {
      return res.status(422).json(error.details[0].message);
    }

    const pool = await mssql.connect(sqlConfig);
    const user = (
      await pool
        .request()
        .input("jituEmail", mssql.VarChar, jituEmail)
        .execute("loginUserProc")
    ).recordset[0];

    if (user) {
      const hashedPassword = user.password;
      const comparePwd = await bcrypt.compare(password, hashedPassword);

      if (comparePwd) {
        const { password, ...payload } = user;
        const token = jwt.sign(payload, "gyuhb986ji4", {
          expiresIn: "36000s",
        });

        return res.status(200).json({
          message: "Logged in",
          token,
        });
      } else {
        return res.status(400).json({
          message: "Invalid Login Credential",
        });
      }
    } else {
      return res.status(400).json({
        message: "User Not Found",
      });
    }
  } catch (error) {
    res.json({ Error: error });
  }
};

export { registerUser, userLogin };
