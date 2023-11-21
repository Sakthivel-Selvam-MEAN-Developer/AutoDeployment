import prisma from '../../../prisma/index.ts'

export const create = (data: any) => prisma.employees.create({ data })

export const getEmployeeOrgId = (employeeId: string) =>
    prisma.employees.findUnique({
        where: {
            employeeId
        },
        select: {
            orgUnitId: true
        }
    })
