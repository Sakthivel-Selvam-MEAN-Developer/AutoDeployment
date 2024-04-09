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

export const getBunkAccountByName = (bunkName: string[]) =>
    prisma.bunk.findMany({
        where: {
            bunkName: {
                in: bunkName
            }
        },
        select: {
            bunkName: true,
            accountNumber: true,
            ifsc: true,
            accountTypeNumber: true,
            branchName: true,
            accountHolder: true
        }
    })
