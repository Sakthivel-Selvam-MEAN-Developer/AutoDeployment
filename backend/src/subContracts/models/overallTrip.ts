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

export const getOverAllTripByAcknowledgementStatus = () =>
    prisma.overallTrip.findMany({
        where: {
            acknowledgementStatus: false,
            OR: [
                {
                    AND: [
                        {
                            NOT: {
                                stockPointToUnloadingPointTrip: null
                            }
                        },
                        {
                            NOT: {
                                loadingPointToStockPointTrip: null
                            }
                        }
                    ]
                },
                {
                    NOT: {
                        loadingPointToUnloadingPointTrip: null
                    }
                }
            ]
        },
        include: {
            stockPointToUnloadingPointTrip: {
                include: {
                    loadingPointToStockPointTrip: {
                        include: {
                            truck: true
                        }
                    }
                }
            },
            loadingPointToUnloadingPointTrip: {
                include: {
                    truck: true
                }
            }
        }
    })

export const closeAcknowledgementStatusforOverAllTrip = (id: number) =>
    prisma.overallTrip.update({
        where: {
            id
        },
        data: {
            acknowledgementStatus: true
        }
    })

export const updateStockToUnloadingInOverall = (
    overallTripId: number | undefined,
    stockToUnloadingId: number
) =>
    prisma.overallTrip.update({
        where: {
            id: overallTripId
        },
        data: {
            stockPointToUnloadingPointTripId: stockToUnloadingId
        }
    })

export const getOverAllTripIdByLoadingToStockId = (loadingPointToStockPointTripId: number | null) =>
    prisma.overallTrip.findFirst({
        where: {
            loadingPointToStockPointTripId
        },
        select: {
            id: true
        }
    })

export const getOverAllTripById = (id: number) =>
    prisma.overallTrip.findFirst({
        where: {
            id
        },
        include: {
            stockPointToUnloadingPointTrip: {
                include: {
                    unloadingPoint: true,
                    loadingPointToStockPointTrip: {
                        include: {
                            loadingPoint: true,
                            truck: true
                        }
                    }
                }
            },
            loadingPointToUnloadingPointTrip: {
                include: {
                    truck: true,
                    loadingPoint: true,
                    unloadingPoint: true
                }
            }
        }
    })
