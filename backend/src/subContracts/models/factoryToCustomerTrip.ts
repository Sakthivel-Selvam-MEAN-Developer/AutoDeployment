import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (data: Prisma.factoryToCustomerTripCreateInput) =>
    prisma.factoryToCustomerTrip.create({ data })

export const getAllTrip = () => prisma.factoryToCustomerTrip.findMany({})
