import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const createTripSalary = async (data: Prisma.tripSalaryCreateInput) => {
    const tripSalaryData = await prisma().tripSalary.findFirst({
        where: {
            loadingPointId: data.loadingPointId,
            unloadingPointId: data.unloadingPointId,
            stockPointId: data.stockPointId
        },
        select: { id: true }
    })
    if (tripSalaryData !== null) {
        return prisma().tripSalary.update({
            where: { id: tripSalaryData.id },
            data: {
                dailyBetta: data.dailyBetta,
                appPayAdvance: data.appPayAdvance,
                tripBetta: data.tripBetta
            }
        })
    }
    return prisma().tripSalary.create({ data })
}

export const getTripSalaryDetailsByLoactionId = (
    loadingPointId: string,
    unloadingPointId: string,
    stockPointId: string
) =>
    prisma().tripSalary.findFirst({
        where: {
            loadingPointId: parseInt(loadingPointId),
            unloadingPointId: parseInt(unloadingPointId),
            stockPointId: parseInt(stockPointId)
        },
        select: {
            id: true,
            dailyBetta: true,
            appPayAdvance: true,
            tripBetta: true
        }
    })

export const getTripSalaryDetailsById = (id: number[]) =>
    prisma().tripSalary.findMany({
        where: { id: { in: id } },
        select: {
            id: true,
            dailyBetta: true,
            appPayAdvance: true,
            tripBetta: true
        }
    })
