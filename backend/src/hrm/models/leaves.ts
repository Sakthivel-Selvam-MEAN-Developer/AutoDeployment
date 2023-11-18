import prisma from '../../../prisma'

export const create = (data: any) => prisma.leaves.create({ data })

export const leavesBeforeApproval = () =>
    prisma.leaves.findMany({
        where: {
            active: true,
            approval: null
        },
        include: {
            leaveReason: true
        }
    })

export const getAllLeave = (employeeId: string) =>
    prisma.leaves.findMany({
        where: {
            active: true,
            employeesId: employeeId
        },
        include: {
            leaveReason: true,
            employees: true
        }
    })

export const rejectedLeaves = async (id: any, appliedBy: string, comment: string) => {
    await prisma.leaves.update({
        where: {
            id,
            appliedBy
        },
        data: {
            approval: false,
            deniedComment: comment
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
