import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (data: Prisma.fuelCreateInput | Prisma.fuelUncheckedCreateInput) =>
    prisma.fuel.create({ data })

export const getAllFuel = () => prisma.fuel.findMany({})

export const getFuelWithoutTrip = (vehicleNumber: string) =>
    prisma.fuel.findFirst({
        where: {
            vehicleNumber,
            overallTripId: null
        },
        include: {
            fuelStation: {
                select: {
                    bunk: {
                        select: {
                            bunkName: true
                        }
                    }
                }
            }
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
