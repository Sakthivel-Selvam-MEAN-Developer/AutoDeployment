import prisma from '../../../prisma'

interface companyAdvisory {
    bankReferenceNumber: string
    paymentDocumentNumber: string
    paymentReceivedDate: number
}

export const create = (data: companyAdvisory) => prisma.companyAdvisory.create({ data })
