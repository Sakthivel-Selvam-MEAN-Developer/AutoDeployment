import prisma from './index'

export const create = (data) => prisma.vehicles.create({ data })

export const fetchVehicleByNumber = (number) =>
    prisma.vehicles.findFirst({ where: { number } })

export const updateVehicleByNumber = (number, data) =>
    prisma.vehicles.updateMany({
        where: {
            number
        },
        data
    })

export const getAllVehicles = () => prisma.vehicles.findMany({ where: {} })
