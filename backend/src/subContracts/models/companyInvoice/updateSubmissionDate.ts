import prisma from '../../../../prisma'
import { billTypes } from './companyInvoiceType'

export const updateSubmitDate = async (billDetails: billTypes) =>
    prisma().companyInvoice.update({
        where: { id: billDetails.id, submissionDate: null },
        data: { submissionDate: billDetails.submitDate }
    })
