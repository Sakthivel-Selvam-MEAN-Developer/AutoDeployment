import prisma from '../../../prisma'

export const create = (data: any) => prisma.orgUnits.create({ data })
