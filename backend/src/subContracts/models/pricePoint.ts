import prisma from '../../../prisma/index.ts'

type priceType = (
    loadingPointId: number | null,
    unloadingPointId: number | null,
    stockPointId: number | null
) => Promise<{
    freightAmount: number
    transporterAmount: number
    transporterPercentage: number
    payGeneratingDuration: number
    transporterAdvancePercentage: number
} | null>
export const getPricePoint: priceType = (loadingPointId, unloadingPointId, stockPointId) =>
    prisma().pricePoint.findFirst({
        where: { loadingPointId, unloadingPointId, stockPointId }
    })
export const getAllPricePoint = () =>
    prisma().pricePoint.findMany({
        include: {
            loadingPoint: { include: { cementCompany: true } },
            stockPoint: { include: { cementCompany: true } },
            unloadingPoint: { include: { cementCompany: true } }
        }
    })
export const create = async (data: any) => {
    const pricePointData = await prisma().pricePoint.findFirst({
        where: {
            loadingPointId: data.loadingPointId,
            unloadingPointId: data.unloadingPointId,
            stockPointId: data.stockPointId
        },
        select: { id: true }
    })
    if (pricePointData !== null) {
        return prisma().pricePoint.update({
            where: {
                id: pricePointData.id
            },
            data: {
                freightAmount: data.freightAmount,
                transporterPercentage: data.transporterPercentage,
                transporterAmount: data.transporterAmount,
                payGeneratingDuration: data.payGeneratingDuration,
                transporterAdvancePercentage: data.transporterAdvancePercentage
            }
        })
    }
    return prisma().pricePoint.create({ data })
}
