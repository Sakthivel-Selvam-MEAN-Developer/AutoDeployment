import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (data: Prisma.leavesCreateInput | Prisma.leavesUncheckedCreateInput) =>
    prisma().leaves.create({ data })

export const leavesPendingReview = (orgUnitId: number, employeeId: string) =>
    prisma().leaves.findMany({
        where: {
            active: true,
            approval: null,
            employee: { orgUnitId },
            NOT: { employeeId }
        },
        include: { leaveReason: true, employee: true }
    })

export const getAllLeave = (employeeId: string) =>
    prisma().leaves.findMany({
        where: { active: true, employee: { employeeId } },
        include: { leaveReason: true, employee: true }
    })

export const rejectedLeaves = async (id: number, employeeId: string, comment: string) => {
    await prisma().leaves.update({
        where: { id, employeeId },
        data: {
            approval: false,
            deniedComment: comment
        }
    })
}

export const approvedLeaves = async (id: number, employeeId: string) => {
    await prisma().leaves.update({
        where: { id, employeeId },
        data: { approval: true }
    })
}

export const getHeadLeave = (employeeId: number) =>
    prisma().leaves.findMany({
        where: { active: true, employee: { id: employeeId } },
        include: { leaveReason: true, employee: true }
    })
