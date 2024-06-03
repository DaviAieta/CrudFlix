import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).send({
        error: 'Email and password are required',
      })
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return res.status(404).send({
        error: 'User not found',
      })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(401).send({
        error: 'Incorrect password',
      })
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        birth_date: user.birth_date,
        created_at: user.createdAt,
      },
      '123pass123',
      { expiresIn: '30d' },
    )

    const cleanToken = token.replace(/\//g, '')
    console.log(cleanToken)

    const updatedUser = await prisma.user.update({
      where: { email },
      data: { login_token: cleanToken },
      select: { login_token: true },
    })

    res.send(updatedUser)
  }
}
