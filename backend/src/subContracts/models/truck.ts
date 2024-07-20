import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'
const tripStatusCheck = [
    {
        loadingPointToStockPointTrip: {
            tripStatus: false
        }
    },
    {
        loadingPointToUnloadingPointTrip: {
            tripStatus: false
        }
    },
    {
        stockPointToUnloadingPointTrip: {
            tripStatus: false
        }
    }
]
export const create = (data: Prisma.truckCreateInput | Prisma.truckUncheckedCreateInput) =>
    prisma().truck.create({ data })
export const getAllTruck = () =>
    prisma().truck.findMany({
        include: {
            transporter: { select: { id: true, name: true } }
        }
    })
export const getTruckByTransporter = (transporterName: string) =>
    prisma().truck.findMany({
        where: {
            transporter: {
                name: transporterName
            },
            overallTrip: {
                none: {
                    OR: [
                        {
                            loadingPointToUnloadingPointTrip: {
                                tripStatus: false
                            }
                        },
                        {
                            loadingPointToStockPointTrip: {
                                tripStatus: false
                            }
                        },
                        {
                            stockPointToUnloadingPointTrip: {
                                tripStatus: false
                            }
                        }
                    ]
                }
            }
        }
    })
export const getNumberByTruckId = (id: number) =>
    prisma().truck.findFirst({
        where: { id },
        select: {
            vehicleNumber: true,
            transporter: { select: { name: true, transporterType: true } }
        }
    })
export const updateTransporterId = (transporterId: number, truckId: number) =>
    prisma().truck.update({
        where: {
            id: truckId,
            overallTrip: { none: { OR: tripStatusCheck } }
        },
        data: { transporterId }
    })
