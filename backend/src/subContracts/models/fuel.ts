import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (data: Prisma.fuelCreateInput | Prisma.fuelUncheckedCreateInput) =>
    prisma.fuel.create({ data })

export const getAllFuel = () => prisma.fuel.findMany({})

export const getFuelWithoutTrip = (vehicleNumber: string) =>
    prisma.fuel.findFirst({
        where: {
            vehicleNumber,
            overallTripId: null
        },
        include: {
            bunk: { select: { bunkName: true } }
        }
    })

interface dataProps {
    id: number
    overallTripId: number | null
}
export const updateFuelWithTripId = (data: dataProps) =>
    prisma.fuel.update({
        where: {
            id: data.id
        },
        data: {
            overallTripId: data.overallTripId
        }
    })

export const getFuelDetailsWithoutTrip = () =>
    prisma.fuel.findMany({
        where: {
            paymentStatus: false
        },
        include: {
            bunk: true
        }
    })

export const updateFuelStatus = (fuelId: number) =>
    prisma.fuel.update({
        where: {
            id: fuelId
        },
        data: {
            paymentStatus: true
        }
    })
export const getFuelReport = (
    bunkId?: string,
    paymentStatus?: string,
    vehicleNumber?: string,
    from?: string,
    to?: string,
    skipNumber?: number
) =>
    prisma.fuel.findMany({
        skip: skipNumber,
        take: 200,
        orderBy: {
            id: 'asc'
        },
        where: {
            vehicleNumber:
                vehicleNumber === undefined || vehicleNumber === null ? undefined : vehicleNumber,
            fueledDate: {
                gte:
                    from === undefined || Number.isNaN(parseInt(from)) ? undefined : parseInt(from),
                lte: to === undefined || Number.isNaN(parseInt(to)) ? undefined : parseInt(to)
            },
            bunkId:
                bunkId === undefined || Number.isNaN(parseInt(bunkId))
                    ? undefined
                    : parseInt(bunkId),
            paymentStatus:
                paymentStatus === undefined || paymentStatus === null
                    ? undefined
                    : JSON.parse(paymentStatus)
        },
        select: {
            id: true,
            fueledDate: true,
            vehicleNumber: true,
            quantity: true,
            pricePerliter: true,
            totalprice: true,
            invoiceNumber: true,
            bunk: {
                select: {
                    bunkName: true
                }
            },
            overallTrip: {
                select: {
                    id: true,
                    loadingPointToStockPointTrip: {
                        select: {
                            invoiceNumber: true,
                            loadingPoint: { select: { name: true } },
                            stockPoint: { select: { name: true } },
                            stockPointToUnloadingPointTrip: {
                                select: {
                                    unloadingPoint: {
                                        select: {
                                            name: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    loadingPointToUnloadingPointTrip: {
                        select: {
                            invoiceNumber: true,
                            loadingPoint: { select: { name: true } },
                            unloadingPoint: { select: { name: true } }
                        }
                    }
                }
            }
        }
    })
export const getFuelReportCount = (
    bunkId?: string,
    paymentStatus?: string,
    vehicleNumber?: string,
    from?: string,
    to?: string
) =>
    prisma.fuel.count({
        where: {
            vehicleNumber:
                vehicleNumber === undefined || vehicleNumber === null ? undefined : vehicleNumber,
            fueledDate: {
                gte: from === undefined || from === null ? undefined : parseInt(from),
                lte: to === undefined || to === null ? undefined : parseInt(to)
            },
            bunkId: bunkId === undefined || bunkId === null ? undefined : parseInt(bunkId),
            paymentStatus:
                paymentStatus === undefined || paymentStatus === null
                    ? undefined
                    : JSON.parse(paymentStatus)
        }
    })
export const getPreviousFullFuel = (vehicleNumber: string, date: string, id: string) =>
    prisma.fuel.findFirst({
        where: {
            id: {
                not: { equals: parseInt(id) }
            },
            vehicleNumber,
            fuelType: 'Full tank',
            fueledDate: {
                lte: parseInt(date)
            }
        }
    })
