import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'
import tollPlaza from '../seed/tollPlaza.ts'

export const create = (
    data: Prisma.tollPlazaCreateManyInput | Prisma.tollPlazaUncheckedCreateInput[]
) => prisma.tollPlaza.createMany({ data })
interface props {
    billNo: string
    billDate: number
}
interface data {
    amount: number
}
export interface tollPlaza {
    id: number
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
export const updateTollAmount = (ids: number[], data: data) =>
    prisma.tollPlaza.updateMany({
        where: {
            id: { in: ids }
        },
        data: {
            amount: data.amount
        }
    })
export const getTollPlaza = () => prisma.tollPlaza.findMany({})
// export const deleteRow = () =>
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
