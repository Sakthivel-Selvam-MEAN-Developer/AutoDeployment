import { Prisma } from '@prisma/client'
import prisma from '../../../prisma'

export const create = (
    data: Prisma.companyInvoiceCreateInput | Prisma.companyInvoiceUncheckedCreateInput
) => prisma.companyInvoice.create({ data })

export const getCompanyInvoice = (filterData: any = {}) =>
    prisma.companyInvoice.findMany({
        where: {
            cementCompany: {
                name: filterData.cementCompany.name,
                id: filterData.cementCompany.id
            },
            billDate: {
                gte: filterData.startDate,
                lte: filterData.endDate
            }
        },
        select: {
            billNo: true,
            billDate: true,
            amount: true,
            pdfLink: true,
            cementCompany: {
                select: {
                    name: true,
                    id: true
                }
            }
        }
    })
