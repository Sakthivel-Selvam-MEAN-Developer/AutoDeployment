import prisma from './index'

export const getLoconavByVehicleNumber = (vehicleNumber: string) =>
    prisma.loconavDevice.findFirst({
        where: {
            vehicle: { is: { number: vehicleNumber } }
        },
        include: {
            vehicle: true
        }
    })

export const create = (data: any) => prisma.traccarDevice.create({ data })
