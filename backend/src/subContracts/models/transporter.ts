import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (
    data: Prisma.transporterCreateInput | Prisma.transporterUncheckedCreateInput
) => prisma.transporter.create({ data })

export const getAllTransporter = () => prisma.transporter.findMany({})
