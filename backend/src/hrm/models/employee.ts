import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (data: Prisma.employeesCreateInput | Prisma.employeesUncheckedCreateInput) =>
    prisma.employees.create({ data })

export const getEmployeeOrgId = (employeeId: string) =>
    prisma.employees.findUnique({
        where: {
            employeeId
        },
        select: {
            orgUnitId: true
        }
    })

export const getEmployeeName = (employeeId: string) =>
    prisma.employees.findUnique({
        where: {
            employeeId
        },
        select: {
            name: true
        }
    })
