import { Prisma } from '@prisma/client'
import prisma from './index'

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

export const createMany = async (data: Prisma.vehiclesCreateManyInput[]) => prisma.vehicles.createMany({data})
