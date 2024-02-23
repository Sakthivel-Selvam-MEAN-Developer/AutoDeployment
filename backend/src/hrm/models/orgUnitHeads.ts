import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (
    data: Prisma.orgUnitHeadsCreateInput | Prisma.orgUnitHeadsUncheckedCreateInput
) => prisma.orgUnitHeads.create({ data })

export const isEmployeeInOrgUnitHeads = (employeeId: string) =>
    prisma.orgUnitHeads.findFirst({
        where: {
            orgHead: {
                employeeId
            }
        }
    })

export const orgHeadOfEmployees = (orgUnitId: number) =>
    prisma.orgUnitHeads.findFirst({
        where: {
            orgUnitId
        }
    })
