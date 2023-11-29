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
            }
        }
    })
