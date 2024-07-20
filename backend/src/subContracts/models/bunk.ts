import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (
    data: Prisma.bunkCreateInput | Prisma.bunkUncheckedCreateInput,
    id: number
) =>
    prisma().bunk.upsert({
        where: { id },
        update: data,
        create: data
    })

export const getAllBunk = () => prisma().bunk.findMany({})

export const getAllBunkName = () =>
    prisma().bunk.findMany({
        select: { bunkName: true }
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
    prisma().bunk.findMany({
        where: { bunkName: { in: bunkName } },
        select: bunkData
    })
