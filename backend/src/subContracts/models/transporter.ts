import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (
    data: Prisma.transporterCreateInput | Prisma.transporterUncheckedCreateInput
) => prisma.transporter.create({ data })

export const getAllTransporter = () => prisma.transporter.findMany({})

export const getPercentageByTransporter = (name: string) =>
    prisma.transporter.findUnique({
        where: {
            name,
            OR: [
                {
                    hasTds: true
                },
                {
                    hasGst: true
                }
            ]
        },
        select: {
            tdsPercentage: true,
            gstPercentage: true
        }
    })

export const getTransporterAccountByName = (transporterNames: string[]) =>
    prisma.transporter.findMany({
        where: {
            name: {
                in: transporterNames
            }
        },
        select: {
            name: true,
            accountNumber: true,
            ifsc: true,
            address: true,
            accountTypeNumber: true
        }
    })
