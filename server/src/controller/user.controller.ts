import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'

export class UserController {
  static async list(req: Request, res: Response) {
    const users = await prisma.user.findMany({})
    return res.send(users)
  }

  static async findOne(req: Request, res: Response) {
    const { userId } = req.params

    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    })

    if (!user) {
      return res.status(404).send({
        error: 'User not found',
      })
    }

    return res.send(user)
  }

  static async create(req: Request, res: Response) {
    const { name, email } = req.body

    if (!name || !email) {
      return res.status(400).send({
        error: 'Name and email are required',
      })
    }

    const userEmailAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    })

    if (userEmailAlreadyExists) {
      return res.status(400).send({
        error: 'User email already exists',
      })
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    })
    res.send(user)
  }
}
