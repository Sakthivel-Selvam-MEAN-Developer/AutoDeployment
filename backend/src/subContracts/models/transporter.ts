import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (
    data: Prisma.transporterCreateInput | Prisma.transporterUncheckedCreateInput
) => prisma.transporter.create({ data })

export const getAllTransporter = () => prisma.transporter.findMany({})

export const getAllTransporterName = () =>
    prisma.transporter.findMany({
        select: {
            name: true
        }
    })

export const getPercentageByTransporter = (name: string) =>
    prisma.transporter.findUnique({
        where: { name, OR: [{ hasTds: true }, { hasGst: true }] },
        select: { tdsPercentage: true, gstPercentage: true }
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
// export const getTransporterByTruckNumber = (truckNumber: string) =>
//     prisma.transporter.findFirst({
//         where: { truck: { number: truckNumber }, transporterType: 'Own' },
//         select: {
//             id: true,
//             name: true,
//             transporterType: true
//         }
//     });
