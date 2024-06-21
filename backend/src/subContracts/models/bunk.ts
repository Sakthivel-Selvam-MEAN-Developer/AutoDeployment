import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (data: Prisma.bunkCreateInput) => prisma.bunk.create({ data })

export const getAllBunk = () => prisma.bunk.findMany({})

export const getAllBunkName = () =>
    prisma.bunk.findMany({
        select: {
            bunkName: true
        }
    })
const bunkData = {
    bunkName: true,
    accountNumber: true,
    ifsc: true,
    accountTypeNumber: true,
    branchName: true,
    accountHolder: true
}
export const getBunkAccountByName = (bunkName: string[]) =>
    prisma.bunk.findMany({
        where: { bunkName: { in: bunkName } },
        select: bunkData
    })
export const getBunkNameById = (id: number) =>
    prisma.bunk.findMany({
        where: { id: id },
        select: {
            bunkName: true
        }
    })
