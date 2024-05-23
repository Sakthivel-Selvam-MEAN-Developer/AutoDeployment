import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'
import { JsonArray } from '@prisma/client/runtime/library'

export const create = (data: Prisma.driverAttendanceCreateInput) =>
    prisma.driverAttendance.create({ data })

export const getDriverAttendanceDetails = (id: number) =>
    prisma.driverAttendance.findFirst({
        where: { driverId: id },
        select: {
            id: true,
            driverId: true,
            attendance: true
        }
    })

export const getAllDriverAttendanceDetails = (id: number[]) =>
    prisma.driverAttendance.findMany({
        where: { driverId: { in: id } },
        select: {
            id: true,
            driverId: true,
            attendance: true
        }
    })

export const upsertDriverAttendanceDetails = (
    id: number | undefined,
    driverId: number,
    data: JsonArray[]
) =>
    prisma.driverAttendance.upsert({
        where: { id },
        update: { attendance: data },
        create: {
            driverId: driverId,
            attendance: data
        }
    })

export const updateDriverAttendanceDetails = (id: number | undefined, data: JsonArray[]) =>
    prisma.driverAttendance.update({
        where: { id },
        data: { attendance: data }
    })
