import prisma from './index'

export const getTraccarByVehicleNumber = (vehicleNumber) =>
    prisma.traccarDevice.findFirst({
        where: {
            vehicle: { is: { number: vehicleNumber } }
        },
        include: {
            vehicle: true
        }
    })

export const create = (data) => prisma.traccarDevice.create({ data })
