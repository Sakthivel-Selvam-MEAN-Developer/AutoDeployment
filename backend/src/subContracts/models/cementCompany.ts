import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (data: Prisma.cementCompanyCreateInput) =>
    prisma.cementCompany.create({ data })

export const getAllCementCompany = () => prisma.cementCompany.findMany({})
