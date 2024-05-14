import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserController {
  static async list(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany();
      return res.status(200).json({
        sucess: true,
        data: users,
      });
    } catch (error) {
      return res.status(400).json({
        sucess: false,
        error: error,
      });
    }
  }

  static async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      await prisma.user.create({
        data: {
          email,
          password,
          name,
        },
      });
      return res.status(200).json({
        sucess: true,
        data: "successfully created",
      });
    } catch (error) {
      return res.status(400).json({
        sucess: false,
        error: error,
      });
    }
  }
}
