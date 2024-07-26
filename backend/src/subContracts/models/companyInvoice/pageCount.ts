import prisma from '../../../../prisma'
import { condition } from './companyInvoice'
import { filterdata } from './companyInvoiceType'

export const pageCountForAddAdvisory = async (filterData: filterdata) =>
    prisma().companyInvoice.count({ where: { ...condition(filterData), received: false } })
export const pageCountForGST = async (filterData: filterdata) =>
    prisma().companyInvoice.count({ where: { ...condition(filterData), gstReceived: false } })
export const pageCount = async (filterData: filterdata) =>
    prisma().companyInvoice.count({ where: { ...condition(filterData) } })
