import prisma from './index.ts'

export const create = (data: any) => prisma.leaves.create({ data })

export const leavesAfterApply = () =>
    prisma.leaves.findMany({
        where: {
            active: true,
            approval: null
        }
    })

export const getAllLeave = () =>
    prisma.leaves.findMany({
        where: {
            active: true
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
