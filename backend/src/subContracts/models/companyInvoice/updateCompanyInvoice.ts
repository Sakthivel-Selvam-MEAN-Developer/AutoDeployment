import prisma from '../../../../prisma'
import { billTypes } from './companyInvoiceType'

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
