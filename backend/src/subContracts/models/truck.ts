import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (data: Prisma.truckCreateInput | Prisma.truckUncheckedCreateInput) =>
    prisma.truck.create({ data })

export const getAllTruck = () => prisma.truck.findMany({})

export const getTruckByTransporter = (transporterName: string) =>
    prisma.truck.findMany({
        where: {
            transporter: {
                name: transporterName
            },
            NOT: {
                loadingPointToUnloadingPointTrip: {
                    some: {
                        tripStatus: false
                    }
                }
            }
        }
    })

export const getNumberByTruckId = (id: number) =>
    prisma.truck.findFirst({
        where: {
            id
        },
        select: {
            vehicleNumber: true,
            transporter: {
                select: {
                    name: true
                }
            }
        }
    })
