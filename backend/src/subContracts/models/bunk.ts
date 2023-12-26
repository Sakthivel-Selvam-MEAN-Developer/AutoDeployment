import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (data: Prisma.bunkCreateInput) => prisma.bunk.create({ data })

export const getAllBunk = () => prisma.bunk.findMany({})
