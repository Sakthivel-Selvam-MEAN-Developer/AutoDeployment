import prisma from './index'

export const create = (data) => prisma.customers.create({ data })
export const fetchCustomerByName = (name) =>
    prisma.customers.findFirst({
        where: { name },
        include: {
            contactPerson: true
        }
    })
export const updateCustomerByName = (name, data) =>
    prisma.customers.update({ where: { name }, data })
export const getAllCustomerNames = () =>
    prisma.customers.findMany({ where: {} })
