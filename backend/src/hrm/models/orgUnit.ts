import prisma from '../../../prisma/index.ts'

export const create = (data: any) => prisma.orgUnits.create({ data })

export const listOfOrg = () => prisma.orgUnits.findMany()
