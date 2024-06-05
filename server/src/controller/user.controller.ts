import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export type UserData = {
  name?: string
  email?: string
}

export class UserController {
  static async list(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany({})
      return res.send(users)
    } catch (error) {
      return res.status(404).json({ error })
    }
  }

  static async create(req: Request, res: Response) {
    const { name, email, password, birth_date } = req.body

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

    const hashPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        birth_date,
        login_token: '',
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

  static async getUserName(req: Request, res: Response) {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).send({
        error: 'Authorization token not provided',
      })
    }
    const decodedToken: any = jwt.verify(token, '123pass123')

    const user = await prisma.user.findUnique({
      where: { id: decodedToken.id },
    })

    if (!user) {
      return res.status(404).send({
        error: 'User not found',
      })
    }

    res.send(user)
  }
}
