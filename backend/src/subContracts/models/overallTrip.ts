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
export const getActiveTripByVehicle = (vehicleNumber: string) =>
    prisma.overallTrip.findFirst({
        where: {
            OR: [
                {
                    truck: { vehicleNumber },
                    loadingPointToStockPointTrip: {
                        tripStatus: false,
                        truck: { vehicleNumber },
                        wantFuel: true
                    }
                },
                {
                    truck: { vehicleNumber },
                    loadingPointToUnloadingPointTrip: {
                        tripStatus: false,
                        truck: { vehicleNumber },
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
            acknowledgementStatus: true,
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
            },
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
                    truck: { transporter: { transporterType: { not: 'Own' } } },
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
                    truck: { transporter: { transporterType: { not: 'Own' } } },
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
            truck: { include: { transporter: true } },
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

export const getOverAllTripByArrayOfId = (arrayOfId: number[], month: string | undefined) =>
    prisma.overallTrip.findMany({
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
                    unloadingPoint: { select: { name: true } },
                    truck: { select: { vehicleNumber: true } }
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
                        invoiceNumber: invoiceNumber === undefined ? undefined : invoiceNumber,
                        truck: {
                            transporterId:
                                transporterId === undefined ? undefined : parseInt(transporterId),
                            vehicleNumber: vehicleNumber === undefined ? undefined : vehicleNumber
                        }
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
        select: {
            id: true,
            transporterInvoice: true,
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
                            csmName: true
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
                    truck: {
                        select: {
                            id: true,
                            vehicleNumber: true,
                            transporter: {
                                select: {
                                    name: true,
                                    gstPercentage: true,
                                    csmName: true
                                }
                            }
                        }
                    },
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
                    truck: {
                        select: {
                            id: true,
                            vehicleNumber: true,
                            transporter: {
                                select: {
                                    id: true,
                                    name: true,
                                    gstPercentage: true,
                                    csmName: true
                                }
                            }
                        }
                    },
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
                        invoiceNumber: invoiceNumber === undefined ? undefined : invoiceNumber,
                        truck: {
                            transporterId:
                                transporterId === undefined ? undefined : parseInt(transporterId),
                            vehicleNumber: vehicleNumber === undefined ? undefined : vehicleNumber
                        }
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
                        invoiceNumber,
                        truck: { transporter: { transporterType: { not: 'Own' } } }
                    }
                },
                {
                    truck: { transporter: { transporterType: { not: 'Own' } } },
                    loadingPointToUnloadingPointTrip: {
                        invoiceNumber,
                        truck: { transporter: { transporterType: { not: 'Own' } } }
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
                            csmName: true
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
            },
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
            },
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
            pricePointApprovalStatus: false,
            paymentDues: { none: { type: 'initial pay' } },
            OR: [
                {
                    truck: {
                        transporter: {
                            transporterType: {
                                not: {
                                    equals: 'Own'
                                }
                            }
                        }
                    },
                    loadingPointToStockPointTrip: {
                        truck: {
                            transporter: {
                                transporterType: {
                                    not: {
                                        equals: 'Own'
                                    }
                                }
                            }
                        }
                    }
                },
                {
                    truck: {
                        transporter: {
                            transporterType: {
                                not: {
                                    equals: 'Own'
                                }
                            }
                        }
                    },
                    loadingPointToUnloadingPointTrip: {
                        truck: {
                            transporter: {
                                transporterType: {
                                    not: {
                                        equals: 'Own'
                                    }
                                }
                            }
                        }
                    }
                }
            ]
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
                            csmName: true,
                            transporterType: true,
                            gstPercentage: true
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
                            name: true,
                            cementCompany: {
                                select: { advanceType: true }
                            }
                        }
                    },
                    stockPoint: { select: { name: true } },
                    truck: {
                        select: {
                            vehicleNumber: true,
                            transporter: {
                                select: {
                                    name: true,
                                    csmName: true,
                                    transporterType: true,
                                    gstPercentage: true
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
                            name: true,
                            cementCompany: {
                                select: { advanceType: true }
                            }
                        }
                    },
                    unloadingPoint: { select: { name: true } },
                    truck: {
                        select: {
                            vehicleNumber: true,
                            transporter: {
                                select: {
                                    name: true,
                                    csmName: true,
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
// export const getOverallTripByVehicleNumber = (vehicleNumber: string) =>
//     prisma.overallTrip.findMany({
//         where: {
//             OR: [
//                 {
//                     truck: { vehicleNumber },
//                     loadingPointToStockPointTrip: {
//                         truck: { vehicleNumber }
//                     },
//                     acknowledgementStatus: true
//                 },
//                 {
//                     truck: { vehicleNumber },
//                     loadingPointToUnloadingPointTrip: {
//                         truck: { vehicleNumber }
//                     },
//                     acknowledgementStatus: true
//                 }
//             ]
//         },
//         orderBy: {
//             id: 'desc'
//         },
//         take: 2,
//         select: {
//             id: true,
//             shortageQuantity: {
//                 select: {
//                     unloadedDate: true,
//                     shortageAmount: true
//                 }
//             },
//             paymentDues: {
//                 select: { payableAmount: true }
//             },
//             truck: {
//                 select: {
//                     vehicleNumber: true,
//                     transporter: {
//                         select: {
//                             name: true,
//                             csmName: true
//                         }
//                     }
//                 }
//             },
//             loadingPointToStockPointTrip: {
//                 select: {
//                     loadingKilometer: true,
//                     unloadingKilometer: true,
//                     filledLoad: true,
//                     totalFreightAmount: true,
//                     startDate: true,
//                     invoiceNumber: true,
//                     truck: {
//                         select: {
//                             vehicleNumber: true,
//                             transporter: {
//                                 select: {
//                                     name: true,
//                                     csmName: true
//                                 }
//                             }
//                         }
//                     },
//                     loadingPoint: {
//                         select: {
//                             name: true
//                         }
//                     },
//                     stockPoint: {
//                         select: {
//                             name: true
//                         }
//                     },
//                     stockPointToUnloadingPointTrip: {
//                         select: {
//                             unloadingPoint: {
//                                 select: {
//                                     name: true
//                                 }
//                             }
//                         }
//                     }
//                 }
//             },
//             loadingPointToUnloadingPointTrip: {
//                 select: {
//                     loadingKilometer: true,
//                     unloadingKilometer: true,
//                     filledLoad: true,
//                     totalFreightAmount: true,
//                     invoiceNumber: true,
//                     startDate: true,
//                     truck: {
//                         select: {
//                             vehicleNumber: true,
//                             transporter: {
//                                 select: {
//                                     name: true,
//                                     csmName: true
//                                 }
//                             }
//                         }
//                     },
//                     loadingPoint: {
//                         select: {
//                             name: true
//                         }
//                     },
//                     unloadingPoint: {
//                         select: {
//                             name: true
//                         }
//                     }
//                 }
//             }
//         }
//     })
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
                            csmName: true,
                            transporterType: true,
                            gstPercentage: true
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
                            name: true,
                            cementCompany: {
                                select: { advanceType: true }
                            }
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
                                    csmName: true,
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
                            name: true,
                            cementCompany: {
                                select: { advanceType: true }
                            }
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
                                    name: true,
                                    csmName: true,
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
                    startDate: true,
                    truck: {
                        select: {
                            vehicleNumber: true
                        }
                    }
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
                    startDate: true,
                    truck: {
                        select: {
                            vehicleNumber: true
                        }
                    }
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
                    startDate: true,
                    truck: {
                        select: {
                            vehicleNumber: true
                        }
                    }
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
                    truck: {
                        select: {
                            vehicleNumber: true
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
            }
        }
    })
export const getOverallTripIdByVehicleNumber = (vehicleNumber: string) =>
    prisma.overallTrip.findFirst({
        orderBy: {
            id: 'desc'
        },
        where: {
            OR: [
                {
                    truck: {
                        vehicleNumber,
                        transporter: {
                            transporterType: 'Own'
                        }
                    },
                    loadingPointToUnloadingPointTrip: {
                        truck: {
                            vehicleNumber,
                            transporter: {
                                transporterType: 'Own'
                            }
                        }
                    }
                },
                {
                    truck: {
                        vehicleNumber,
                        transporter: {
                            transporterType: 'Own'
                        }
                    },
                    loadingPointToStockPointTrip: {
                        truck: {
                            vehicleNumber,
                            transporter: {
                                transporterType: 'Own'
                            }
                        }
                    }
                },
                {
                    truck: {
                        vehicleNumber,
                        transporter: {
                            transporterType: 'Own'
                        }
                    },
                    stockPointToUnloadingPointTrip: {
                        truck: {
                            vehicleNumber,
                            transporter: {
                                transporterType: 'Own'
                            }
                        }
                    }
                }
            ]
        },
        select: {
            id: true
        }
    })
