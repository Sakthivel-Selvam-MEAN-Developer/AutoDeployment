import { Prisma, PrismaClient, PrismaPromise } from '@prisma/client'
import prisma from '../../../prisma/index.ts'
import { filterDataProps } from '../controller/invoice.ts'
import { DefaultArgs } from '@prisma/client/runtime/library'

export const create = (
    data:
        | Prisma.loadingPointToStockPointTripCreateInput
        | Prisma.loadingPointToStockPointTripUncheckedCreateInput
) => prisma().loadingPointToStockPointTrip.create({ data })
const overallTrip = {
    select: {
        truck: {
            select: {
                vehicleNumber: true,
                transporter: { select: { name: true, transporterType: true } }
            }
        }
    }
}
export const getAllStockPointTrip = () =>
    prisma().loadingPointToStockPointTrip.findMany({
        include: {
            loadingPoint: { select: { name: true, cementCompanyId: true } },
            stockPoint: { select: { name: true, id: true } },
            overallTrip: overallTrip,
            stockPointToUnloadingPointTrip: true
        }
    })

export const closeStockTrip = (id: number, arrivalDate: number) =>
    prisma().loadingPointToStockPointTrip.update({
        where: {
            id
        },
        data: {
            tripStatus: true,
            arrivalDate
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
    prismaT.loadingPointToStockPointTrip.updateMany({
        where: {
            id: { in: id }
        },
        data: {
            billNo,
            companyInvoiceId: invoiceId
        }
    })

export const getInvoiceDetails = (id: number[]) =>
    prisma().loadingPointToStockPointTrip.findMany({
        where: { id: { in: id } },
        select: {
            startDate: true,
            partyName: true,
            lrNumber: true,
            stockPoint: { select: { name: true } },
            loadingPoint: {
                select: {
                    name: true,
                    cementCompany: {
                        select: {
                            quantityType: true,
                            primaryBill: {
                                select: { address: true, gstNumber: true, panNumber: true }
                            }
                        }
                    }
                }
            },
            overallTrip: {
                select: {
                    truck: { select: { vehicleNumber: true } },
                    shortageQuantity: { select: { shortageQuantity: true, unloadedQuantity: true } }
                }
            },
            billingRate: true,
            invoiceNumber: true,
            freightAmount: true,
            filledLoad: true
        }
    })
export const getStockTripsByinvoiceFilter = (filterData: filterDataProps) =>
    prisma().loadingPointToStockPointTrip.findMany({
        where: {
            loadingPoint: { cementCompany: { name: filterData.company } },
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
            filledLoad: true,
            freightAmount: true,
            totalFreightAmount: true,
            overallTrip: {
                select: {
                    truck: {
                        select: {
                            vehicleNumber: true
                        }
                    },
                    shortageQuantity: {
                        select: {
                            shortageQuantity: true,
                            unloadedQuantity: true
                        }
                    }
                }
            },
            loadingPoint: {
                select: {
                    name: true,
                    cementCompany: {
                        select: {
                            quantityType: true
                        }
                    }
                }
            },
            stockPoint: {
                select: {
                    name: true
                }
            }
        }
    })
export const getAllStockPointInvoiceNumbers = () =>
    prisma().loadingPointToStockPointTrip.findMany({
        select: {
            invoiceNumber: true
        }
    })
export const getAllStockPointUnbilledTrips = () =>
    prisma().loadingPointToStockPointTrip.findMany({
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
            }
        }
    })
export const updateFreightInStockTrip = (id: number, details: any) =>
    prisma().loadingPointToStockPointTrip.update({
        where: {
            id
        },
        data: {
            approvedFreightAmount: details.approvedFreightAmount,
            transporterAmount: details.transporterAmount,
            totalFreightAmount: details.totalFreightAmount,
            totalTransporterAmount: details.totalTransporterAmount,
            margin: details.margin
        },
        select: {
            totalTransporterAmount: true,
            wantFuel: true,
            overallTrip: {
                select: {
                    truck: {
                        select: {
                            vehicleNumber: true,
                            transporter: {
                                select: { name: true, transporterType: true }
                            }
                        }
                    }
                }
            }
        }
    })
export const updateStockTripBillingRate = (id: string, billingRate: string) =>
    prisma().loadingPointToStockPointTrip.update({
        where: {
            id: parseInt(id)
        },
        data: {
            billingRate: parseFloat(billingRate)
        }
    })
