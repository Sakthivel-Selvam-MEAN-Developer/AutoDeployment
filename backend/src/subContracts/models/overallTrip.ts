import { Prisma } from '@prisma/client'
import dayjs from 'dayjs'
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
            acknowledgementStatus: true,
            acknowledgementDate: dayjs().startOf('day').unix()
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
        select: {
            id: true,
            stockPointToUnloadingPointTrip: {
                select: {
                    id: true,
                    tripStatus: true,
                    startDate: true,
                    totalTransporterAmount: true,
                    unloadingPoint: {
                        select: {
                            name: true
                        }
                    },
                    loadingPointToStockPointTrip: {
                        select: {
                            id: true,
                            invoiceNumber: true,
                            filledLoad: true,
                            startDate: true,
                            totalTransporterAmount: true,
                            tripStatus: true,
                            loadingPoint: {
                                select: {
                                    name: true
                                }
                            },
                            truck: {
                                select: {
                                    vehicleNumber: true,
                                    transporter: {
                                        select: {
                                            name: true,
                                            transporterType: true,
                                            gstPercentage: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            loadingPointToUnloadingPointTrip: {
                select: {
                    id: true,
                    invoiceNumber: true,
                    filledLoad: true,
                    startDate: true,
                    totalTransporterAmount: true,
                    tripStatus: true,
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
                                    name: true,
                                    transporterType: true,
                                    gstPercentage: true
                                }
                            }
                        }
                    }
                }
            },
            loadingPointToStockPointTrip: {
                select: {
                    id: true,
                    invoiceNumber: true,
                    filledLoad: true,
                    startDate: true,
                    totalTransporterAmount: true,
                    tripStatus: true,
                    truck: {
                        select: {
                            vehicleNumber: true,
                            transporter: {
                                select: {
                                    name: true,
                                    transporterType: true,
                                    gstPercentage: true
                                }
                            }
                        }
                    }
                }
            }
        }
    })

export const overallTripByFilter = (
    cementCompanyId: number,
    transporterId: number,
    loadingPointId: number,
    vehicleNumber: string,
    invoiceNumber: string,
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
                            loadingPointToUnloadingPointTrip: {
                                truck: { transporterId, vehicleNumber }
                            }
                        },
                        {
                            loadingPointToUnloadingPointTrip: { invoiceNumber }
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
                            loadingPointToStockPointTrip: {
                                truck: { transporterId, vehicleNumber }
                            }
                        },
                        {
                            loadingPointToUnloadingPointTrip: { invoiceNumber }
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
                    loadingPoint: { include: { cementCompany: true } },
                    stockPoint: true
                }
            },
            stockPointToUnloadingPointTrip: { select: { billNo: true, unloadingPoint: true } },
            loadingPointToUnloadingPointTrip: {
                include: {
                    truck: { include: { transporter: true } },
                    loadingPoint: { include: { cementCompany: true } }
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
                    acknowledgementApproval: true,
                    transporterInvoice: {
                        not: ''
                    },
                    loadingPointToStockPointTrip: {
                        startDate: { gte: from, lte: to },
                        truck: { transporter: { transporterType: { not: 'Own' } } }
                    }
                },
                {
                    acknowledgementStatus: true,
                    acknowledgementApproval: true,
                    transporterInvoice: {
                        not: ''
                    },
                    loadingPointToUnloadingPointTrip: {
                        startDate: { gte: from, lte: to },
                        truck: { transporter: { transporterType: { not: 'Own' } } }
                    }
                }
            ],
            paymentDues: {
                some: {
                    type: 'final pay',
                    transactionId: {
                        not: ''
                    }
                }
            }
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
    vehicleNumber?: string,
    invoiceNumber?: string,
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
                        invoiceNumber: invoiceNumber === undefined ? undefined : invoiceNumber,
                        truck: {
                            transporterId:
                                transporterId === undefined ? undefined : parseInt(transporterId),
                            vehicleNumber: vehicleNumber === undefined ? undefined : vehicleNumber
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
                        invoiceNumber: invoiceNumber === undefined ? undefined : invoiceNumber,
                        truck: {
                            transporterId:
                                transporterId === undefined ? undefined : parseInt(transporterId),
                            vehicleNumber: vehicleNumber === undefined ? undefined : vehicleNumber
                        }
                    }
                }
            ]
        },
        include: {
            fuel: { include: { bunk: true } },
            shortageQuantity: true,
            paymentDues: true,
            stockPointToUnloadingPointTrip: { include: { unloadingPoint: true } },
            loadingPointToStockPointTrip: {
                include: {
                    truck: { include: { transporter: true } },
                    loadingPoint: { include: { cementCompany: true } },
                    stockPoint: true,
                    stockPointToUnloadingPointTrip: {
                        select: { unloadingPoint: true, billNo: true }
                    }
                }
            },
            loadingPointToUnloadingPointTrip: {
                include: {
                    truck: { include: { transporter: true } },
                    loadingPoint: { include: { cementCompany: true } },
                    unloadingPoint: true
                }
            }
        }
    })

export const tripStatusFilterCount = (
    cementCompanyId?: string,
    transporterId?: string,
    loadingPointId?: string,
    vehicleNumber?: string,
    invoiceNumber?: string,
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
                        invoiceNumber: invoiceNumber === undefined ? undefined : invoiceNumber,
                        truck: {
                            transporterId:
                                transporterId === undefined ? undefined : parseInt(transporterId),
                            vehicleNumber: vehicleNumber === undefined ? undefined : vehicleNumber
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
                        invoiceNumber: invoiceNumber === undefined ? undefined : invoiceNumber,
                        truck: {
                            transporterId:
                                transporterId === undefined ? undefined : parseInt(transporterId),
                            vehicleNumber: vehicleNumber === undefined ? undefined : vehicleNumber
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
            OR: [
                {
                    loadingPointToStockPointTrip: {
                        truck: { transporter: { transporterType: { not: 'Own' } } },
                        tripStatus: true
                    }
                },
                {
                    loadingPointToUnloadingPointTrip: {
                        truck: { transporter: { transporterType: { not: 'Own' } } },
                        tripStatus: true
                    }
                }
            ]
        },
        select: {
            id: true,
            loadingPointToStockPointTrip: {
                select: {
                    startDate: true,
                    invoiceNumber: true,
                    loadingPoint: {
                        select: {
                            name: true
                        }
                    },
                    truck: {
                        select: {
                            vehicleNumber: true,
                            transporter: {
                                select: {
                                    name: true,
                                    csmName: true
                                }
                            }
                        }
                    },
                    stockPointToUnloadingPointTrip: {
                        select: {
                            startDate: true,
                            invoiceNumber: true,
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
                                            name: true,
                                            csmName: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            loadingPointToUnloadingPointTrip: {
                select: {
                    startDate: true,
                    invoiceNumber: true,
                    loadingPoint: {
                        select: {
                            name: true
                        }
                    },
                    truck: {
                        select: {
                            vehicleNumber: true,
                            transporter: {
                                select: {
                                    name: true,
                                    csmName: true
                                }
                            }
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
        select: {
            id: true,
            acknowledgementApproval: true,
            acknowledgementDate: true,
            finalPayDuration: true,
            transporterInvoice: true,
            paymentDues: true,
            shortageQuantity: true,
            stockPointToUnloadingPointTrip: {
                select: {
                    totalTransporterAmount: true,
                    loadingPointToStockPointTrip: {
                        select: {
                            totalTransporterAmount: true,
                            truck: {
                                select: {
                                    vehicleNumber: true,
                                    transporter: {
                                        select: {
                                            name: true,
                                            tdsPercentage: true,
                                            transporterType: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            loadingPointToUnloadingPointTrip: {
                select: {
                    totalTransporterAmount: true,
                    truck: {
                        select: {
                            vehicleNumber: true,
                            transporter: {
                                select: {
                                    name: true,
                                    tdsPercentage: true,
                                    transporterType: true
                                }
                            }
                        }
                    }
                }
            },
            loadingPointToStockPointTrip: {
                select: {
                    totalTransporterAmount: true,
                    truck: {
                        select: {
                            vehicleNumber: true,
                            transporter: {
                                select: {
                                    name: true,
                                    tdsPercentage: true,
                                    transporterType: true
                                }
                            }
                        }
                    }
                }
            }
        }
    })
export const updateAcknowledgementApproval = async (id: number) =>
    prisma.overallTrip.update({
        where: {
            id
        },
        data: {
            acknowledgementApproval: true
        },
        select: {
            id: true,
            acknowledgementApproval: true,
            acknowledgementDate: true,
            finalPayDuration: true,
            transporterInvoice: true,
            paymentDues: true,
            shortageQuantity: true,
            stockPointToUnloadingPointTrip: {
                select: {
                    totalTransporterAmount: true,
                    loadingPointToStockPointTrip: {
                        select: {
                            totalTransporterAmount: true,
                            truck: {
                                select: {
                                    vehicleNumber: true,
                                    transporter: {
                                        select: {
                                            name: true,
                                            tdsPercentage: true,
                                            transporterType: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            loadingPointToUnloadingPointTrip: {
                select: {
                    totalTransporterAmount: true,
                    truck: {
                        select: {
                            vehicleNumber: true,
                            transporter: {
                                select: {
                                    name: true,
                                    tdsPercentage: true,
                                    transporterType: true
                                }
                            }
                        }
                    }
                }
            },
            loadingPointToStockPointTrip: {
                select: {
                    totalTransporterAmount: true,
                    truck: {
                        select: {
                            vehicleNumber: true,
                            transporter: {
                                select: {
                                    name: true,
                                    tdsPercentage: true,
                                    transporterType: true
                                }
                            }
                        }
                    }
                }
            }
        }
    })
export const getTripForAcknowlegementApproval = () =>
    prisma.overallTrip.findMany({
        where: {
            acknowledgementApproval: false,
            acknowledgementStatus: true
        },
        include: {
            paymentDues: true,
            shortageQuantity: true,
            stockPointToUnloadingPointTrip: {
                include: {
                    unloadingPoint: true
                }
            },
            loadingPointToUnloadingPointTrip: {
                include: {
                    truck: {
                        include: { transporter: true }
                    },
                    loadingPoint: true,
                    unloadingPoint: true
                }
            },
            loadingPointToStockPointTrip: {
                include: {
                    truck: {
                        include: { transporter: true }
                    },
                    loadingPoint: true
                }
            }
        }
    })
export const getTripForPricePointApproval = () =>
    prisma.overallTrip.findMany({
        where: {
            // pricePointApprovalStatus: false
            acknowledgementApproval: false
        },
        include: {
            loadingPointToStockPointTrip: {
                select: {
                    startDate: true,
                    invoiceNumber: true,
                    filledLoad: true,
                    freightAmount: true,
                    transporterAmount: true,
                    loadingPoint: { select: { name: true } },
                    truck: {
                        select: {
                            transporter: {
                                select: {
                                    name: true,
                                    csmName: true
                                }
                            },
                            vehicleNumber: true
                        }
                    }
                }
            },
            loadingPointToUnloadingPointTrip: {
                select: {
                    startDate: true,
                    invoiceNumber: true,
                    filledLoad: true,
                    freightAmount: true,
                    transporterAmount: true,
                    loadingPoint: { select: { name: true } },
                    truck: {
                        select: {
                            transporter: {
                                select: {
                                    name: true,
                                    csmName: true
                                }
                            },
                            vehicleNumber: true
                        }
                    }
                }
            }
        }
    })
export const getNumberByTruckId = (id: number) =>
    prisma.truck.findFirst({
        where: { id },
        select: {
            vehicleNumber: true,
            transporter: {
                select: { name: true, transporterType: true }
            }
        }
    })

export const getOverallTripByVehicleNumber = (vehicleNumber: string) =>
    prisma.overallTrip.findMany({
        where: {
            OR: [
                {
                    loadingPointToStockPointTrip: {
                        truck: { vehicleNumber }
                    },
                    acknowledgementStatus: true
                },
                {
                    loadingPointToUnloadingPointTrip: {
                        truck: { vehicleNumber }
                    },
                    acknowledgementStatus: true
                }
            ]
        },
        orderBy: {
            id: 'desc'
        },
        take: 2,
        select: {
            id: true,
            shortageQuantity: {
                select: {
                    unloadedDate: true,
                    shortageAmount: true
                }
            },
            paymentDues: {
                select: { payableAmount: true }
            },
            loadingPointToStockPointTrip: {
                select: {
                    loadingKilometer: true,
                    unloadingKilometer: true,
                    filledLoad: true,
                    totalFreightAmount: true,
                    startDate: true,
                    invoiceNumber: true,
                    truck: {
                        select: {
                            vehicleNumber: true,
                            transporter: {
                                select: {
                                    name: true,
                                    csmName: true
                                }
                            }
                        }
                    },
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
                    loadingKilometer: true,
                    unloadingKilometer: true,
                    filledLoad: true,
                    totalFreightAmount: true,
                    invoiceNumber: true,
                    startDate: true,
                    truck: {
                        select: {
                            vehicleNumber: true,
                            transporter: {
                                select: {
                                    name: true,
                                    csmName: true
                                }
                            }
                        }
                    },
                    loadingPoint: {
                        select: {
                            name: true
                        }
                    },
                    unloadingPoint: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    })
