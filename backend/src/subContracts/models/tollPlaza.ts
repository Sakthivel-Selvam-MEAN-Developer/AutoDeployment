import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (
    data: Prisma.tollPlazaCreateManyInput | Prisma.tollPlazaUncheckedCreateInput[]
) => prisma.tollPlaza.createMany({ data })
interface props {
    billNo: string
    billDate: number
}
export const updateBillStatus = (overallTripId: number[], data: props) =>
    prisma.tollPlaza.updateMany({
        where: {
            overallTripId: { in: overallTripId }
        },
        data: {
            billNo: data.billNo,
            billDate: data.billDate,
            billedStatus: true
        }
    })

export const getTollPlaza = () => prisma.tollPlaza.findMany({})

export const getTollLocations = () =>
    prisma.tollPlazaLocation.findMany({
        select: {
            id: true,
            location: true
        }
    })
export const createTollPlazaLocations = (
    data: Prisma.tollPlazaLocationCreateInput | Prisma.tollPlazaLocationUncheckedCreateInput
) => prisma.tollPlazaLocation.create({ data })
