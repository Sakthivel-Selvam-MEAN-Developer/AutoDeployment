import prisma from '../../../prisma/index.ts'

export const create = (data: any) => prisma.customers.create({ data })
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
