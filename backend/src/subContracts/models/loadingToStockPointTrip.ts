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
            }
        }
    })

export const getOnlyActiveStockTripByVehicleNumber = (vehicleNumber: string) =>
    prisma.loadingPointToStockPointTrip.findFirst({
        where: {
            tripStatus: false,
            truck: {
                vehicleNumber
            }
        },
        select: {
            id: true
        }
    })

export const getStockTripByVehicleNumber = (trucknumber: string) =>
    prisma.loadingPointToStockPointTrip.findFirst({
        where: {
            truck: {
                vehicleNumber: trucknumber
            },
            tripStatus: false,
            wantFuel: true
        },
        select: {
            id: true,
            totalTransporterAmount: true,
            truck: {
                select: {
                    transporter: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    })
