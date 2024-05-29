import { Response } from 'express'
import { Prisma } from '@prisma/client'

export const handlePrismaError = (err: any, res: Response) => {
  if ((err as Prisma.PrismaClientKnownRequestError).code) {
        switch (err.code) {
            case 'P2002':
                res.status(500).json({ error: `Duplicate field value at field :  ${err.meta?.target}` })
                break
            case 'P2014':
                res.status(400).json({ error: `Invalid ID at field ${err.meta?.target}` })
                break
            case 'P2003':
                res.status(400).json({ error: `Invalid input data at field ${err.meta?.target}` })
                break
            case 'WW001':
                res.status(400).json({ error: `There is No Trip Salary Details for Specified Locations` })
                break
            default:
                res.status(500).json({ error: 'Something went Wrong' })
        }
    } else res.status(500).json({ error: 'Something went Wrong' })
}

