import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (data: Prisma.customersCreateInput | Prisma.customersUncheckedCreateInput) =>
    prisma.customers.create({ data })
export const fetchCustomerByName = (name: string) =>
    prisma.customers.findFirst({
        where: { name },
        include: {
            contactPerson: true
        }
    })
export const updateCustomerByName = (name: string, data: any) =>
    prisma.customers.update({ where: { name }, data })
export const getAllCustomerNames = () => prisma.customers.findMany({ where: {} })
