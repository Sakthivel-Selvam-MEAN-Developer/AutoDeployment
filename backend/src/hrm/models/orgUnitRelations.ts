import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (
    data: Prisma.orgUnitRelationsCreateInput | Prisma.orgUnitRelationsUncheckedCreateInput
) => prisma.orgUnitRelations.create({ data })

export const isEmployeeHeadOfParentOrg = (orgUnitId: any) =>
    prisma.orgUnitRelations.findMany({
        where: {
            parentOrgId: orgUnitId
        },
        select: {
            childOrgId: true
        }
    })
