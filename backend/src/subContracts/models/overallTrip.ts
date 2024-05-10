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
                    stockPointToUnloadingPointTrip: {
                        include: { unloadingPoint: true }
                    },
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
                { loadingPointToStockPointTrip: { tripStatus: false, truck: { vehicleNumber } } },
                {
                    loadingPointToUnloadingPointTrip: {
                        tripStatus: false,
                        truck: { vehicleNumber }
                    }
                }
            ]
        },
        select: { id: true }
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
            id: true,
            loadingPointToStockPointTrip: { select: { stockPointId: true } }
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
export const getTripByUnloadDate = (date: number) =>
    prisma.overallTrip.findMany({
        where: {
            acknowledgementStatus: false,
            shortageQuantity: { some: { unloadedDate: { lte: date } } }
        },
        include: {
            shortageQuantity: true,
            loadingPointToUnloadingPointTrip: {
                include: {
                    loadingPoint: true,
                    unloadingPoint: true,
                    truck: { include: { transporter: true } }
                }
            },
            loadingPointToStockPointTrip: {
                include: {
                    stockPointToUnloadingPointTrip: { include: { unloadingPoint: true } },
                    loadingPoint: true,
                    truck: { include: { transporter: true } }
                }
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
            stockPointToUnloadingPointTrip: { include: { unloadingPoint: true } },
            loadingPointToUnloadingPointTrip: {
                include: {
                    loadingPoint: true,
                    unloadingPoint: true,
                    truck: { include: { transporter: true } }
                }
            },
            loadingPointToStockPointTrip: {
                include: {
                    loadingPoint: true,
                    truck: { include: { transporter: true } }
                }
            },
            shortageQuantity: true
        }
    })

export const getOverAllTripByArrayOfId = (arrayOfId: number[]) =>
    prisma.overallTrip.findMany({
        where: { id: { in: arrayOfId } },
        select: {
            id: true,
            loadingPointToUnloadingPointTrip: {
                select: {
                    id: true,
                    loadingPoint: { select: { name: true } },
                    invoiceNumber: true,
                    startDate: true,
                    unloadingPoint: { select: { name: true } },
                    truck: { select: { vehicleNumber: true } }
                }
            },
            loadingPointToStockPointTrip: {
                select: {
                    id: true,
                    loadingPoint: { select: { name: true } },
                    invoiceNumber: true,
                    startDate: true,
                    stockPointToUnloadingPointTrip: {
                        select: { unloadingPoint: { select: { name: true } } }
                    },
                    truck: { select: { vehicleNumber: true } }
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
    skipNumber?: number
) =>
    prisma.overallTrip.findMany({
        skip: skipNumber,
        take: 200,
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
            shortageQuantity: true,
            paymentDues: true,
            loadingPointToStockPointTrip: {
                include: {
                    truck: { include: { transporter: true } },
                    loadingPoint: true,
                    stockPoint: true,
                    stockPointToUnloadingPointTrip: { select: { unloadingPoint: true } }
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

export const tripStatusFilterCount = (
    cementCompanyId?: string,
    transporterId?: string,
    loadingPointId?: string,
    from?: string,
    to?: string
) =>
    prisma.overallTrip.count({
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
        }
    })

export const overallTripByPendingPaymentDues = () =>
    prisma.overallTrip.findMany({
        where: {
            paymentDues: {
                some: { status: false }
            }
        },
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
                    stockPointToUnloadingPointTrip: {
                        include: { unloadingPoint: true }
                    },
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
export const getTripByTransporterInvoice = () =>
    prisma.overallTrip.findMany({
        orderBy: [
            {
                loadingPointToStockPointTrip: {
                    startDate: 'desc'
                }
            },
            {
                loadingPointToUnloadingPointTrip: {
                    startDate: 'desc'
                }
            }
        ],
        where: {
            transporterInvoice: '',
            NOT: [
                {
                    loadingPointToStockPointTrip: {
                        truck: { transporter: { transporterType: 'Own' } }
                    }
                },
                {
                    loadingPointToUnloadingPointTrip: {
                        truck: { transporter: { transporterType: 'Own' } }
                    }
                }
            ]
        },
        include: {
            loadingPointToStockPointTrip: {
                include: {
                    stockPointToUnloadingPointTrip: {
                        include: { unloadingPoint: true }
                    },
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
export const updateTransporterInvoice = (invoice: string, id: number) =>
    prisma.overallTrip.update({
        where: {
            id
        },
        data: {
            transporterInvoice: invoice
        },
        include: {
            paymentDues: true,
            stockPointToUnloadingPointTrip: {
                include: {
                    loadingPointToStockPointTrip: {
                        include: {
                            truck: {
                                include: { transporter: true }
                            }
                        }
                    }
                }
            },
            loadingPointToUnloadingPointTrip: {
                include: {
                    truck: {
                        include: { transporter: true }
                    }
                }
            }
        }
    })
