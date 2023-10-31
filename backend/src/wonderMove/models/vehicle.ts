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

export const createMany = (data: any) => prisma.vehicles.createMany({data})
