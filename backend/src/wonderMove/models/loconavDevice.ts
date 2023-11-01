import prisma from './index'
import { Prisma } from '@prisma/client'

export type loconavDeviceByVehicleNumber = Prisma.PromiseReturnType<
    typeof getLoconavByVehicleNumber
>
export const getLoconavByVehicleNumber = async (vehicleNumber: string) =>
    prisma.loconavDevice.findFirstOrThrow({
        where: {
            vehicle: { is: { number: vehicleNumber } }
        },
        include: {
            vehicle: true
        }
    })

export const create = (data: any) => prisma.loconavDevice.create({ data })


export const createMany = (data: Prisma.loconavDeviceCreateManyInput[]) => prisma.loconavDevice.createMany({data})
