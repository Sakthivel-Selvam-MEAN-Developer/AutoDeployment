import prisma from '../../../prisma/index.ts'

export const create = (data: any) => prisma.leaveReasons.create({ data })

export const getAllLeaveReason = () =>
    prisma.leaveReasons.findMany({
        select: {
            id: true,
            name: true
        }
    })
