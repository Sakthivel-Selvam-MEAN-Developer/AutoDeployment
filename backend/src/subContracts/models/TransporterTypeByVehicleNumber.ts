import prisma from '../../../prisma/index.ts'
export const getTransporterTypeByVehicleNumber = (vehicleNumber: string) =>
    prisma.truck.findFirst({
        where: {
            vehicleNumber
        },
        select: {
            vehicleNumber: true,
            transporter: { select: { name: true, transporterType: true } }
        }
    })
