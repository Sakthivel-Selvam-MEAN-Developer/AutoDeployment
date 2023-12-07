import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (
    data: Prisma.factoryToCustomerTripCreateInput | Prisma.factoryToCustomerTripUncheckedCreateInput
) => prisma.factoryToCustomerTrip.create({ data })

export const getAllTrip = () =>
    prisma.factoryToCustomerTrip.findMany({
        include: {
            factory: {
                select: {
                    location: true
                }
            },
            deliveryPoint: {
                select: {
                    location: true
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
