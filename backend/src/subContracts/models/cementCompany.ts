import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (
    data: Prisma.cementCompanyCreateInput | Prisma.cementCompanyUncheckedCreateInput,
    id: number
) => {
    return prisma().cementCompany.upsert({
        where: { id },
        update: data,
        create: data
    })
}
export const getAllCementCompany = () =>
    prisma().cementCompany.findMany({
        select: {
            id: true,
            name: true,
            gstNo: true,
            address: true,
            emailId: true,
            contactPersonName: true,
            contactPersonNumber: true,
            quantityType: true
        }
    })
