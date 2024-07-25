import prisma from '../../../../prisma'
import { billTypes, invoice } from './companyInvoiceType'

export const updateSubmitDate = async (billDetails: billTypes) =>
    prisma().companyInvoice.update({
        where: { id: billDetails.id, submissionDate: null },
        data: { submissionDate: billDetails.submitDate },
        include: { cementCompany: { select: { paymentOffSetDays: true } } }
    })

export const updateDueDate = async (id: number, dueDate: number) =>
    prisma().companyInvoice.update({
        where: { id, dueDate: null },
        data: { dueDate }
    })
export const updateShortageDetailsModel = (details: invoice) =>
    prisma().companyInvoice.update({
        where: { billNo: details.billNo },
        data: { shortageAmount: details.shortageAmount }
    })
export const updateInvoiceReceived = (id: number) =>
    prisma().companyInvoice.update({
        where: { id, received: false },
        data: { received: true }
    })
