import prisma from '../../../prisma/index.ts'

export const getPricePoint = (
    loadingPointId: number | null,
    unloadingPointId: number | null,
    stockPointId: number | null
) =>
    prisma.pricePoint.findFirst({
        where: {
            loadingPointId,
            unloadingPointId,
            stockPointId
        },
        select: {
            freightAmount: true,
            transporterAmount: true,
            transporterPercentage: true
        }
    })
export const create = async (data: any) => {
    const pricePointData = await prisma.pricePoint.findFirst({
        where: {
            loadingPointId: data.loadingPointId,
            unloadingPointId: data.unloadingPointId,
            stockPointId: data.stockPointId
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
                transporterPercentage: data.transporterPercentage,
                transporterAmount: data.transporterAmount
            }
        })
    }
    return prisma.pricePoint.create({ data })
}
