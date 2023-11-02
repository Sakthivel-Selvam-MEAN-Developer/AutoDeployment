import prisma from './index'
import { Prisma } from '@prisma/client'

export const create = (data: any) => prisma.ktTelematicsDevice.create({ data })

const createIfNotExist = (data: any) => {
    return prisma.ktTelematicsDevice.upsert({
        where: {
            ktTelematicsDeviceId: data.ktTelematicsDeviceId
        },
        create: {
            ...data
        },
        update: {}
    })
}

export const createManyIfNotExist = (data: Prisma.ktTelematicsDeviceCreateManyInput[]) =>
    Promise.all(data.map(createIfNotExist))

export const getKtTelematicsByVehicleNumber = async (vehicleNumber: string) =>
    prisma.ktTelematicsDevice.findFirstOrThrow({
        where: {
            vehicle: { is: { number: vehicleNumber } }
        },
        include: {
            vehicle: true
        }
    })