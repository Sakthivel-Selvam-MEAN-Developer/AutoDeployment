import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'
import { filterDataProps } from '../controller/invoice.ts'
export const create = (
    data:
        | Prisma.loadingPointToStockPointTripCreateInput
        | Prisma.loadingPointToStockPointTripUncheckedCreateInput
) =>
    prisma.loadingPointToStockPointTrip.create({
        data,
        include: {
            truck: {
                select: {
                    vehicleNumber: true,
                    transporter: {
                        select: {
                            name: true,
                            transporterType: true
                        }
                    }
                }
            },
            loadingPoint: {
                select: {
                    cementCompany: {
                        select: { advanceType: true }
                    }
                }
            }
        }
    })

export const getAllStockPointTrip = () =>
    prisma.loadingPointToStockPointTrip.findMany({
        include: {
            loadingPoint: { select: { name: true, cementCompanyId: true } },
            stockPoint: { select: { name: true, id: true } },
            truck: {
                select: {
                    vehicleNumber: true,
                    transporter: { select: { name: true, transporterType: true } }
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
export const updateStockunloadingKilometer = (id: number, unloadingKilometer: number) =>
    prisma.loadingPointToStockPointTrip.update({
        where: {
            id
        },
        data: {
            unloadingKilometer
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
                        select: { primaryBill: { select: { address: true, gstNumber: true } } }
                    }
                }
            },
            overallTrip: {
                select: { shortageQuantity: { select: { shortageQuantity: true } } }
            },
            invoiceNumber: true,
            freightAmount: true,
            truck: { select: { vehicleNumber: true } },
            filledLoad: true
        }
    })
export const getStockTripsByinvoiceFilter = (filterData: filterDataProps) =>
    prisma.loadingPointToStockPointTrip.findMany({
        where: {
            loadingPoint: { cementCompany: { name: filterData.company } },
            startDate: {
                lte: filterData.startDate === 0 ? undefined : filterData.startDate,
                gte: filterData.endDate === 0 ? undefined : filterData.endDate
            },
            billNo: null
        },
        include: {
            loadingPoint: { include: { cementCompany: true } },
            stockPoint: { include: { cementCompany: true } },
            truck: true
        }
    })
export const getAllStockPointInvoiceNumbers = () =>
    prisma.loadingPointToStockPointTrip.findMany({
        select: {
            invoiceNumber: true
        }
    })
export const getAllStockPointUnbilledTrips = () =>
    prisma.loadingPointToStockPointTrip.findMany({
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
    prisma.loadingPointToStockPointTrip.update({
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
            loadingPoint: {
                select: {
                    cementCompany: {
                        select: { advanceType: true }
                    }
                }
            },
            truck: {
                select: {
                    vehicleNumber: true,
                    transporter: {
                        select: { name: true, transporterType: true }
                    }
                }
            }
        }
    })
export const updateStockTripBillingRate = (id: string, billingRate: string) =>
    prisma.loadingPointToStockPointTrip.update({
        where: {
            id: parseInt(id)
        },
        data: {
            billingRate: parseFloat(billingRate)
        }
    })
