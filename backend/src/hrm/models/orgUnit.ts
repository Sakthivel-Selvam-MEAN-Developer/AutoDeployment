import prisma from './index.ts'

export const create = (data: any) => prisma.orgUnits.create({ data })
