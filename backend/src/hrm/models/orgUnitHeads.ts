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

// export const orgHeadOfEmployees = async (orgUnitId: any) => {
//     const orgHead = await prisma.orgUnitHeads.findMany({
//         where: {
//             orgUnitsId: orgUnitId
//         }
//     })
//     return orgHead
// }
