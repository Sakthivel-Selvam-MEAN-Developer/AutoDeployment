import prisma from '../../../prisma/index.ts'

export const getInvoiceDetail = (id: number[]) =>
    prisma.overallTrip.findMany({
        where: {
            id: {
                in: id
            }
        },
        select: {
            loadingPointToUnloadingPointTrip: {
                select: {
                    startDate: true,
                    unloadingPoint: {
                        select: {
                            name: true
                        }
                    },
                    freightAmount: true,
                    truck: {
                        select: {
                            vehicleNumber: true
                        }
                    },
                    filledLoad: true
                }
            },
            stockPointToUnloadingPointTrip: {
                select: {
                    startDate: true,
                    unloadingPoint: {
                        select: {
                            name: true
                        }
                    },
                    freightAmount: true,
                    loadingPointToStockPointTrip: {
                        select: {
                            filledLoad: true,
                            truck: {
                                select: {
                                    vehicleNumber: true
                                }
                            }
                        }
                    }
                }
            },
            loadingPointToStockPointTrip: {
                select: {
                    startDate: true,
                    stockPoint: {
                        select: {
                            name: true
                        }
                    },
                    filledLoad: true,
                    freightAmount: true,
                    truck: {
                        select: {
                            vehicleNumber: true
                        }
                    }
                }
            }
        }
    })
