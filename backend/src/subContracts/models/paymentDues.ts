import prisma from '../../../prisma/index.ts'

export const create = (data: any) => prisma.paymentDues.createMany({ data })

export const getOnlyActiveDuesByName = (dueDate: number, status: boolean) =>
    prisma.paymentDues.groupBy({
        by: ['name'],
        where: {
            status: false,
            NEFTStatus: status,
            dueDate: {
                lte: dueDate
            },
            NOT: {
                type: 'gst pay'
            }
        },
        _count: {
            status: true
        },
        _sum: {
            payableAmount: true
        }
    })

export const findTripWithActiveDues = (dueDate: number, status: boolean) =>
    prisma.paymentDues.findMany({
        where: {
            status: false,
            NEFTStatus: status,
            dueDate: {
                lte: dueDate
            },
            NOT: {
                type: 'gst pay'
            }
        },
        select: {
            id: true,
            payableAmount: true,
            overallTripId: true,
            type: true,
            name: true,
            status: true,
            vehicleNumber: true,
            fuelId: true
        }
    })
interface dataProps {
    id: number
    transactionId: string
    paidAt: number
}
export const updatePaymentDues = (data: dataProps) =>
    prisma.paymentDues.update({
        where: {
            id: data.id
        },
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
            NOT: {
                type: 'gst pay'
            }
        },
        select: {
            payableAmount: true
        }
    })
export const updatePaymentNEFTStatus = (dueId: number[]) =>
    prisma.paymentDues.updateMany({
        where: {
            id: {
                in: dueId
            }
        },
        data: {
            NEFTStatus: true
        }
    })

export const getGstDuesGroupByName = (status: boolean) =>
    prisma.paymentDues.groupBy({
        by: ['name'],
        where: {
            status: false,
            NEFTStatus: status,
            type: 'gst pay'
        },
        _count: {
            status: true
        },
        _sum: {
            payableAmount: true
        }
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
        select: {
            id: true,
            payableAmount: true,
            overallTripId: true,
            type: true,
            name: true,
            vehicleNumber: true,
            status: true,
            fuelId: true
        }
    })
export const getUpcomingDuesByFilter = (name: string, from: number, to: number) =>
    prisma.paymentDues.findMany({
        where: {
            name,
            type: 'final pay',
            dueDate: {
                gte: from,
                lte: to
            }
        },
        include: {
            overallTrip: {
                select: {
                    loadingPointToStockPointTrip: {
                        include: {
                            truck: { include: { transporter: { select: { csmName: true } } } }
                        }
                    },
                    loadingPointToUnloadingPointTrip: {
                        include: {
                            truck: { include: { transporter: { select: { csmName: true } } } }
                        }
                    }
                }
            }
        }
    })
export const getUpcomingDuesByDefault = () =>
    prisma.paymentDues.findMany({
        where: {
            type: 'final pay'
        },
        include: {
            overallTrip: {
                select: {
                    loadingPointToStockPointTrip: {
                        include: {
                            truck: { include: { transporter: { select: { csmName: true } } } }
                        }
                    },
                    loadingPointToUnloadingPointTrip: {
                        include: {
                            truck: { include: { transporter: { select: { csmName: true } } } }
                        }
                    }
                }
            }
        }
    })
export const getCompletedDues = (name: string, from: number, to: number, page: number) => {
    const whereCondition: any = {
        status: true,
        AND: []
    }
    if (name !== 'null' && from !== 0 && to !== 0) {
        whereCondition.AND.push({
            name,
            paidAt: {
                gte: from,
                lte: to
            }
        })
    } else if (name !== 'null') {
        whereCondition.AND.push({ name })
    } else if (from !== 0 && to !== 0) {
        whereCondition.AND.push({
            paidAt: {
                gte: from,
                lte: to
            }
        })
    }
    return prisma.paymentDues.findMany({
        where: whereCondition,
        select: {
            name: true,
            paidAt: true,
            transactionId: true,
            type: true,
            payableAmount: true,
            overallTrip: {
                select: {
                    loadingPointToStockPointTrip: {
                        select: {
                            truck: { select: { transporter: { select: { csmName: true } } } }
                        }
                    },
                    loadingPointToUnloadingPointTrip: {
                        select: {
                            truck: { select: { transporter: { select: { csmName: true } } } }
                        }
                    }
                }
            }
        },
        skip: (page - 1) * 10,
        take: 10
    })
}
