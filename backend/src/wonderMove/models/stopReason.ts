import prisma from './index'

export const YetToBeIdentifiedReason: string = 'Yet to be identified'

export const getDefaultReason = () =>
    prisma.stopReasons.findUnique({ where: { name: YetToBeIdentifiedReason } })

export const create = (data: any) =>
    prisma.stopReasons.create({ data })

export const update = (data: any) => 
    prisma.stopReasons.update({
        where: {
            id: data.id
        },
        data: {
            name: data.name
        }
    })

export const getAllReason = () =>
    prisma.stopReasons.findMany({
        where: {
            // stops: {
            //     some: {
            //         active: true
            //     }
            // }
        },
        select: {
            id: true,
            name: true
        }
    })
