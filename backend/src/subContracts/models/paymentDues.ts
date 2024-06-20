import dayjs from 'dayjs'
import { Prisma } from '@prisma/client'
import utc from 'dayjs/plugin/utc'
import prisma from '../../../prisma/index.ts'

dayjs.extend(utc)
export const create = (
    data: Prisma.paymentDuesCreateManyInput | Prisma.paymentDuesCreateManyInput[]
) => prisma.paymentDues.createMany({ data })
interface getOnlyActiveDuesByName {
    by: any[]
    where?: {
        status: boolean
        NEFTStatus: boolean
        dueDate?: {
            equals?: number
            lte?: number
        }
        NOT: { type: string }
        type: string
    }
    _count: { status: true }
    _sum: { payableAmount: true }
}
const searchQuery: getOnlyActiveDuesByName = {
    by: ['name'],
    _count: { status: true },
    _sum: { payableAmount: true }
}
export const getOnlyActiveDuesByName = (dueDate: number, status: boolean, type: string) => {
    searchQuery.where = { status: false, NEFTStatus: status, NOT: { type: 'gst pay' }, type }
    if (dueDate !== dayjs.utc().startOf('day').unix()) {
        searchQuery.where.dueDate = { equals: dueDate }
    } else searchQuery.where.dueDate = { lte: dueDate }
    return prisma.paymentDues.groupBy(searchQuery)
}
interface findTripWithActiveDuesProps {
    where: {
        status: boolean
        NEFTStatus: boolean
        dueDate?: {
            equals?: number
            lte?: number
        }
        NOT: { type: string }
        type: string
    }
    select: {
        id: boolean
        payableAmount: boolean
        overallTripId: boolean
        type: boolean
        name: boolean
        status: boolean
        vehicleNumber: boolean
        fuelId: boolean
        dueDate: boolean
    }
}
export const findTripWithActiveDues = (dueDate: number, status: boolean, type: string) => {
    const query: findTripWithActiveDuesProps = {
        where: {
            status: false,
            NEFTStatus: status,
            NOT: { type: 'gst pay' },
            type
        },
        select: {
            id: true,
            payableAmount: true,
            overallTripId: true,
            type: true,
            name: true,
            status: true,
            vehicleNumber: true,
            fuelId: true,
            dueDate: true
        }
    }
    if (dueDate !== dayjs.utc().startOf('day').unix()) {
        query.where.dueDate = { equals: dueDate }
    } else {
        query.where.dueDate = { lte: dueDate }
    }
    return prisma.paymentDues.findMany(query)
}
interface dataProps {
    id: number
    transactionId: string
    paidAt: number
}
export const updatePaymentDues = (data: dataProps) =>
    prisma.paymentDues.update({
        where: { id: data.id },
        data: {
            transactionId: data.transactionId,
            status: true,
            paidAt: data.paidAt
        }
    })

export const getPaymentDuesWithoutTripId = (vehicleNumber: string) =>
    prisma.paymentDues.findFirst({
        where: {
            vehicleNumber,
            status: false,
            overallTripId: null
        }
    })
interface props {
    id: number | undefined
    overallTripId: number | undefined
}
export const updatePaymentDuesWithTripId = (data: props) =>
    prisma.paymentDues.update({
        where: {
            id: data.id
        },
        data: {
            overallTripId: data.overallTripId
        }
    })

export const getDueByOverallTripId = (overallTripId: number) =>
    prisma.paymentDues.findMany({
        where: {
            overallTripId,
            NOT: { type: 'gst pay' }
        },
        select: {
            payableAmount: true,
            type: true
        }
    })
export const updatePaymentNEFTStatus = (dueId: number[]) =>
    prisma.paymentDues.updateMany({
        where: {
            id: { in: dueId }
        },
        data: {
            NEFTStatus: true
        }
    })

export const getGstDuesGroupByName = (status: boolean) =>
    prisma.paymentDues.groupBy({
        by: ['name'],
        where: { status: false, NEFTStatus: status, type: 'gst pay' },
        _count: { status: true },
        _sum: { payableAmount: true }
    })

export const getGstPaymentDues = (name: string[], status: boolean) =>
    prisma.paymentDues.findMany({
        where: {
            name: {
                in: name
            },
            status: false,
            NEFTStatus: status,
            type: 'gst pay'
        },
        include: {
            overallTrip: {
                select: {
                    transporterInvoice: true,
                    loadingPointToStockPointTrip: {
                        select: {
                            startDate: true,
                            invoiceNumber: true,
                            loadingPoint: { select: { name: true } }
                        }
                    },
                    loadingPointToUnloadingPointTrip: {
                        select: {
                            startDate: true,
                            invoiceNumber: true,
                            loadingPoint: { select: { name: true } },
                            unloadingPoint: { select: { name: true } }
                        }
                    },
                    stockPointToUnloadingPointTrip: {
                        select: { unloadingPoint: { select: { name: true } } }
                    }
                }
            }
        }
    })
export const getUpcomingDuesByFilter = (
    name: string | undefined,
    from: string | undefined,
    to: string | undefined,
    type: string | undefined
) =>
    prisma.paymentDues.findMany({
        where: {
            name,
            type,
            dueDate: {
                gte: from !== undefined ? parseInt(from) : undefined,
                lte: to !== undefined ? parseInt(to) : undefined
            },
            status: false
        },
        select: {
            id: true,
            name: true,
            vehicleNumber: true,
            dueDate: true,
            type: true,
            payableAmount: true,
            overallTrip: {
                select: {
                    loadingPointToStockPointTrip: {
                        select: {
                            startDate: true,
                            invoiceNumber: true,
                            loadingPoint: { select: { name: true } },
                            stockPointToUnloadingPointTrip: {
                                select: {
                                    startDate: true,
                                    invoiceNumber: true,
                                    unloadingPoint: { select: { name: true } }
                                }
                            },
                            truck: {
                                select: {
                                    vehicleNumber: true,
                                    transporter: {
                                        select: {
                                            csmName: true
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
                            loadingPoint: { select: { name: true } },
                            unloadingPoint: { select: { name: true } },
                            truck: {
                                select: {
                                    vehicleNumber: true,
                                    transporter: {
                                        select: {
                                            csmName: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })

export const getCompletedDues = (
    name: string,
    from: number,
    to: number,
    _page: number,
    type: string
) => {
    const whereCondition: any = {
        status: true,
        AND: []
    }
    if (name !== 'null' && from !== 0 && to !== 0 && type !== null) {
        whereCondition.AND.push({
            name,
            paidAt: {
                gte: from,
                lte: to
            },
            type
        })
    }
    if (name !== 'null') {
        whereCondition.AND.push({ name })
    }
    if (from !== 0 && to !== 0) {
        whereCondition.AND.push({
            paidAt: {
                gte: from,
                lte: to
            }
        })
    }
    if (type !== '') {
        whereCondition.AND.push({ type })
    }
    return prisma.paymentDues.findMany({
        where: whereCondition,
        select: {
            name: true,
            paidAt: true,
            transactionId: true,
            type: true,
            payableAmount: true,
            vehicleNumber: true,
            overallTrip: {
                include: {
                    stockPointToUnloadingPointTrip: { include: { unloadingPoint: true } },
                    loadingPointToStockPointTrip: {
                        include: {
                            loadingPoint: true,
                            truck: { include: { transporter: true } }
                        }
                    },
                    loadingPointToUnloadingPointTrip: {
                        include: {
                            loadingPoint: true,
                            unloadingPoint: true,
                            truck: { include: { transporter: true } }
                        }
                    }
                }
            }
        }
    })
}

export const getFuelPaymentDuesTripId = (id: number) =>
    prisma.paymentDues.findFirst({
        where: {
            fuelId: id
        },
        select: {
            transactionId: true
        }
    })
