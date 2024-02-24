import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (
    data:
        | Prisma.loadingPointToStockPointTripCreateInput
        | Prisma.loadingPointToStockPointTripUncheckedCreateInput
) => prisma.loadingPointToStockPointTrip.create({ data })

export const getAllStockPointTrip = () =>
    prisma.loadingPointToStockPointTrip.findMany({
        include: {
            loadingPoint: {
                select: {
                    name: true
                }
            },
            stockPoint: {
                select: {
                    name: true
                }
            },
            truck: {
                select: {
                    vehicleNumber: true,
                    transporter: {
                        select: {
                            name: true
                        }
                    }
                }
            },
            stockPointToUnloadingPointTrip: true
        }
    })

export const closeStockTrip = (id: number) =>
    prisma.loadingPointToStockPointTrip.update({
        where: {
            id
        },
        data: {
            tripStatus: true
        }
    })
