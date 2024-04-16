import { Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import prisma from '../../../prisma/index.ts'

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
        where: {
            id: {
                in: id
            }
        },
        select: {
            startDate: true,
            unloadingPoint: {
                select: {
                    name: true
                }
            },
            invoiceNumber: true,
            freightAmount: true,
            loadingPointToStockPointTrip: {
                select: {
                    filledLoad: true,
                    truck: {
                        select: {
                            vehicleNumber: true
                        }
                    },
                    stockPoint: {
                        select: {
                            name: true
                        }
                    }
                }
            },
            overallTrip: {
                select: {
                    shortageQuantity: {
                        select: {
                            shortageQuantity: true
                        }
                    }
                }
            }
        }
    })
