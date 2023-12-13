import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (
    data: Prisma.factoryToCustomerTripCreateInput | Prisma.factoryToCustomerTripUncheckedCreateInput
) => prisma.factoryToCustomerTrip.create({ data })

export const updateTransporterBalance = ({
    tripId,
    remaining
}: {
    tripId: number
    remaining: number
}) =>
    prisma.factoryToCustomerTrip.update({
        where: {
            id: tripId
        },
        data: {
            transporterBalance: remaining
        }
    })

export const getAllTrip = () =>
    prisma.factoryToCustomerTrip.findMany({
        include: {
            factory: {
                select: {
                    name: true
                }
            },
            deliveryPoint: {
                select: {
                    name: true
                }
            },
            truck: {
                select: {
                    vehicleNumber: true,
                    transporter: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    })

export const getTripByVehicleNumber = (trucknumber: string) =>
    prisma.factoryToCustomerTrip.findFirst({
        where: {
            truck: {
                vehicleNumber: trucknumber
            }
        },
        select: {
            id: true,
            totalTransporterAmount: true,
            truck: {
                select: {
                    transporter: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    })
