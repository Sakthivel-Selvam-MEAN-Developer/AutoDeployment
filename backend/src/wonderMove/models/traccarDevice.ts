import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const getTraccarByVehicleNumber = (vehicleNumber: string) =>
    prisma().traccarDevice.findFirst({
        where: {
            vehicle: { is: { number: vehicleNumber } }
        },
        include: {
            vehicle: true
        }
    })

export const create = (
    data: Prisma.traccarDeviceCreateInput | Prisma.traccarDeviceUncheckedCreateInput
) => prisma().traccarDevice.create({ data })
