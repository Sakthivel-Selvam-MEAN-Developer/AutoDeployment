import { Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import prisma from '../../../prisma/index.ts'

export const create = async (
    data: Prisma.driverTripCreateInput | Prisma.driverTripUncheckedCreateInput
) => prisma.driverTrip.create({ data })

export const getAllDriverTripById = (id: number, date: string | undefined) =>
    prisma.driverTrip.findMany({
        where: {
            driverId: id,
            tripStartDate: {
                gte:
                    date !== undefined
                        ? dayjs.unix(parseInt(date)).startOf('month').unix()
                        : undefined,
                lte:
                    date !== undefined
                        ? dayjs.unix(parseInt(date)).endOf('month').unix()
                        : undefined
            }
        },
        select: {
            id: true,
            tripStartDate: true,
            driver: {
                select: {
                    name: true,
                    driverAttendance: { select: { attendance: true } }
                }
            },
            tripId: true,
            unloadingTripSalaryId: true,
            stockTripSalaryId: true,
            driverAdvanceForTrip: {
                select: {
                    amount: true,
                    advanceDate: true
                }
            },
            primaryTripBetta: true,
            secondaryTripBetta: true,
            dailyBetta: true
        }
    })

export const getDriverIdByTripId = (id: number) =>
    prisma.driverTrip.findFirst({
        where: { tripId: id },
        select: { id: true, driverId: true }
    })

export const updateDriverTripWithTripSalaryId = (id: number, tripBetta: number, stockId: number) =>
    prisma.driverTrip.update({
        where: { id },
        data: { secondaryTripBetta: tripBetta, stockTripSalaryId: stockId }
    })

export const getDriverTripByOverallId = (id: number) =>
    prisma.driverTrip.findMany({
        where: { tripId: id },
        select: {
            id: true,
            driverId: true,
            stockTripSalaryId: true,
            unloadingTripSalaryId: true,
            tripId: true
        }
    })

export const getDriverAdvance = async (id: number) =>
    prisma.driverTrip.findMany({
        where: {
            tripId: id
        },
        select: {
            driver: {
                select: {
                    name: true
                }
            },
            driverAdvanceForTrip: {
                select: {
                    amount: true
                }
            }
        }
    })
export const getExpensesByTripIds = async (id: number) =>
    prisma.expenses.findMany({
        where: { tripId: id },
        select: {
            tripId: true,
            acceptedAmount: true
        }
    })
