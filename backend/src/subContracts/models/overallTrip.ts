import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (
    data: Prisma.overallTripCreateInput | Prisma.overallTripUncheckedCreateInput
) => prisma.overallTrip.create({ data })

export const getOverallTrip = () =>
    prisma.overallTrip.findMany({
        include: {
            loadingPointToStockPointTrip: {
                include: {
                    loadingPoint: true,
                    stockPoint: true,
                    truck: {
                        select: {
                            vehicleNumber: true,
                            transporter: true
                        }
                    }
                }
            },
            loadingPointToUnloadingPointTrip: {
                include: {
                    loadingPoint: true,
                    unloadingPoint: true,
                    truck: {
                        select: {
                            vehicleNumber: true,
                            transporter: true
                        }
                    }
                }
            }
        }
    })

export const getOnlyActiveTripByVehicle = (vehicleNumber: string) =>
    prisma.overallTrip.findFirst({
        where: {
            OR: [
                {
                    loadingPointToStockPointTrip: {
                        tripStatus: false,
                        truck: {
                            vehicleNumber
                        }
                    }
                },
                {
                    loadingPointToUnloadingPointTrip: {
                        tripStatus: false,
                        truck: {
                            vehicleNumber
                        }
                    }
                }
            ]
        },
        select: {
            id: true
        }
    })

export const getActiveTripByVehicle = (vehicleNumber: string) =>
    prisma.overallTrip.findFirst({
        where: {
            OR: [
                {
                    loadingPointToStockPointTrip: {
                        tripStatus: false,
                        truck: {
                            vehicleNumber
                        },
                        wantFuel: true
                    }
                },
                {
                    loadingPointToUnloadingPointTrip: {
                        tripStatus: false,
                        truck: {
                            vehicleNumber
                        },
                        wantFuel: true
                    }
                }
            ]
        },
        include: {
            loadingPointToStockPointTrip: {
                include: {
                    truck: {
                        select: {
                            transporter: true
                        }
                    }
                }
            },
            loadingPointToUnloadingPointTrip: {
                include: {
                    truck: {
                        select: {
                            transporter: true
                        }
                    }
                }
            }
        }
    })
