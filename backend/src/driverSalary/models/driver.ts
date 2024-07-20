import { Prisma, PrismaClient } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'
import prisma from '../../../prisma/index.ts'

export const create = (
    data: Prisma.driverCreateInput | Prisma.driverUncheckedCreateInput,
    prisma:
        | Omit<
              PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
              '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
          >
        | undefined
) => prisma?.driver.create({ data })

export const getAllDriver = () =>
    prisma().driver.findMany({
        select: {
            id: true,
            name: true,
            mobileNumber: true
        }
    })
