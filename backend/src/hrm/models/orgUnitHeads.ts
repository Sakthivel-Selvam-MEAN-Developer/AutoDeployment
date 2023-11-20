import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (data: Prisma.orgUnitHeadsCreateInput) => prisma.orgUnitHeads.create({ data })

export const isEmployeeInOrgUnitHeads = async (employeeId: any) => {
    const orgUnitHead = await prisma.orgUnitHeads.findFirst({
        where: {
            orgHead: {
                employeeId
            }
        }
    })
    return orgUnitHead
}

// export const orgHeadOfEmployees = async (orgUnitId: any) => {
//     const orgHead = await prisma.orgUnitHeads.findMany({
//         where: {
//             orgUnitsId: orgUnitId
//         }
//     })
//     return orgHead
// }
