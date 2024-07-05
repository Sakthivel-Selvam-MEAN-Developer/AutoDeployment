import { Prisma } from '@prisma/client'
import prisma from '../../../prisma'

export const create = (
    data: Prisma.companyInvoiceCreateInput | Prisma.companyInvoiceUncheckedCreateInput
) => prisma.companyInvoice.create({ data })

export const getCompanyInvoice = (filterData: {
    startDate: number
    endDate: number
    company: string
}) => {
    return prisma.companyInvoice.findMany({
        where: {
            cementCompany: {
                id: parseInt(filterData.company)
            },
            billDate: {
                lte: filterData.startDate === 0 ? undefined : filterData.startDate,
                gte: filterData.endDate === 0 ? undefined : filterData.endDate
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
}
