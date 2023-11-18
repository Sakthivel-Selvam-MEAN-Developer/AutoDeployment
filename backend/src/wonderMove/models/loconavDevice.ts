import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const getLoconavByVehicleNumber = async (vehicleNumber: string) =>
    prisma.loconavDevice.findFirstOrThrow({
        where: {
            vehicle: { is: { number: vehicleNumber } }
        },
        include: {
            vehicle: true
        }
    })

export type loconavDeviceByVehicleNumber = Prisma.PromiseReturnType<
    typeof getLoconavByVehicleNumber
>

export const create = (data: any) => prisma.loconavDevice.create({ data })

const createIfNotExist = (data: any) =>
    prisma.loconavDevice.upsert({
        where: {
            loconavDeviceId: data.loconavDeviceId
        },
        create: {
            ...data
        },
        update: {}
    })

export const createManyIfNotExist = (data: Prisma.loconavDeviceCreateManyInput[]) =>
    Promise.all(data.map(createIfNotExist))
