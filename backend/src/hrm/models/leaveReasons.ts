import prisma from './index.ts'

export const create = (data: any) => prisma.stopReasons.create({ data })

export const getAllReason = () =>
    prisma.stopReasons.findMany({
        select: {
            id: true,
            name: true
        }
    })
