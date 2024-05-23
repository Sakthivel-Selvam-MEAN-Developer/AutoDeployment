import { Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import prisma from '../../../prisma/index.ts'
import { filterDataProps } from '../controller/invoice.ts'

export const create = (
    data:
        | Prisma.loadingPointToUnloadingPointTripCreateInput
        | Prisma.loadingPointToUnloadingPointTripUncheckedCreateInput
) => prisma.loadingPointToUnloadingPointTrip.create({ data })

export const getAllTrip = () =>
    prisma.loadingPointToUnloadingPointTrip.findMany({
        include: {
            loadingPoint: { select: { name: true } },
            unloadingPoint: { select: { name: true } },
            truck: {
                select: { vehicleNumber: true, transporter: { select: { name: true } } }
            }
        }
    })

export const getTripByVehicleNumber = (trucknumber: string) =>
    prisma.loadingPointToUnloadingPointTrip.findFirst({
        where: { truck: { vehicleNumber: trucknumber }, tripStatus: false, wantFuel: true },
        select: {
            id: true,
            totalTransporterAmount: true,
            truck: { select: { transporter: { select: { name: true } } } }
        }
    })

export const getOnlyActiveTripByVehicleNumber = (vehicleNumber: string) =>
    prisma.loadingPointToUnloadingPointTrip.findFirst({
        where: {
            tripStatus: false,
            truck: { vehicleNumber }
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
export const updateUnloadingKilometer = (id: number, unloadingKilometer: number) =>
    prisma.loadingPointToUnloadingPointTrip.update({
        where: {
            id
        },
        data: {
            unloadingKilometer
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
        include: {
            loadingPoint: { include: { cementCompany: true } },
            unloadingPoint: { include: { cementCompany: true } },
            truck: true
        }
    })
export const getInvoiceDetails = (id: number[]) =>
    prisma.loadingPointToUnloadingPointTrip.findMany({
        where: {
            id: {
                in: id
            },
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
export const getAllUnloadingPointInvoiceNumbers = () =>
    prisma.loadingPointToUnloadingPointTrip.findMany({
        select: {
            invoiceNumber: true
        }
    })
