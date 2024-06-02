import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'

export type UserData = {
  name?: string
  email?: string
}

export class UserController {
  static async list(req: Request, res: Response) {
    const users = await prisma.user.findMany({})
    return res.send(users)
  }

  static async create(req: Request, res: Response) {
    const { name, email, password, birth_date } = req.body
    console.log(name, email, password, birth_date)

    if (!name || !email || !password || !birth_date) {
      return res.status(400).send({
        error: 'Name, email and birth date are required',
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
        password,
        birth_date,
      },
    })
    res.send(user)
  }

  static async update(req: Request, res: Response) {
    const { id, name, email } = req.body

    if (!name || !email) {
      return res.status(400).send({
        error: 'Name and email are required',
      })
    }

    const userData: UserData = {}
    if (name) {
      userData.name = name
    }
    if (email) {
      userData.email = email
    }

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: userData,
    })
    return res.send(user)
  }
}
