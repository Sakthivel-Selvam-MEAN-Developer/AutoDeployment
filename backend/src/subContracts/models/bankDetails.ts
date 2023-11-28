import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (data: Prisma.bankDetailsCreateInput) => prisma.bankDetails.create({ data })

export const getBankDetailsByTransporter = (transporterId: number) =>
    prisma.bankDetails.findFirst({
        where: {
            transporter: {
                some: {
                    id: transporterId
                }
            }
        }
    })
