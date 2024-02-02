import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (data: Prisma.accountTypeCreateInput) => prisma.accountType.create({ data })

export const getAllAccountTypes = () => prisma.accountType.findMany({})
