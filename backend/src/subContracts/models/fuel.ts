import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (data: Prisma.fuelCreateInput | Prisma.fuelUncheckedCreateInput) =>
    prisma.fuel.create({ data })

export const getAllFuel = () => prisma.fuel.findMany({})

export const getFuelWithoutTrip = (vehicleNumber: any) =>
    prisma.fuel.findFirst({
        where: {
            vehicleNumber,
            loadingPointToUnloadingPointTripId: null
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

export const updateFuelWithTripId = (data: any) =>
    prisma.fuel.update({
        where: {
            id: data.id
        },
        data: {
            loadingPointToUnloadingPointTripId: data.tripId
        }
    })
