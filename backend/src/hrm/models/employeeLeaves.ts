import prisma from './index.ts'

export const create = (data: any) => prisma.leaves.create({ data })

export const getAllEmployeeLeaveForm = () =>
    prisma.leaves.findMany({
        where: {
            active: true,
            approval: null
        }
    })

export const rejectedLeaves = async (id: any, appliedBy: string) => {
    await prisma.leaves.update({
        where: {
            id,
            appliedBy
        },
        data: {
            approval: false
        }
    })
}

export const approvedLeaves = async (id: any, appliedBy: string) => {
    await prisma.leaves.update({
        where: {
            id,
            appliedBy
        },
        data: {
            approval: true
        }
    })
}

export const getAllRejectedLeaves = (appliedBy: string) =>
    prisma.leaves.findMany({
        where: {
            active: true,
            approval: false,
            appliedBy
        }
    })

export const getAllApprovedLeaves = (appliedBy: string) =>
    prisma.leaves.findMany({
        where: {
            active: true,
            approval: true,
            appliedBy
        }
    })
