import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { Utils } from '../utils/utils'
import jwt from 'jsonwebtoken'

const utils = new Utils()
const prisma = new PrismaClient()

export class UserController {
  static async list(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany()
      return res.status(200).json({
        sucess: true,
        data: users,
      })
    } catch (error) {
      return res.status(400).json({
        sucess: false,
        error,
      })
    }
  }

  static async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body

      const passwordHash = await utils.generateHashPassword(password)

      await prisma.user.create({
        data: {
          email,
          password: passwordHash,
          name,
        },
      })
      return res.status(200).json({
        sucess: true,
        data: 'successfully created',
      })
    } catch (error) {
      return res.status(400).json({
        sucess: false,
        error,
      })
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body
      console.log(email, password)
      const user = await prisma.user.findFirst({
        where: { email },
      })
      if (
        (await utils.comparePassword(password, user?.password)) &&
        email == user?.email
      ) {
        const tokenData = {
          id: user?.id,
          name: user?.name,
          email: user?.email,
        }
        const token = jwt.sign(tokenData, '123', { expiresIn: '24h' })
        res.cookie('jwt', token, { httpOnly: true })
        return res.status(200).json({
          sucess: true,
          data: 'successfully login',
        })
      } else {
        return res.status(400).json({
          sucess: false,
          message: 'Email ou Senha invalidos',
        })
      }
    } catch (error) {
      return res.status(400).json({
        sucess: false,
        error,
      })
    }
  }
}
