import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (data: any) => prisma.vehicles.create({ data })

export const fetchVehicleByNumber = (number: string) =>
    prisma.vehicles.findFirst({ where: { number } })

export const updateVehicleByNumber = (number: string, data: any) =>
    prisma.vehicles.updateMany({
        where: {
            number
        },
        data
    })

export const getAllVehicles = () => prisma.vehicles.findMany()

const createIfNotExist = (data: any) =>
    prisma.vehicles.upsert({
        where: {
            number: data.number
        },
        create: {
            ...data
        },
        update: {}
    })

export const createManyIfNotExist = (data: Prisma.vehiclesCreateManyInput[]) =>
    Promise.all(data.map(createIfNotExist))
