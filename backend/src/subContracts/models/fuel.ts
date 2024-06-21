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
export const getFuelReport = () =>
    prisma.fuel.findMany({
        take: 5,
        skip: 0,
        select: {
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
