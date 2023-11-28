import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (data: Prisma.truckCreateInput) => prisma.truck.create({ data })

export const getAllTruck = () => prisma.truck.findMany({})
