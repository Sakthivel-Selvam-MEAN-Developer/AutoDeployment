import prisma from '../../../prisma'

export const create = (data: any) => prisma.leaveReasons.create({ data })

export const getAllLeaveReason = () =>
    prisma.leaveReasons.findMany({
        select: {
            id: true,
            name: true
        }
    })
