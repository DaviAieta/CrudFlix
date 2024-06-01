import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'

export class AuthController {
  static async sendMagicLink(req: Request, res: Response) {
    const { email } = req.body
    return res.status(200).json(email)
  }
}
