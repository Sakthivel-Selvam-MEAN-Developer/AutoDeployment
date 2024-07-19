import { Prisma, PrismaClient, PrismaPromise } from '@prisma/client'
import dayjs from 'dayjs'
import prisma from '../../../prisma/index.ts'
import { filterDataProps } from '../controller/invoice.ts'
import { DefaultArgs } from '@prisma/client/runtime/library'

export const create = (
    data:
        | Prisma.stockPointToUnloadingPointTripCreateInput
        | Prisma.stockPointToUnloadingPointTripUncheckedCreateInput
) => prisma.stockPointToUnloadingPointTrip.create({ data })

export const getAllStockToUnloadingPointTrip = () =>
    prisma.stockPointToUnloadingPointTrip.findMany({})

export const updateUnloadWeightForStockTrip = (id: number) =>
    prisma.stockPointToUnloadingPointTrip.update({
        where: { id },
        data: {
            tripStatus: true,
            acknowledgeDueTime: dayjs().subtract(1, 'minute').unix(),
            loadingPointToStockPointTrip: {
                update: { acknowledgeDueTime: dayjs().subtract(1, 'minute').unix() }
            }
        }
    })
type type = (
    prismaT: Omit<
        PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
        '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
    >,
    id: number[],
    billNo: string,
    invoiceId: number
) => PrismaPromise<{ count: number }>
export const updateBillNumber: type = (prismaT, id, billNo, invoiceId) =>
    prismaT.stockPointToUnloadingPointTrip.updateMany({
        where: {
            id: { in: id }
        },
        data: {
            billNo,
            companyInvoiceId: invoiceId
        }
    })

export const getInvoiceDetails = (id: number[]) =>
    prisma.stockPointToUnloadingPointTrip.findMany({
        where: { id: { in: id }, tripStatus: true },
        select: {
            startDate: true,
            partyName: true,
            lrNumber: true,
            unloadingPoint: {
                select: {
                    name: true,
                    cementCompany: {
                        select: {
                            name: true,
                            secondaryBill: {
                                select: { address: true, gstNumber: true, panNumber: true }
                            }
                        }
                    }
                }
            },
            invoiceNumber: true,
            freightAmount: true,
            billingRate: true,
            loadingPointToStockPointTrip: {
                select: {
                    filledLoad: true,
                    stockPoint: { select: { name: true } }
                }
            },
            overallTrip: {
                select: {
                    shortageQuantity: { select: { shortageQuantity: true } },
                    truck: { select: { vehicleNumber: true } }
                }
            }
        }
    })

export const getUnloadingTripsByinvoiceFilter = (filterData: filterDataProps) =>
    prisma.stockPointToUnloadingPointTrip.findMany({
        where: {
            tripStatus: true,
            unloadingPoint: { cementCompany: { name: filterData.company } },
            startDate: {
                lte: filterData.startDate === 0 ? undefined : filterData.startDate,
                gte: filterData.endDate === 0 ? undefined : filterData.endDate
            },
            billNo: null
        },
        select: {
            billingRate: true,
            id: true,
            startDate: true,
            invoiceNumber: true,
            freightAmount: true,
            totalFreightAmount: true,
            loadingPointToStockPointTrip: {
                select: { filledLoad: true, stockPoint: { select: { name: true } } }
            },
            overallTrip: {
                select: {
                    truck: { select: { vehicleNumber: true } },
                    shortageQuantity: {
                        select: {
                            unloadedQuantity: true
                        }
                    }
                }
            },
            unloadingPoint: { select: { name: true } }
        }
    })
export const getAllStockToUnloadingPointInvoiceNumbers = () =>
    prisma.stockPointToUnloadingPointTrip.findMany({
        select: {
            invoiceNumber: true
        }
    })
export const getAllStockToUnloadingPointUnbilledTrips = () =>
    prisma.stockPointToUnloadingPointTrip.findMany({
        where: {
            overallTrip: {
                some: {
                    acknowledgementStatus: true
                }
            },
            billNo: { equals: null }
        },
        select: {
            id: true,
            invoiceNumber: true,
            startDate: true,
            acknowledgeDueTime: true,
            overallTrip: {
                select: {
                    truck: {
                        select: {
                            vehicleNumber: true
                        }
                    }
                }
            },
            loadingPointToStockPointTrip: {
                select: {
                    loadingPoint: {
                        select: {
                            name: true,
                            cementCompany: {
                                select: {
                                    name: true
                                }
                            }
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
    })
export const updateUnloadingTripBillingRate = (id: string, billingRate: string) =>
    prisma.stockPointToUnloadingPointTrip.update({
        where: {
            id: parseInt(id)
        },
        data: {
            billingRate: parseFloat(billingRate)
        }
    })
