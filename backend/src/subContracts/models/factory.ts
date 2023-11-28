import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (data: Prisma.factoryCreateInput) => prisma.factory.create({ data })

export const getAllFactory = () => prisma.factory.findMany({})
