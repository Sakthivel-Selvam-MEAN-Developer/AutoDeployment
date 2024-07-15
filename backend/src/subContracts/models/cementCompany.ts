import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (
    data: Prisma.cementCompanyCreateInput | Prisma.cementCompanyUncheckedCreateInput
) => {
    return prisma.cementCompany.upsert({
        where: { name: data.name },
        update: data,
        create: data
    })
}
export const getAllCementCompany = () => prisma.cementCompany.findMany({})
