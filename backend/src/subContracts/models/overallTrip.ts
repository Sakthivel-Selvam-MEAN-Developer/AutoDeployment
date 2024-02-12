import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (
    data: Prisma.overallTripCreateInput | Prisma.overallTripUncheckedCreateInput
) => prisma.overallTrip.create({ data })

export const getOverallTrip = () =>
    prisma.overallTrip.findMany({
        include: {
            fuel: true,
            paymentDues: true,
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
            },
            stockPointToUnloadingPointTrip: {
                include: { unloadingPoint: true }
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
                        truck: { vehicleNumber }
                    }
                },
                {
                    loadingPointToUnloadingPointTrip: {
                        tripStatus: false,
                        truck: { vehicleNumber }
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
                        truck: { vehicleNumber },
                        wantFuel: true
                    }
                },
                {
                    loadingPointToUnloadingPointTrip: {
                        tripStatus: false,
                        truck: { vehicleNumber },
                        wantFuel: true
                    }
                }
            ]
        },
        include: {
            loadingPointToStockPointTrip: {
                include: {
                    truck: { select: { transporter: true } }
                }
            },
            loadingPointToUnloadingPointTrip: {
                include: {
                    truck: { select: { transporter: true } }
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
                            NOT: { stockPointToUnloadingPointTrip: null }
                        },
                        {
                            NOT: { loadingPointToStockPointTrip: null }
                        }
                    ]
                },
                {
                    NOT: { loadingPointToUnloadingPointTrip: null }
                }
            ]
        },
        include: {
            stockPointToUnloadingPointTrip: {
                include: {
                    loadingPointToStockPointTrip: {
                        include: { truck: true }
                    }
                }
            },
            loadingPointToUnloadingPointTrip: {
                include: { truck: true }
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
        },
        include: {
            loadingPointToStockPointTrip: true,
            loadingPointToUnloadingPointTrip: {
                include: {
                    truck: {
                        include: {
                            transporter: true
                        }
                    }
                }
            },
            stockPointToUnloadingPointTrip: {
                include: {
                    loadingPointToStockPointTrip: {
                        include: {
                            truck: {
                                include: {
                                    transporter: true
                                }
                            }
                        }
                    }
                }
            }
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
                            truck: {
                                include: {
                                    transporter: true
                                }
                            }
                        }
                    }
                }
            },
            loadingPointToUnloadingPointTrip: {
                include: {
                    truck: {
                        include: {
                            transporter: true
                        }
                    },
                    loadingPoint: true,
                    unloadingPoint: true
                }
            },
            loadingPointToStockPointTrip: true
        }
    })

export const overallTripByFilter = (
    cementCompanyId: number,
    transporterId: number,
    loadingPointId: number,
    from: number,
    to: number
) =>
    prisma.overallTrip.findMany({
        where: {
            OR: [
                {
                    OR: [
                        {
                            loadingPointToUnloadingPointTrip: {
                                startDate: {
                                    gte: from,
                                    lte: to
                                }
                            }
                        },
                        {
                            loadingPointToUnloadingPointTrip: {
                                loadingPointId
                            }
                        },
                        {
                            loadingPointToUnloadingPointTrip: {
                                loadingPoint: {
                                    cementCompanyId
                                }
                            }
                        },
                        {
                            loadingPointToUnloadingPointTrip: {
                                truck: {
                                    transporterId
                                }
                            }
                        }
                    ]
                },
                {
                    OR: [
                        {
                            loadingPointToStockPointTrip: {
                                startDate: {
                                    gte: from,
                                    lte: to
                                }
                            }
                        },
                        {
                            loadingPointToStockPointTrip: {
                                loadingPointId
                            }
                        },
                        {
                            loadingPointToStockPointTrip: {
                                loadingPoint: {
                                    cementCompanyId
                                }
                            }
                        },
                        {
                            loadingPointToStockPointTrip: {
                                truck: {
                                    transporterId
                                }
                            }
                        }
                    ]
                }
            ]
        },
        include: {
            fuel: true,
            paymentDues: true,
            loadingPointToStockPointTrip: {
                include: {
                    truck: {
                        include: {
                            transporter: true
                        }
                    },
                    loadingPoint: true
                }
            },
            loadingPointToUnloadingPointTrip: {
                include: {
                    truck: {
                        include: {
                            transporter: true
                        }
                    },
                    loadingPoint: true
                }
            }
        }
    })
export const getTripDetailsByCompanyName = (name: string) =>
    prisma.overallTrip.findMany({
        where: {
            acknowledgementStatus: true,
            OR: [
                {
                    stockPointToUnloadingPointTrip: {
                        loadingPointToStockPointTrip: {
                            loadingPoint: {
                                cementCompany: {
                                    name
                                }
                            }
                        }
                    }
                },
                {
                    loadingPointToUnloadingPointTrip: {
                        loadingPoint: {
                            cementCompany: {
                                name
                            }
                        }
                    }
                }
            ]
        },
        include: {
            stockPointToUnloadingPointTrip: {
                include: {
                    loadingPointToStockPointTrip: {
                        include: {
                            truck: {
                                include: {
                                    transporter: true
                                }
                            },
                            loadingPoint: true,
                            stockPoint: true
                        }
                    },
                    unloadingPoint: true
                }
            },
            loadingPointToUnloadingPointTrip: {
                include: {
                    truck: {
                        include: {
                            transporter: true
                        }
                    },
                    loadingPoint: true,
                    unloadingPoint: true
                }
            }
        }
    })
export const getTripByUnloadDate = (date: number) =>
    prisma.overallTrip.findMany({
        where: {
            acknowledgementStatus: false,
            shortageQuantity: {
                some: {
                    unloadedDate: {
                        gte: date
                    }
                }
            }
        },
        include: {
            shortageQuantity: true,
            loadingPointToUnloadingPointTrip: {
                include: {
                    truck: {
                        include: {
                            transporter: true
                        }
                    }
                }
            },
            loadingPointToStockPointTrip: {
                include: {
                    truck: {
                        include: {
                            transporter: true
                        }
                    }
                }
            }
        }
    })
