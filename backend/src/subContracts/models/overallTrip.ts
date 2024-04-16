import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (
    data: Prisma.overallTripCreateInput | Prisma.overallTripUncheckedCreateInput
) => prisma.overallTrip.create({ data })

export const getOverallTrip = () =>
    prisma.overallTrip.findMany({
        include: {
            fuel: {
                include: {
                    bunk: {
                        select: {
                            bunkName: true
                        }
                    }
                }
            },
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
                    truck: { select: { transporter: true } },
                    loadingPoint: {
                        select: {
                            cementCompany: {
                                select: {
                                    advanceType: true
                                }
                            }
                        }
                    }
                }
            },
            loadingPointToUnloadingPointTrip: {
                include: {
                    truck: { select: { transporter: true } },
                    loadingPoint: {
                        select: {
                            cementCompany: {
                                select: {
                                    advanceType: true
                                }
                            }
                        }
                    }
                }
            }
        }
    })
export const getAllActivetripTripByTripStatus = () =>
    prisma.overallTrip.findMany({
        where: {
            OR: [
                {
                    stockPointToUnloadingPointTrip: {
                        tripStatus: false
                    }
                },
                {
                    loadingPointToUnloadingPointTrip: {
                        tripStatus: false
                    }
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
export const getAllTripByAcknowledgementStatus = () =>
    prisma.overallTrip.findMany({
        where: {
            acknowledgementStatus: false,
            OR: [
                { stockPointToUnloadingPointTrip: { tripStatus: true } },
                { loadingPointToUnloadingPointTrip: { tripStatus: true } }
            ]
        },
        include: {
            stockPointToUnloadingPointTrip: {
                include: { loadingPointToStockPointTrip: { include: { truck: true } }, truck: true }
            },
            loadingPointToUnloadingPointTrip: { include: { truck: true } }
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
        where: { id: overallTripId },
        data: { stockPointToUnloadingPointTripId: stockToUnloadingId }
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
                            loadingPointToUnloadingPointTrip: { startDate: { gte: from, lte: to } }
                        },
                        {
                            loadingPointToUnloadingPointTrip: { loadingPointId }
                        },
                        {
                            loadingPointToUnloadingPointTrip: { loadingPoint: { cementCompanyId } }
                        },
                        {
                            loadingPointToUnloadingPointTrip: { truck: { transporterId } }
                        }
                    ]
                },
                {
                    OR: [
                        {
                            loadingPointToStockPointTrip: { startDate: { gte: from, lte: to } }
                        },
                        {
                            loadingPointToStockPointTrip: { loadingPointId }
                        },
                        {
                            loadingPointToStockPointTrip: { loadingPoint: { cementCompanyId } }
                        },
                        {
                            loadingPointToStockPointTrip: { truck: { transporterId } }
                        }
                    ]
                }
            ]
        },
        include: {
            fuel: { include: { bunk: true } },
            paymentDues: true,
            loadingPointToStockPointTrip: {
                include: {
                    truck: { include: { transporter: true } },
                    loadingPoint: true,
                    stockPoint: true
                }
            },
            stockPointToUnloadingPointTrip: { select: { unloadingPoint: true } },
            loadingPointToUnloadingPointTrip: {
                include: {
                    truck: { include: { transporter: true } },
                    loadingPoint: true
                }
            }
        }
    })
export const getTripDetailsByCompanyName = (name: string, startDate: number, endDate: number) => {
    const whereClause: any = {
        acknowledgementStatus: true,
        AND: []
    }

    if (name !== 'null' && startDate !== 0 && endDate !== 0) {
        whereClause.AND.push({
            OR: [
                {
                    stockPointToUnloadingPointTrip: {
                        loadingPointToStockPointTrip: {
                            loadingPoint: { cementCompany: { name } },
                            startDate: { equals: startDate }
                        }
                    }
                },
                {
                    loadingPointToUnloadingPointTrip: {
                        loadingPoint: { cementCompany: { name } },
                        AND: [
                            {
                                startDate: { gte: startDate }
                            },
                            {
                                startDate: { lte: endDate }
                            }
                        ],
                        billNo: null
                    }
                }
            ]
        })
    } else if (name !== 'null' && startDate !== 0) {
        whereClause.AND.push({
            OR: [
                {
                    stockPointToUnloadingPointTrip: {
                        loadingPointToStockPointTrip: {
                            loadingPoint: { cementCompany: { name } },
                            startDate: { equals: startDate }
                        }
                    }
                },
                {
                    loadingPointToUnloadingPointTrip: {
                        loadingPoint: { cementCompany: { name } },
                        startDate: { gte: startDate },
                        billNo: null
                    }
                }
            ]
        })
    } else if (name !== 'null') {
        whereClause.AND.push({
            OR: [
                {
                    stockPointToUnloadingPointTrip: {
                        loadingPointToStockPointTrip: {
                            loadingPoint: { cementCompany: { name } }
                        }
                    }
                },
                {
                    loadingPointToUnloadingPointTrip: {
                        loadingPoint: { cementCompany: { name } },
                        billNo: null
                    }
                }
            ]
        })
    }
    return prisma.overallTrip.findMany({
        where: whereClause,
        include: {
            stockPointToUnloadingPointTrip: {
                include: {
                    loadingPointToStockPointTrip: {
                        include: {
                            truck: { include: { transporter: true } },
                            loadingPoint: true,
                            stockPoint: true
                        }
                    },
                    unloadingPoint: true
                }
            },
            loadingPointToUnloadingPointTrip: {
                include: {
                    truck: { include: { transporter: true } },
                    loadingPoint: true,
                    unloadingPoint: true
                }
            }
        }
    })
}
export const getTripByUnloadDate = (date: number) =>
    prisma.overallTrip.findMany({
        where: {
            acknowledgementStatus: false,
            shortageQuantity: { some: { unloadedDate: { gte: date } } }
        },
        include: {
            shortageQuantity: true,
            loadingPointToUnloadingPointTrip: {
                include: { truck: { include: { transporter: true } } }
            },
            loadingPointToStockPointTrip: {
                include: { truck: { include: { transporter: true } } }
            }
        }
    })

export const getAllDiscrepancyReport = (from: number, to: number) =>
    prisma.overallTrip.findMany({
        where: {
            OR: [
                {
                    acknowledgementStatus: true,
                    loadingPointToStockPointTrip: { startDate: { gte: from, lte: to } }
                },
                {
                    acknowledgementStatus: true,
                    loadingPointToUnloadingPointTrip: { startDate: { gte: from, lte: to } }
                }
            ]
        },
        include: {
            paymentDues: true,
            stockPointToUnloadingPointTrip: true,
            loadingPointToUnloadingPointTrip: {
                include: { truck: { include: { transporter: true } } }
            },
            loadingPointToStockPointTrip: {
                include: { truck: { include: { transporter: true } } }
            },
            shortageQuantity: true
        }
    })

export const getOverAllTripByArrayOfId = (arrayOfId: number[]) =>
    prisma.overallTrip.findMany({
        where: { id: { in: arrayOfId } },
        include: {
            loadingPointToUnloadingPointTrip: {
                select: {
                    id: true,
                    loadingPoint: true,
                    invoiceNumber: true,
                    startDate: true
                }
            },
            loadingPointToStockPointTrip: {
                select: {
                    id: true,
                    loadingPoint: true,
                    invoiceNumber: true,
                    startDate: true
                }
            }
        }
    })
export const tripStatusFilter = (
    cementCompanyId?: string,
    transporterId?: string,
    loadingPointId?: string,
    from?: string,
    to?: string,
    skipNumber?: string
): any =>
    prisma.overallTrip.findMany({
        skip: skipNumber === undefined ? undefined : parseInt(skipNumber),
        take: 15,
        where: {
            OR: [
                {
                    loadingPointToUnloadingPointTrip: {
                        startDate: {
                            gte: from === undefined ? undefined : parseInt(from),
                            lte: to === undefined ? undefined : parseInt(to)
                        },
                        loadingPointId:
                            loadingPointId === undefined ? undefined : parseInt(loadingPointId),
                        loadingPoint: {
                            cementCompanyId:
                                cementCompanyId === undefined
                                    ? undefined
                                    : parseInt(cementCompanyId)
                        },
                        truck: {
                            transporterId:
                                transporterId === undefined ? undefined : parseInt(transporterId)
                        }
                    }
                },
                {
                    loadingPointToStockPointTrip: {
                        startDate: {
                            gte: from === undefined ? undefined : parseInt(from),
                            lte: to === undefined ? undefined : parseInt(to)
                        },
                        loadingPointId:
                            loadingPointId === undefined ? undefined : parseInt(loadingPointId),
                        loadingPoint: {
                            cementCompanyId:
                                cementCompanyId === undefined
                                    ? undefined
                                    : parseInt(cementCompanyId)
                        },
                        truck: {
                            transporterId:
                                transporterId === undefined ? undefined : parseInt(transporterId)
                        }
                    }
                }
            ]
        },
        include: {
            fuel: { include: { bunk: true } },
            paymentDues: true,
            loadingPointToStockPointTrip: {
                include: { truck: { include: { transporter: true } }, loadingPoint: true }
            },
            loadingPointToUnloadingPointTrip: {
                include: { truck: { include: { transporter: true } }, loadingPoint: true }
            }
        }
    })
