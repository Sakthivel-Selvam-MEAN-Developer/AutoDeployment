import prisma from './index.ts'

export const getTraccarByVehicleNumber = (vehicleNumber: string) =>
    prisma.traccarDevice.findFirst({
        where: {
            vehicle: { is: { number: vehicleNumber } }
        },
        include: {
            vehicle: true
        }
    })

export const create = (data: any) => prisma.traccarDevice.create({ data })
