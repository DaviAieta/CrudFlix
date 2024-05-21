import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'

export class MovieController {
  static async list(req: Request, res: Response) {
    const movies = await prisma.movie.findMany({})
    return res.send(movies)
  }
  static async findOne() {}
  static async create(req: Request, res: Response) {
    const userId = req.headers['user-id']

    if (!userId) {
      return res.status(401).send({
        error: 'Not authorized',
      })
    }

    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    })

    if (!user) {
      return res.status(401).send({
        error: 'Not authorized ao encontrar',
      })
    }

    const { title, description, genre } = req.body
    const movie = await prisma.movie.create({
      data: {
        title,
        description,
        genre,
        userId: Number(user.id),
      },
    })
    return res.send(movie)
  }
}
