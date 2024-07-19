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
            truck: {
                select: {
                    vehicleNumber: true,
                    transporter: true
                }
            },
            paymentDues: true,
            loadingPointToStockPointTrip: {
                include: {
                    stockPointToUnloadingPointTrip: {
                        include: { unloadingPoint: true }
                    },
                    loadingPoint: true,
                    stockPoint: true
                }
            },

            loadingPointToUnloadingPointTrip: {
                include: {
                    loadingPoint: true,
                    unloadingPoint: true
                }
            }
        }
    })
export const getActiveTripByVehicle = (vehicleNumber: string) =>
    prisma.overallTrip.findFirst({
        where: {
            OR: [
                {
                    truck: { vehicleNumber },
                    loadingPointToStockPointTrip: {
                        tripStatus: false,
                        wantFuel: true
                    }
                },
                {
                    truck: { vehicleNumber },
                    loadingPointToUnloadingPointTrip: {
                        tripStatus: false,
                        wantFuel: true
                    }
                }
            ]
        },
        select: { id: true }
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
            truck: true,
            stockPointToUnloadingPointTrip: {
                include: { loadingPointToStockPointTrip: true }
            },
            loadingPointToUnloadingPointTrip: true
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
            truck: true,
            stockPointToUnloadingPointTrip: {
                include: { loadingPointToStockPointTrip: true }
            },
            loadingPointToUnloadingPointTrip: true
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

const truckWithTransporter = {
    truck: {
        select: {
            vehicleNumber: true,
            transporter: {
                select: {
                    name: true,
                    transporterType: true,
                    gstPercentage: true,
                    employee: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    }
}
export const getOverAllTripById = (id: number) =>
    prisma.overallTrip.findFirst({
        where: {
            id
        },
        select: {
            id: true,
            acknowledgementStatus: true,
            ...truckWithTransporter,
            stockPointToUnloadingPointTrip: {
                select: {
                    acknowledgeDueTime: true,
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
                            acknowledgeDueTime: true,
                            invoiceNumber: true,
                            filledLoad: true,
                            startDate: true,
                            totalTransporterAmount: true,
                            tripStatus: true,
                            loadingPoint: {
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
                    id: true,
                    invoiceNumber: true,
                    filledLoad: true,
                    startDate: true,
                    acknowledgeDueTime: true,
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
                    tripStatus: true
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
            truck: { include: { transporter: true } },
            shortageQuantity: true,
            loadingPointToUnloadingPointTrip: {
                include: {
                    loadingPoint: true,
                    unloadingPoint: true
                }
            },
            loadingPointToStockPointTrip: {
                include: {
                    stockPointToUnloadingPointTrip: { include: { unloadingPoint: true } },
                    loadingPoint: true
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
                    transporterInvoice: { not: '' },
                    truck: { transporter: { transporterType: { not: 'Own' } } },
                    loadingPointToStockPointTrip: {
                        billingRate: { not: null },
                        startDate: { gte: from, lte: to }
                    }
                },
                {
                    acknowledgementStatus: true,
                    acknowledgementApproval: true,
                    transporterInvoice: { not: '' },
                    truck: { transporter: { transporterType: { not: 'Own' } } },
                    loadingPointToUnloadingPointTrip: {
                        billingRate: { not: null },
                        startDate: { gte: from, lte: to }
                    }
                }
            ],
            paymentDues: {
                some: {
                    type: 'final pay',
                    transactionId: { not: '' }
                }
            }
        },
        include: {
            paymentDues: true,
            truck: { include: { transporter: { include: { employee: true } } } },
            stockPointToUnloadingPointTrip: { include: { unloadingPoint: true } },
            loadingPointToUnloadingPointTrip: {
                include: {
                    loadingPoint: true,
                    unloadingPoint: true
                }
            },
            loadingPointToStockPointTrip: {
                include: {
                    loadingPoint: true
                }
            },
            shortageQuantity: true
        }
    })

export const getOverAllTripByArrayOfId = (arrayOfId: number[], month: string | undefined) =>
    prisma.overallTrip.findMany({
        orderBy: [
            {
                loadingPointToStockPointTrip: {
                    startDate: 'asc'
                }
            },
            {
                loadingPointToUnloadingPointTrip: {
                    startDate: 'asc'
                }
            }
        ],
        where: {
            id: { in: arrayOfId },
            OR: [
                {
                    loadingPointToStockPointTrip: {
                        startDate: {
                            gte:
                                month !== undefined
                                    ? dayjs.unix(parseInt(month)).startOf('month').unix()
                                    : undefined,
                            lte:
                                month !== undefined
                                    ? dayjs.unix(parseInt(month)).endOf('month').unix()
                                    : undefined
                        }
                    }
                },
                {
                    loadingPointToUnloadingPointTrip: {
                        startDate: {
                            gte:
                                month !== undefined
                                    ? dayjs.unix(parseInt(month)).startOf('month').unix()
                                    : undefined,
                            lte:
                                month !== undefined
                                    ? dayjs.unix(parseInt(month)).endOf('month').unix()
                                    : undefined
                        }
                    }
                }
            ]
        },
        select: {
            id: true,
            fuel: {
                select: {
                    id: true,
                    fuelType: true,
                    dieselkilometer: true,
                    vehicleNumber: true,
                    quantity: true,
                    totalprice: true,
                    fueledDate: true,
                    invoiceNumber: true,
                    bunk: { select: { bunkName: true } }
                }
            },
            truck: { select: { vehicleNumber: true } },
            loadingPointToUnloadingPointTrip: {
                select: {
                    id: true,
                    filledLoad: true,
                    loadingPoint: {
                        select: { name: true, cementCompany: { select: { name: true } } }
                    },
                    invoiceNumber: true,
                    startDate: true,
                    unloadingPoint: { select: { name: true } }
                }
            },
            loadingPointToStockPointTrip: {
                select: {
                    id: true,
                    filledLoad: true,
                    loadingPoint: {
                        select: { name: true, cementCompany: { select: { name: true } } }
                    },
                    stockPoint: { select: { name: true } },
                    invoiceNumber: true,
                    startDate: true,
                    stockPointToUnloadingPointTrip: {
                        select: { unloadingPoint: { select: { name: true } } }
                    }
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
                    truck: {
                        transporterId:
                            transporterId === undefined ? undefined : parseInt(transporterId),
                        vehicleNumber: vehicleNumber === undefined ? undefined : vehicleNumber
                    },
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
                        invoiceNumber: invoiceNumber === undefined ? undefined : invoiceNumber
                    }
                },
                {
                    truck: {
                        transporterId:
                            transporterId === undefined ? undefined : parseInt(transporterId),
                        vehicleNumber: vehicleNumber === undefined ? undefined : vehicleNumber
                    },
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
                        invoiceNumber: invoiceNumber === undefined ? undefined : invoiceNumber
                    }
                }
            ]
        },
        select: {
            id: true,
            transporterInvoice: true,
            transporterInvoiceReceivedDate: true,
            acknowledgementDate: true,
            acknowledgementStatus: true,
            createdAt: true,
            updatedAt: true,
            fuel: {
                select: {
                    bunk: {
                        select: {
                            bunkName: true
                        }
                    },
                    quantity: true,
                    totalprice: true
                }
            },
            truck: {
                select: {
                    id: true,
                    vehicleNumber: true,
                    transporter: {
                        select: {
                            name: true,
                            gstPercentage: true,
                            employee: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    }
                }
            },
            shortageQuantity: {
                select: {
                    id: true,
                    shortageQuantity: true,
                    shortageAmount: true,
                    unloadedQuantity: true,
                    unloadedDate: true
                }
            },
            paymentDues: {
                select: {
                    id: true,
                    name: true,
                    vehicleNumber: true,
                    dueDate: true,
                    type: true,
                    status: true,
                    payableAmount: true
                }
            },
            stockPointToUnloadingPointTrip: {
                select: {
                    id: true,
                    startDate: true,
                    invoiceNumber: true,
                    freightAmount: true,
                    totalFreightAmount: true,
                    transporterAmount: true,
                    totalTransporterAmount: true,
                    billNo: true,
                    unloadingPoint: {
                        select: {
                            name: true
                        }
                    }
                }
            },
            loadingPointToStockPointTrip: {
                select: {
                    id: true,
                    startDate: true,
                    filledLoad: true,
                    margin: true,
                    tripStatus: true,
                    totalFreightAmount: true,
                    freightAmount: true,
                    transporterAmount: true,
                    totalTransporterAmount: true,
                    invoiceNumber: true,
                    billNo: true,
                    loadingPoint: {
                        select: {
                            name: true,
                            cementCompany: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    },
                    stockPoint: {
                        select: {
                            name: true
                        }
                    },
                    stockPointToUnloadingPointTrip: {
                        select: {
                            id: true,
                            invoiceNumber: true,
                            freightAmount: true,
                            totalFreightAmount: true,
                            transporterAmount: true,
                            totalTransporterAmount: true,
                            startDate: true,
                            billNo: true
                        }
                    }
                }
            },
            loadingPointToUnloadingPointTrip: {
                select: {
                    id: true,
                    margin: true,
                    filledLoad: true,
                    tripStatus: true,
                    startDate: true,
                    invoiceNumber: true,
                    freightAmount: true,
                    totalFreightAmount: true,
                    transporterAmount: true,
                    totalTransporterAmount: true,
                    billNo: true,
                    loadingPoint: {
                        select: {
                            name: true,
                            cementCompany: {
                                select: {
                                    name: true
                                }
                            }
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
                    truck: {
                        transporterId:
                            transporterId === undefined ? undefined : parseInt(transporterId),
                        vehicleNumber: vehicleNumber === undefined ? undefined : vehicleNumber
                    },
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
                        invoiceNumber: invoiceNumber === undefined ? undefined : invoiceNumber
                    }
                },
                {
                    truck: {
                        transporterId:
                            transporterId === undefined ? undefined : parseInt(transporterId),
                        vehicleNumber: vehicleNumber === undefined ? undefined : vehicleNumber
                    },
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
                        invoiceNumber: invoiceNumber === undefined ? undefined : invoiceNumber
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
            truck: {
                select: {
                    vehicleNumber: true,
                    transporter: true
                }
            },
            paymentDues: true,
            loadingPointToStockPointTrip: {
                include: {
                    stockPointToUnloadingPointTrip: {
                        include: { unloadingPoint: true }
                    },
                    loadingPoint: true,
                    stockPoint: true
                }
            },
            loadingPointToUnloadingPointTrip: {
                include: {
                    loadingPoint: true,
                    unloadingPoint: true
                }
            }
        }
    })
export const getTripByTransporterInvoice = (invoiceNumber: string) =>
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
                    truck: { transporter: { transporterType: { not: 'Own' } } },
                    loadingPointToStockPointTrip: {
                        invoiceNumber
                    }
                },
                {
                    truck: { transporter: { transporterType: { not: 'Own' } } },
                    loadingPointToUnloadingPointTrip: {
                        invoiceNumber
                    }
                }
            ]
        },
        select: {
            id: true,
            truck: {
                select: {
                    vehicleNumber: true,
                    transporter: {
                        select: {
                            name: true,
                            employee: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    }
                }
            },
            loadingPointToStockPointTrip: {
                select: {
                    startDate: true,
                    invoiceNumber: true,
                    loadingPoint: {
                        select: {
                            name: true
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
            transporterInvoice: invoice,
            transporterInvoiceReceivedDate: dayjs.utc().startOf('day').unix()
        },
        select: {
            id: true,
            acknowledgementApproval: true,
            acknowledgementDate: true,
            finalPayDuration: true,
            transporterInvoice: true,
            paymentDues: true,
            shortageQuantity: true,
            truck: {
                select: {
                    vehicleNumber: true,
                    transporter: {
                        select: {
                            name: true,
                            tdsPercentage: true,
                            transporterType: true,
                            gstPercentage: true
                        }
                    }
                }
            },
            stockPointToUnloadingPointTrip: {
                select: {
                    totalTransporterAmount: true,
                    loadingPointToStockPointTrip: {
                        select: {
                            totalTransporterAmount: true
                        }
                    }
                }
            },
            loadingPointToUnloadingPointTrip: {
                select: {
                    totalTransporterAmount: true,
                    loadingPointId: true,
                    unloadingPointId: true
                }
            },
            loadingPointToStockPointTrip: {
                select: {
                    totalTransporterAmount: true,
                    loadingPointId: true,
                    stockPointId: true
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
            truck: {
                select: {
                    vehicleNumber: true,
                    transporter: {
                        select: {
                            name: true,
                            tdsPercentage: true,
                            transporterType: true,
                            gstPercentage: true
                        }
                    }
                }
            },
            stockPointToUnloadingPointTrip: {
                select: {
                    totalTransporterAmount: true,
                    loadingPointToStockPointTrip: {
                        select: {
                            totalTransporterAmount: true
                        }
                    }
                }
            },
            loadingPointToUnloadingPointTrip: {
                select: {
                    totalTransporterAmount: true,
                    loadingPointId: true,
                    unloadingPointId: true
                }
            },
            loadingPointToStockPointTrip: {
                select: {
                    totalTransporterAmount: true,
                    loadingPointId: true,
                    stockPointId: true
                }
            }
        }
    })
export const getTripForAcknowlegementApproval = () =>
    prisma.overallTrip.findMany({
        where: {
            acknowledgementApproval: false,
            acknowledgementStatus: true,
            pricePointApprovalStatus: true
        },
        include: {
            paymentDues: true,
            shortageQuantity: true,
            truck: {
                include: { transporter: true }
            },
            stockPointToUnloadingPointTrip: {
                include: {
                    unloadingPoint: true
                }
            },
            loadingPointToUnloadingPointTrip: {
                include: {
                    loadingPoint: true,
                    unloadingPoint: true
                }
            },
            loadingPointToStockPointTrip: {
                include: {
                    loadingPoint: true
                }
            }
        }
    })

export const getTripForPricePointApproval = () =>
    prisma.overallTrip.findMany({
        where: {
            pricePointApprovalStatus: false,
            paymentDues: { none: { type: 'initial pay' } },
            truck: {
                transporter: {
                    transporterType: {
                        not: {
                            equals: 'Own'
                        }
                    }
                }
            }
        },
        select: {
            id: true,
            fuel: true,
            paymentDues: true,
            truck: {
                select: {
                    vehicleNumber: true,
                    transporter: {
                        select: {
                            name: true,
                            transporterType: true,
                            gstPercentage: true,
                            employee: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    }
                }
            },
            loadingPointToStockPointTrip: {
                select: {
                    id: true,
                    startDate: true,
                    invoiceNumber: true,
                    filledLoad: true,
                    freightAmount: true,
                    transporterAmount: true,
                    wantFuel: true,
                    acknowledgeDueTime: true,
                    totalTransporterAmount: true,
                    tripStatus: true,
                    loadingPointId: true,
                    stockPointId: true,
                    loadingPoint: {
                        select: {
                            name: true
                        }
                    },
                    stockPoint: { select: { name: true } }
                }
            },
            loadingPointToUnloadingPointTrip: {
                select: {
                    id: true,
                    startDate: true,
                    invoiceNumber: true,
                    filledLoad: true,
                    freightAmount: true,
                    transporterAmount: true,
                    wantFuel: true,
                    acknowledgeDueTime: true,
                    totalTransporterAmount: true,
                    tripStatus: true,
                    loadingPointId: true,
                    unloadingPointId: true,
                    loadingPoint: {
                        select: {
                            name: true
                        }
                    },
                    unloadingPoint: { select: { name: true } }
                }
            }
        }
    })
export const updatePricePointApprovalStatus = (id: number) =>
    prisma.overallTrip.update({
        where: {
            id
        },
        data: {
            pricePointApprovalStatus: true
        },
        select: {
            id: true,
            fuel: true,
            paymentDues: true,
            pricePointApprovalStatus: true,
            truck: {
                select: {
                    vehicleNumber: true,
                    transporter: {
                        select: {
                            name: true,
                            transporterType: true,
                            gstPercentage: true,
                            employee: {
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
                    id: true,
                    startDate: true,
                    invoiceNumber: true,
                    filledLoad: true,
                    freightAmount: true,
                    transporterAmount: true,
                    wantFuel: true,
                    acknowledgeDueTime: true,
                    totalTransporterAmount: true,
                    tripStatus: true,
                    loadingPointId: true,
                    unloadingPointId: true,
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
            },
            loadingPointToStockPointTrip: {
                select: {
                    id: true,
                    startDate: true,
                    invoiceNumber: true,
                    filledLoad: true,
                    freightAmount: true,
                    transporterAmount: true,
                    wantFuel: true,
                    acknowledgeDueTime: true,
                    totalTransporterAmount: true,
                    tripStatus: true,
                    loadingPointId: true,
                    stockPointId: true,
                    loadingPoint: {
                        select: {
                            name: true
                        }
                    },
                    stockPoint: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    })
export const getOveralltripByToll = () =>
    prisma.overallTrip.findMany({
        where: {
            tollPayment: {
                none: {}
            },
            shortageQuantity: {
                some: {}
            },
            OR: [
                {
                    loadingPointToUnloadingPointTrip: {
                        loadingPoint: {
                            cementCompany: {
                                name: 'ULTRATECH CEMENT LIMITED,TADIPATRI'
                            }
                        }
                    }
                },
                {
                    loadingPointToStockPointTrip: {
                        loadingPoint: {
                            cementCompany: {
                                name: 'ULTRATECH CEMENT LIMITED,TADIPATRI'
                            }
                        }
                    }
                }
            ]
        },
        select: {
            id: true,
            tollPayment: true,
            truck: {
                select: {
                    vehicleNumber: true
                }
            },
            loadingPointToUnloadingPointTrip: {
                select: {
                    invoiceNumber: true,
                    loadingPoint: true,
                    unloadingPoint: true,
                    startDate: true
                }
            },
            loadingPointToStockPointTrip: {
                select: {
                    stockPointToUnloadingPointTrip: {
                        select: {
                            unloadingPoint: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    },
                    invoiceNumber: true,
                    stockPoint: true,
                    loadingPoint: true,
                    startDate: true
                }
            }
        }
    })

export const getOveralltripByTollNotEmpty = () =>
    prisma.overallTrip.findMany({
        where: {
            tollPayment: { some: { billedStatus: false } },
            shortageQuantity: { some: {} },
            OR: [
                {
                    loadingPointToUnloadingPointTrip: {
                        loadingPoint: {
                            cementCompany: {
                                name: 'ULTRATECH CEMENT LIMITED,TADIPATRI'
                            }
                        }
                    }
                },
                {
                    loadingPointToStockPointTrip: {
                        loadingPoint: {
                            cementCompany: {
                                name: 'ULTRATECH CEMENT LIMITED,TADIPATRI'
                            }
                        }
                    }
                }
            ]
        },
        select: {
            id: true,
            tollPayment: {
                select: {
                    id: true,
                    tollPlazaLocation: {
                        select: {
                            id: true,
                            location: true,
                            state: true
                        }
                    },
                    amount: true
                }
            },
            truck: {
                select: {
                    vehicleNumber: true
                }
            },
            loadingPointToUnloadingPointTrip: {
                select: {
                    partyName: true,
                    lrNumber: true,
                    filledLoad: true,
                    invoiceNumber: true,
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
                    startDate: true
                }
            },
            loadingPointToStockPointTrip: {
                select: {
                    partyName: true,
                    lrNumber: true,
                    filledLoad: true,
                    invoiceNumber: true,
                    stockPoint: {
                        select: {
                            name: true
                        }
                    },
                    loadingPoint: {
                        select: {
                            name: true
                        }
                    },
                    startDate: true,
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
            }
        }
    })
export const getOverallTripIdByVehicleNumber = (vehicleNumber: string) =>
    prisma.overallTrip.findFirst({
        orderBy: {
            id: 'desc'
        },
        where: {
            truck: {
                vehicleNumber,
                transporter: {
                    transporterType: 'Own'
                }
            }
        },
        select: {
            id: true
        }
    })
export const updateTdsAmountAndPercentage = (
    id: number,
    tdsAmount: number,
    tdsPercentage: number
) =>
    prisma.overallTrip.update({
        where: { id },
        data: { tdsAmount: tdsAmount, tdsPercenatage: tdsPercentage }
    })
