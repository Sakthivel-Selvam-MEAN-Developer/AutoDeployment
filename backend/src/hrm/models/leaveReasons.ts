import prisma from './index.ts'

export const create = (data: any) => prisma.leaveReasons.create({ data })

export const getAllReason = () =>
    prisma.leaveReasons.findMany({
        select: {
            id: true,
            name: true
        }
    })
