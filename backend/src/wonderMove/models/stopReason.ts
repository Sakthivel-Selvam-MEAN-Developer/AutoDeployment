import prisma from './index'

export const YetToBeIdentifiedReason: string = 'Yet to be identified'

export const getDefaultReason = () =>
    prisma.stopReasons.findUnique({ where: { name: YetToBeIdentifiedReason } })

export const create = (data: any) =>
    prisma.stopReasons.upsert({
        where: { name: data.name },
        create: data,
        update: {}
    })

export const getAllReason = () =>
    prisma.stopReasons.findMany({
        where: {},
        select: {
            id: true,
            name: true
        }
    })
