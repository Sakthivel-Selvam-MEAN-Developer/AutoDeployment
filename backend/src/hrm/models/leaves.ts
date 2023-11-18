import prisma from '../../../prisma/index.ts'

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

export const rejectedLeaves = async (id: any, employeeId: any, comment: string) => {
    await prisma.leaves.update({
        where: {
            id,
            employeesId: employeeId
        },
        data: {
            approval: false,
            deniedComment: comment
        }
    })
}

export const approvedLeaves = async (id: any, employeeId: any) => {
    await prisma.leaves.update({
        where: {
            id,
            employeesId: employeeId
        },
        data: {
            approval: true
        }
    })
}

// export const
