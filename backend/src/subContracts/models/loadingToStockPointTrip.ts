import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (
    data:
        | Prisma.loadingPointToStockPointTripCreateInput
        | Prisma.loadingPointToStockPointTripUncheckedCreateInput
) => prisma.loadingPointToStockPointTrip.create({ data })

export const getAllStockPointTrip = () =>
    prisma.loadingPointToStockPointTrip.findMany({
        include: {
            loadingPoint: {
                select: {
                    name: true,
                    cementCompanyId: true
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
                            name: true
                        }
                    }
                }
            },
            stockPointToUnloadingPointTrip: true
        }
    })

export const closeStockTrip = (id: number) =>
    prisma.loadingPointToStockPointTrip.update({
        where: {
            id
        },
        data: {
            tripStatus: true
        }
    })

export const updateBillNumber = (id: number[], billNo: string) =>
    prisma.loadingPointToStockPointTrip.updateMany({
        where: {
            id: { in: id }
        },
        data: {
            billNo
        }
    })

export const getInvoiceDetails = (id: number[]) =>
    prisma.loadingPointToStockPointTrip.findMany({
        where: {
            id: {
                in: id
            }
        },
        select: {
            startDate: true,
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
            overallTrip: {
                select: {
                    shortageQuantity: {
                        select: {
                            shortageQuantity: true
                        }
                    }
                }
            },
            invoiceNumber: true,
            freightAmount: true,
            truck: {
                select: {
                    vehicleNumber: true
                }
            },
            filledLoad: true
        }
    })
