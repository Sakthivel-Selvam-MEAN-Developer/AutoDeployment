import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (
    data:
        | Prisma.loadingPointToUnloadingPointTripCreateInput
        | Prisma.loadingPointToUnloadingPointTripUncheckedCreateInput
) => prisma.loadingPointToUnloadingPointTrip.create({ data })

export const getAllTrip = () =>
    prisma.loadingPointToUnloadingPointTrip.findMany({
        include: {
            loadingPoint: {
                select: {
                    name: true
                }
            },
            unloadingPoint: {
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

export const getTripByVehicleNumber = (trucknumber: string) =>
    prisma.loadingPointToUnloadingPointTrip.findFirst({
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

export const getOnlyActiveTripByVehicleNumber = (vehicleNumber: string) =>
    prisma.loadingPointToUnloadingPointTrip.findFirst({
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

export const closeTrip = (id: number) =>
    prisma.loadingPointToUnloadingPointTrip.update({
        where: {
            id
        },
        data: {
            tripStatus: true
        }
    })
