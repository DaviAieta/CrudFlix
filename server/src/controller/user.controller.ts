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
}
