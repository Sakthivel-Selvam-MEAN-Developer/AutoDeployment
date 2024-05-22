import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (data: Prisma.fuelCreateInput | Prisma.fuelUncheckedCreateInput) => {
    console.log(data)
    return prisma.fuel.create({ data })
}

export const getAllFuel = () => prisma.fuel.findMany({})

export const getFuelWithoutTrip = (vehicleNumber: string) =>
    prisma.fuel.findFirst({
        where: {
            vehicleNumber,
            overallTripId: null
        },
        include: {
            bunk: { select: { bunkName: true } }
        }
    })

interface dataProps {
    id: number
    overallTripId: number | null
}
export const updateFuelWithTripId = (data: dataProps) =>
    prisma.fuel.update({
        where: {
            id: data.id
        },
        data: {
            overallTripId: data.overallTripId
        }
    })

export const getFuelDetailsWithoutTrip = () =>
    prisma.fuel.findMany({
        where: {
            paymentStatus: false
        },
        include: {
            bunk: true
        }
    })

export const updateFuelStatus = (fuelId: number) =>
    prisma.fuel.update({
        where: {
            id: fuelId
        },
        data: {
            paymentStatus: true
        }
    })
