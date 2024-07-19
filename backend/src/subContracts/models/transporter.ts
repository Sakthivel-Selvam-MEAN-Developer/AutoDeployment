import prisma from '../../../prisma/index.ts'
import { Prisma } from '@prisma/client'
export const create = (
    data: Prisma.transporterCreateInput | Prisma.transporterUncheckedCreateInput,
    id: number | undefined
) => {
    return prisma.transporter.upsert({
        where: { id: id },
        update: data,
        create: data
    })
}
export const getAllTransporter = () =>
    prisma.transporter.findMany({
        include: {
            employee: {
                select: {
                    name: true
                }
            }
        }
    })
export const getAllTransporterName = () =>
    prisma.transporter.findMany({
        select: {
            id: true,
            name: true,
            employee: { select: { name: true } }
        }
    })
export const getPercentageByTransporter = (name: string) =>
    prisma.transporter.findUnique({
        where: { name, OR: [{ hasTds: true }, { hasGst: true }] },
        select: { gstPercentage: true, tdsPercentage: true }
    })
export const getTransporterAccountByName = (transporterNames: string[]) =>
    prisma.transporter.findMany({
        where: { name: { in: transporterNames } },
        select: {
            name: true,
            accountNumber: true,
            ifsc: true,
            accountTypeNumber: true,
            branchName: true,
            accountHolder: true
        }
    })
