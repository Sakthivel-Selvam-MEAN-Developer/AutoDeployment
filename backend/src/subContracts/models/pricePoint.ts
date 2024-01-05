import prisma from '../../../prisma/index.ts'

export const getPricePoint = (loadingPointId: number, unloadingPointId: number) =>
    prisma.pricePoint.findFirst({
        where: {
            loadingPointId,
            unloadingPointId
        },
        select: {
            freightAmount: true,
            transporterAmount: true
        }
    })

export const create = async (data: any) => {
    const pricePointData = await prisma.pricePoint.findFirst({
        where: {
            loadingPointId: data.loadingPointId,
            unloadingPointId: data.unloadingPointId
        },
        select: {
            id: true
        }
    })
    if (pricePointData !== null) {
        return prisma.pricePoint.update({
            where: {
                id: pricePointData.id
            },
            data: {
                freightAmount: data.freightAmount,
                transporterAmount: data.transporterAmount
            }
        })
    }
    return prisma.pricePoint.create({ data })
}
