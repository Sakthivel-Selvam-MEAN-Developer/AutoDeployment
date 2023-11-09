import prisma from './index.ts'

export const create = (data: any) => prisma.leaves.create({ data })

export const getAllEmployeeLeaveForm = () =>
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
            active: false
        }
    })
}

export const getAllRejectedLeaves = (appliedBy: string) =>
    prisma.leaves.findMany({
        where: {
            active: false,
            appliedBy
        }
    })