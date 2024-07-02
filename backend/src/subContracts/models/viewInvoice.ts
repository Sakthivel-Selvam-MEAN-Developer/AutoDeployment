import { Prisma } from '@prisma/client'
import prisma from '../../../prisma'

export const create = (
    data: Prisma.companyInvoiceCreateInput | Prisma.companyInvoiceUncheckedCreateInput
) => prisma.companyInvoice.create({ data })

export const getCompanyInvoice = () =>
    prisma.companyInvoice.findMany({
        select: {
            billNo: true,
            billDate: true,
            amount: true,
            pdfLink: true,
            cementCompany: {
                select: {
                    name: true
                }
            }
        }
    })
