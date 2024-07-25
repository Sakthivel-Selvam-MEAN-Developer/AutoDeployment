import { Prisma } from '@prisma/client'
import prisma from '../../../../prisma'
import { filterdata } from './companyInvoiceType'
import { companyInvoiceDetails } from './companyInvoiceDetails'
const condition = (filterData: filterdata) => {
    return {
        cementCompany: { id: parseInt(filterData.company) },
        billDate: {
            lte: filterData.startDate === 0 ? undefined : filterData.startDate,
            gte: filterData.endDate === 0 ? undefined : filterData.endDate
        }
    }
}
export const create = (
    data: Prisma.companyInvoiceCreateInput | Prisma.companyInvoiceUncheckedCreateInput
) => prisma().companyInvoice.create({ data })
export const getCompanyInvoice = (filterData: filterdata) => {
    const skip = (filterData.pageNumber - 1) * 50
    return prisma().companyInvoice.findMany({
        skip,
        take: 50,
        where: { ...condition(filterData) },
        select: companyInvoiceDetails
    })
}
export const getInvoiceToAddAdvisory = (filterData: filterdata) => {
    const skip = (filterData.pageNumber - 1) * 50
    return prisma().companyInvoice.findMany({
        skip,
        take: 50,
        where: { ...condition(filterData), received: false },
        select: companyInvoiceDetails
    })
}
export const pageCountForAddAdvisory = async (filterData: filterdata) =>
    prisma().companyInvoice.count({ where: { ...condition(filterData), received: false } })
export const pageCount = async (filterData: filterdata) =>
    prisma().companyInvoice.count({ where: { ...condition(filterData) } })
export const getCompanyInvoiceForSubmitDate = async () =>
    prisma().companyInvoice.findMany({
        where: { submissionDate: null },
        select: companyInvoiceDetails
    })
