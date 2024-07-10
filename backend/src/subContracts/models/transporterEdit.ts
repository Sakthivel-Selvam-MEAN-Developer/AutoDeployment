import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (data: Prisma.transporterCreateInput, id: number | undefined) => {
    return prisma.transporter.upsert({
        where: {
            id
        },
        update: {
            name: data.name,
            csmName: data.csmName,
            emailId: data.emailId,
            contactPersonName: data.contactPersonName,
            contactPersonNumber: data.contactPersonNumber,
            address: data.address,
            hasGst: data.hasGst,
            gstNumber: data.gstNumber,
            gstPercentage: data.gstPercentage,
            hasTds: data.hasTds,
            transporterType: data.transporterType,
            tdsPercentage: data.tdsPercentage,
            accountHolder: data.accountHolder,
            accountNumber: data.accountNumber,
            branchName: data.branchName,
            ifsc: data.ifsc,
            accountTypeNumber: data.accountTypeNumber
        },
        create: {
            name: data.name,
            csmName: data.csmName,
            emailId: data.emailId,
            contactPersonName: data.contactPersonName,
            contactPersonNumber: data.contactPersonNumber,
            address: data.address,
            hasGst: data.hasGst,
            gstNumber: data.gstNumber,
            gstPercentage: data.gstPercentage,
            hasTds: data.hasTds,
            transporterType: data.transporterType,
            tdsPercentage: data.tdsPercentage,
            accountHolder: data.accountHolder,
            accountNumber: data.accountNumber,
            branchName: data.branchName,
            ifsc: data.ifsc,
            accountTypeNumber: data.accountTypeNumber
        }
    })
}
