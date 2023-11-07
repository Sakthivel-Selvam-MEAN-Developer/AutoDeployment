import prisma from './index.ts'

export const create = (data: any) => prisma.leaves.create({ data })

export const getAllEmployeeLeaveForm = () =>
    prisma.leaves.findMany({
        where: {
            active: true
        }
    })
