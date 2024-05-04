import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const createTripSalary = async (data: Prisma.tripSalaryCreateInput) => {
    const tripSalaryData = await prisma.tripSalary.findFirst({
        where: {
            loadingPointId: data.loadingPointId,
            unloadingPointId: data.unloadingPointId,
            stockPointId: data.stockPointId
        },
        select: { id: true }
    })
    if (tripSalaryData !== null) {
        return prisma.tripSalary.update({
            where: { id: tripSalaryData.id },
            data: {
                dailyBetta: data.dailyBetta,
                driverAdvance: data.driverAdvance,
                tripBetta: data.tripBetta
            }
        })
    }
    return prisma.tripSalary.create({ data })
}

export const getTripSalaryDetailsById = (
    cementCompanyId: string,
    loadingPointId: string,
    unloadingPointId: string,
    stockPointId: string
) =>
    prisma.tripSalary.findFirst({
        where: {
            cementCompanyId: parseInt(cementCompanyId),
            loadingPointId: parseInt(loadingPointId),
            unloadingPointId: parseInt(unloadingPointId),
            stockPointId: parseInt(stockPointId)
        },
        select: {
            dailyBetta: true,
            driverAdvance: true,
            tripBetta: true
        }
    })
