import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (data: Prisma.billNoCreateInput | Prisma.billNoUncheckedCreateInput) =>
    prisma.billNo.create({ data })

export const getBillNumber = () =>
    prisma.billNo.findUnique({
        where: { id: 1 },
        select: {
            lastBillNo: true
        }
    })

export const updateBillNumber = (billNo: string) =>
    prisma.billNo.update({
        where: { id: 1 },
        data: {
            lastBillNo: billNo
        }
    })
