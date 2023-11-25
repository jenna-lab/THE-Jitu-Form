import { Request, request,response,Response } from 'express';
import mssql from "mssql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  registerUser,
  userLogin,
  updateUser,
  deleteUser,
  getOneUser,
} from "../controllers/userController";

describe("User Controller Tests", () => {
  let req:any;
  let res:any;

  beforeEach(() => {
    req = {
      params: {},
      body: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  //register user
  describe("Registering a User", () => {
    it("should Register a User", async () => {
      jest.spyOn(bcrypt, "hash").mockResolvedValueOnce("yutruruyy" as never);

      const mockUser: any = {
        firstName: "Jennifer",
        lastName: "Sammy",
        jituEmail: "jennifer.sammy@thejitu.com",
        userCohort: "1",
        password: "12345678",
      };

      req.body = mockUser;

      jest.spyOn(mssql, "connect").mockResolvedValueOnce({
        request: jest.fn().mockReturnThis(),
        input: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValueOnce({
          rowsAffected: 1,
        }),
      } as never);

      await registerUser(req, res );

      // expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "User Registered as success"
      });
    });

    it("should Not Register a User", async () => {
      jest.spyOn(bcrypt, "hash").mockResolvedValueOnce("yutruruyy" as never);

      const mockUser: any = {
        // firstName: "lugybfyt",
        lastName: "uygtrtg",
        jituEmail: "jennifer.sammy@thejitu.com",
        userCohort: "1",
        password: "12345678",
      };

      req.body = mockUser;

   

      await registerUser(req as Request,res);

      expect(res.json).toHaveBeenCalledWith(
        "\"firstName\" is required"   
      );
    });
  });

  //login user
  describe("Testing user Login Controller", () => {
    it("Should allow a user to Login and return a token", async () => {
      const user: any = {
        id: "52d902f3-aecd-417c-b79d-22a93fa4355b",
        firstName: "Jennifer",
        lastName: "Sammy",
        jituEmail: "jennifer.sammy@thejitu.com",
        userCohort: "1",
        password: "12345678",
      };

      req.body = {
        jituEmail: "jennifer.Sammy@thejitu.com",
        password: "12345678",
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

  //update user
  describe("updateUser", () => {
    it("should update user successfully", async () => {
      jest.spyOn(mssql, "connect").mockResolvedValueOnce({
        request: jest.fn().mockReturnThis(),
        input: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValueOnce({
          rowsAffected: 1,
        }),
      } as never);

      req.params.id = "7ff2ed2a-ee49-458e-93b5-bc4989751e41";
      req.body = {
        firstName: "Sammy",
        lastName: "Jennifer",
        jituEmail: "sammy.jennifer@thejitu.com",
        userCohort: "2",
      };

      await updateUser(req as Request, res);

      expect(res.json).toHaveBeenCalledWith(
        {
          message:"User updated successfully"}
      );
    });

  it("should handle update error", async () => {
    jest.spyOn(mssql, "connect").mockResolvedValueOnce({
      request: jest.fn().mockReturnThis(),
      input: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValueOnce({
        rowsAffected:[ 0],
      }),
    } as never);

    req.params.id = "123";
    req.body = {
      firstName: "Sammy",
      lastName: "Jennifer",
      jituEmail: "sammy.jennifer@thejitu.com",
      userCohort: "7",
    };

    await updateUser(req, res);

  });
  });

  //delete user
  describe("deleteUser", () => {
    it("should delete a user successfully", async () => {
      jest.spyOn(mssql, "connect").mockResolvedValueOnce({
        request: jest.fn().mockReturnThis(),
        input: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValueOnce({
          rowsAffected: 1,
        }),
      } as never);

      req.params.id = "7ff2ed2a-ee49-458e-93b5-bc4989751e41";

      await deleteUser(req, res);
  expect(res.json).toHaveBeenCalledWith(
        { message:"User deleted successfully"}
      );
    
    });

    it("should handle delete error", async () => {
      jest.spyOn(mssql, "connect").mockResolvedValueOnce({
        request: jest.fn().mockReturnThis(),
        input: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValueOnce({
          rowsAffected: 0,
        }),
      } as never);

      req.params.id = "123";

      await deleteUser(req, res);
    
      

    });
  });


  //getoneuserr
  describe("getOneUser", () => {
    it("should get one user successfully", async () => {
      jest.spyOn(mssql, "connect").mockResolvedValueOnce({
        request: jest.fn().mockReturnThis(),
        input: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValueOnce({
          recordset: [
            { id: "7ff2ed2a-ee49-458e-93b5-bc4989751e41", firstName: "Sammy" },
          ],
        }),
      } as never);

      req.params.id = "7ff2ed2a-ee49-458e-93b5-bc4989751e41";

      await getOneUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        member: [
          { id: "7ff2ed2a-ee49-458e-93b5-bc4989751e41", firstName: "Sammy" },
        ],
      });
    });

    it("should handle getOneUser error", async () => {
      jest.spyOn(mssql, "connect").mockResolvedValueOnce({
        request: jest.fn().mockReturnThis(),
        input: jest.fn().mockReturnThis(),
        execute: jest.fn().mockRejectedValueOnce(new Error("Database Error")),
      } as never);

      req.params.id = "7ff2ed2a-ee49-458e-93b5-bc4989751e41";

      await getOneUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: expect.anything() });
    });
  });
});
