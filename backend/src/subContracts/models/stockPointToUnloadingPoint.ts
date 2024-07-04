import { Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import prisma from '../../../prisma/index.ts'
import { filterDataProps } from '../controller/invoice.ts'

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
export const updateBillNumber = (id: number[], billNo: string) =>
    prisma.stockPointToUnloadingPointTrip.updateMany({
        where: {
            id: { in: id }
        },
        data: {
            billNo
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
            loadingPointToStockPointTrip: {
                select: {
                    filledLoad: true,
                    truck: { select: { vehicleNumber: true } },
                    stockPoint: { select: { name: true } }
                }
            },
            overallTrip: { select: { shortageQuantity: { select: { shortageQuantity: true } } } }
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
            id: true,
            startDate: true,
            invoiceNumber: true,
            freightAmount: true,
            totalFreightAmount: true,
            loadingPointToStockPointTrip: {
                select: { filledLoad: true, stockPoint: { select: { name: true } } }
            },
            overallTrip: {
                select: { truck: { select: { vehicleNumber: true } } }
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
            truck: {
                select: {
                    vehicleNumber: true
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
