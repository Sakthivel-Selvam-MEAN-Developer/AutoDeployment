import { Request, Response } from 'express'
import ReactDOMServer from 'react-dom/server'
import {
    updateBillNumber as updateLoadingToUnloading,
    getInvoiceDetails as loadingToUnlaodingInvoice,
    getDirectTripsByinvoiceFilter,
    updateDirectTripBillingRate
} from '../models/loadingToUnloadingTrip.ts'
import {
    updateBillNumber as updateLoadingToStock,
    getInvoiceDetails as loadingToStockInvoice,
    getStockTripsByinvoiceFilter,
    updateStockTripBillingRate
} from '../models/loadingToStockPointTrip.ts'
import {
    updateBillNumber as updateStockToUnloading,
    getInvoiceDetails as stockToUnlaodingInvoice,
    getUnloadingTripsByinvoiceFilter,
    updateUnloadingTripBillingRate
} from '../models/stockPointToUnloadingPoint.ts'
import { getContentBasedOnCompany } from '../InvoiceFormat/calculateTotal.tsx'
import { InvoiceProp } from '../InvoiceFormat/type.tsx'
import prisma from '../../../prisma/index.ts'
import { create } from '../models/viewInvoice.ts'

export interface filterDataProps {
    startDate: number
    endDate: number
    company: string
}
const getTripByType = async (type: string, filterData: filterDataProps) => {
    if (type === 'LoadingToUnloading') return getDirectTripsByinvoiceFilter(filterData)
    if (type === 'LoadingToStock') return getStockTripsByinvoiceFilter(filterData)
    if (type === 'StockToUnloading') return getUnloadingTripsByinvoiceFilter(filterData)
}
interface RequestQuery {
    pageName: string
    startDate: string
    endDate: string
    cementCompany: { name: string; id: number }
}
type listTripDetailsByCompanyNameProps = (
    req: Request<object, object, object, RequestQuery>,
    res: Response
) => void
export const listTripDetailsByCompanyName: listTripDetailsByCompanyNameProps = async (req, res) => {
    const filterData = {
        startDate: parseInt(req.query.startDate),
        endDate: parseInt(req.query.endDate),
        company: req.query.cementCompany.name
    }
    await getTripByType(req.query.pageName, filterData)
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}

export const updateInvoiceDetails = async (req: Request, res: Response) => {
    await prisma
        .$transaction(async (prismaT) => {
            const invoice = await create({
                amount: req.body.totalAmount,
                billDate: req.body.bill.date,
                billNo: req.body.bill.billNo,
                cementCompanyId: req.body.cementCompany.id,
                GSTAmount: parseInt((req.body.totalAmount * (12 / 100)).toFixed(2)),
                pdfLink: 'https://www.s3.pdf/sample',
                TDSAmount: parseInt((req.body.totalAmount * (2 / 100)).toFixed(2))
            })
            switch (req.body.trip.tripName) {
                case 'LoadingToUnloading':
                    await updateLoadingToUnloading(
                        prismaT,
                        req.body.trip.tripId,
                        req.body.bill.billNo,
                        invoice.id
                    ).then(() => res.sendStatus(200))
                    break
                case 'StockToUnloading':
                    await updateStockToUnloading(
                        prismaT,
                        req.body.trip.tripId,
                        req.body.bill.billNo,
                        invoice.id
                    ).then(() => res.sendStatus(200))
                    break
                case 'LoadingToStock':
                    await updateLoadingToStock(
                        prismaT,
                        req.body.trip.tripId,
                        req.body.bill.billNo,
                        invoice.id
                    ).then(() => res.sendStatus(200))
                    break
                default:
                    res.sendStatus(500)
                    break
            }
        })
        .catch((err) => res.status(500).json(err))
    // await uploadToS3(combinedPdfBuffer, req.body.cementCompany.name, req.body.bill.billNo)
}

export const previewPDFController = async (req: Request, res: Response) => {
    const { tripName } = req.body.trip
    const { tripId } = req.body.trip
    let loadingPointToUnloadingPointTrip: InvoiceProp['trips']['loadingPointToUnloadingPointTrip'] =
        []
    let loadingPointToStockPointTrip: InvoiceProp['trips']['loadingPointToStockPointTrip'] = []
    let stockPointToUnloadingPointTrip: InvoiceProp['trips']['stockPointToUnloadingPointTrip'] = []
    if (tripName === 'LoadingToUnloading') {
        loadingPointToUnloadingPointTrip = await loadingToUnlaodingInvoice(tripId)
    }
    if (tripName === 'StockToUnloading') {
        // @ts-expect-error type
        stockPointToUnloadingPointTrip = await stockToUnlaodingInvoice(tripId)
    }
    if (tripName === 'LoadingToStock') {
        loadingPointToStockPointTrip = await loadingToStockInvoice(tripId)
    }
    const componentDetails = getContentBasedOnCompany(
        req.body.cementCompany.name,
        {
            trips: {
                loadingPointToUnloadingPointTrip,
                loadingPointToStockPointTrip,
                stockPointToUnloadingPointTrip
            }
        },
        req.body.bill,
        req.body.depot
    )
    res.status(200).json({
        componentHtml: ReactDOMServer.renderToString(componentDetails?.component),
        totalAmount: componentDetails?.totalAmount
    })
}
interface updateQuery {
    pageName: string
    id: string
    billingRate: string
}
const getTripType = async (updateDetails: updateQuery) => {
    const { id, billingRate, pageName } = updateDetails
    if (pageName === 'LoadingToUnloading') return updateDirectTripBillingRate(id, billingRate)
    if (pageName === 'LoadingToStock') return updateStockTripBillingRate(id, billingRate)
    if (pageName === 'StockToUnloading') return updateUnloadingTripBillingRate(id, billingRate)
}
export const updateBillingRate = async (req: Request, res: Response) =>
    getTripType(req.body)
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(500))

// const makePDFBuffer = async (componentHtmlString: string) => {
// console.log(componentHtmlString)
// const pup = puppeteer.createBrowserFetcher()
// const dom = new JSDOM(`<!DOCTYPE html><html><body>${componentHtmlString}</body></html>`)
// const invoiceHtml = dom.window.document.querySelector('#invoice')?.outerHTML
// const annexureHtml = dom.window.document.querySelector('#annexure')?.outerHTML
// const jspdf = new jsPDF('p', 'mm', [1200, 1300])
// jspdf.fromHtml(componentHtmlString)
// const combinedPdfBuffer = jspdf.output('arraybuffer')
// if (!invoiceHtml) logger.error('Required HTML sections not found')
// const browser = await puppeteer.launch({ headless: true })
// const invoicePdfBuffer = await generateBufferFromHtml(browser, invoiceHtml, 1200, 1300)
// const annexurePdfBuffer = await generateBufferFromHtml(browser, annexureHtml, 1200, 1300)
// await browser.close()
// const pdfDoc = await PDFDocument.create()
// const [invoicePdf, annexurePdf] = await Promise.all([
//     PDFDocument.load(invoicePdfBuffer),
//     PDFDocument.load(annexurePdfBuffer)
// ])
// const [invoicePage] = await pdfDoc.copyPages(invoicePdf, [0])
// const [annexurePage] = await pdfDoc.copyPages(annexurePdf, [0])
// pdfDoc.addPage(invoicePage)
// pdfDoc.addPage(annexurePage)
// const combinedPdfBuffer = await pdfDoc.save()
// return Buffer.from(combinedPdfBuffer)
// }
