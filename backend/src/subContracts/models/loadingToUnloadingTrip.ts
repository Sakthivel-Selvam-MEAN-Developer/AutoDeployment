import { Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import prisma from '../../../prisma/index.ts'
import { filterDataProps } from '../controller/invoice.ts'

export const create = (
    data:
        | Prisma.loadingPointToUnloadingPointTripCreateInput
        | Prisma.loadingPointToUnloadingPointTripUncheckedCreateInput
) =>
    prisma.loadingPointToUnloadingPointTrip.create({
        data,
        include: {
            overallTrip: {
                select: {
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

export const getAllTrip = () =>
    prisma.loadingPointToUnloadingPointTrip.findMany({
        include: {
            loadingPoint: { select: { name: true } },
            unloadingPoint: { select: { name: true } },
            overallTrip: {
                select: {
                    truck: {
                        select: { vehicleNumber: true, transporter: { select: { name: true } } }
                    }
                }
            }
        }
    })

export const getTripByVehicleNumber = (trucknumber: string) =>
    prisma.loadingPointToUnloadingPointTrip.findFirst({
        where: {
            overallTrip: {
                some: {
                    truck: { vehicleNumber: trucknumber }
                }
            },
            tripStatus: false,
            wantFuel: true
        },
        select: {
            id: true,
            totalTransporterAmount: true,
            overallTrip: {
                select: {
                    truck: { select: { transporter: { select: { name: true } } } }
                }
            }
        }
    })

export const getOnlyActiveTripByVehicleNumber = (vehicleNumber: string) =>
    prisma.loadingPointToUnloadingPointTrip.findFirst({
        where: {
            tripStatus: false,
            overallTrip: {
                some: {
                    truck: { vehicleNumber }
                }
            }
        },
        select: { id: true }
    })

export const updateUnloadWeightforTrip = (id: number) =>
    prisma.loadingPointToUnloadingPointTrip.update({
        where: {
            id
        },
        data: {
            tripStatus: true,
            acknowledgeDueTime: dayjs().add(5, 'seconds').unix()
        }
    })

export const updateBillNumber = (id: number[], billNo: string) =>
    prisma.loadingPointToUnloadingPointTrip.updateMany({
        where: {
            id: { in: id }
        },
        data: {
            billNo
        }
    })

export const getDirectTripsByinvoiceFilter = (filterData: filterDataProps) =>
    prisma.loadingPointToUnloadingPointTrip.findMany({
        where: {
            loadingPoint: { cementCompany: { name: filterData.company } },
            startDate: {
                lte: filterData.startDate === 0 ? undefined : filterData.startDate,
                gte: filterData.endDate === 0 ? undefined : filterData.endDate
            },
            billNo: null,
            tripStatus: true,
            overallTrip: { some: { acknowledgementStatus: true } }
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
                select: { truck: { select: { vehicleNumber: true } } }
            },
            loadingPoint: {
                select: {
                    name: true
                }
            },
            unloadingPoint: {
                select: {
                    name: true
                }
            }
        }
    })
export const getInvoiceDetails = (id: number[]) =>
    prisma.loadingPointToUnloadingPointTrip.findMany({
        where: {
            id: { in: id },
            tripStatus: true
        },
        select: {
            startDate: true,
            partyName: true,
            lrNumber: true,
            unloadingPoint: {
                select: {
                    name: true
                }
            },
            loadingPoint: {
                select: {
                    name: true,
                    cementCompany: {
                        select: {
                            primaryBill: {
                                select: { address: true, gstNumber: true, panNumber: true }
                            }
                        }
                    }
                }
            },
            overallTrip: {
                select: {
                    truck: {
                        select: {
                            vehicleNumber: true
                        }
                    },
                    shortageQuantity: {
                        select: {
                            shortageQuantity: true
                        }
                    }
                }
            },
            invoiceNumber: true,
            freightAmount: true,
            filledLoad: true
        }
    })
export const getAllUnloadingPointInvoiceNumbers = () =>
    prisma.loadingPointToUnloadingPointTrip.findMany({
        select: {
            invoiceNumber: true
        }
    })

export const getAllUnloadingPointUnbilledTrips = () =>
    prisma.loadingPointToUnloadingPointTrip.findMany({
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
            unloadingPoint: {
                select: {
                    name: true
                }
            }
        }
    })
export const updateFreightInDirectTrip = (id: number, details: any) =>
    prisma.loadingPointToUnloadingPointTrip.update({
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
export const updateDirectTripBillingRate = (id: string, billingRate: string) =>
    prisma.loadingPointToUnloadingPointTrip.update({
        where: {
            id: parseInt(id)
        },
        data: {
            billingRate: parseFloat(billingRate)
        }
    })
