import prisma from './index.ts'

export const create = (data: any) => prisma.employees.create({ data })

export const getEmployeeOrgId = async (employeeId: any) => {
    const orgId = await prisma.employees.findUnique({
        where: {
            employeeId
        },
        select: {
            orgUnitId: true
        }
    })
    return orgId
}
