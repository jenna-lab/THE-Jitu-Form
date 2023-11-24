import mssql from "mssql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerUser, userLogin } from "../controllers/userController";

const res: any = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("Test for user controllers", () => {
  describe("Registering a User", () => {
    it("should Register a User", async () => {
      jest.spyOn(bcrypt, "hash").mockResolvedValueOnce("yutruruyy" as never);
      const mockUser: any = {
        firstName: "Jennifer",
        lastName: "Sammy",
        jituEmail: "jennifer.sammy@thejitu.com",
        userCohort: "17",
        password: "Mahu12#34",
      };
      const req: any = {
        body: mockUser,
      };

      jest.spyOn(mssql, "connect").mockResolvedValueOnce({
        request: jest.fn().mockReturnThis(),
        input: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValueOnce({
          rowsAffected: 1,
        }),
      } as never);
      await registerUser(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "User Registered as success",
      });
    });

    it("should Not Register a User", async () => {
      jest.spyOn(bcrypt, "hash").mockResolvedValueOnce("yutruruyy" as never);
      const mockUser: any = {
        firstName: "lugybfyt",
        lastName: "uygtrtg",
        jituEmail: "jennifer.sammy@thejitu.com",
        userCohort: "17",
        password: "Mahu12#34",
      };
      const req: any = {
        body: mockUser,
      };

      jest.spyOn(mssql, "connect").mockResolvedValueOnce({
        request: jest.fn().mockReturnThis(),
        input: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValueOnce({
          rowsAffected: 0,
        }),
      } as never);
      await registerUser(req, res);

      expect(res.json).toHaveBeenCalledWith({
        message: "Error Registering you",
      });
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  // TESTING USER LOGIN
  describe("Testing user Login Controller", () => {
    it("Should allow a user to Login and return a token", async () => {
      const user: any = {
        id: "876r6gy765g5g6",
        firstName: "Jennifer",
        lastName: "Sammy",
        jituEmail: "jennifer.sammy@thejitu.com",
        userCohort: "7",
        password: "9875y7nh348b34b",
      };

      const req: any = {
        body: {
          jituEmail: "jennifer@thejitu.com",
          password: "12345678",
        },
      };

      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(mssql, "connect").mockResolvedValueOnce({
        request: jest.fn().mockReturnThis(),
        input: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValueOnce({
          rowsAffected: 1,
          recordset: [user],
        }),
      } as never);

      jest.spyOn(bcrypt, "compare").mockResolvedValueOnce(true as never);
      jest.spyOn(jwt, "sign").mockReturnValueOnce("mockedToken" as never);

      await userLogin(req, res);
      expect(res.json).toHaveBeenCalledWith({
        message: "Logged in",
        token: "mockedToken",
      });
    });
  });
});
