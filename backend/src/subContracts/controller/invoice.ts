import { Request, Response } from 'express'
import ReactDOMServer from 'react-dom/server'
import { JSDOM } from 'jsdom'
import puppeteer, { Browser } from 'puppeteer'
import { PDFDocument } from 'pdf-lib'
import {
    updateBillNumber as updateLoadingToUnloading,
    getInvoiceDetails as loadingToUnlaodingInvoice,
    getDirectTripsByinvoiceFilter
} from '../models/loadingToUnloadingTrip.ts'
import {
    updateBillNumber as updateLoadingToStock,
    getInvoiceDetails as loadingToStockInvoice,
    getStockTripsByinvoiceFilter
} from '../models/loadingToStockPointTrip.ts'
import {
    updateBillNumber as updateStockToUnloading,
    getInvoiceDetails as stockToUnlaodingInvoice,
    getUnloadingTripsByinvoiceFilter
} from '../models/stockPointToUnloadingPoint.ts'
import { getContentBasedOnCompany } from '../InvoiceFormat/calculateTotal.tsx'
import { InvoiceProp } from '../InvoiceFormat/type.tsx'
import { uploadToS3 } from './uploadToS3.ts'
import logger from '../../logger.ts'

interface tripDetailsProps {
    tripId: number
    tripName: string
}
type pdfBuffers = (
    browser: Browser,
    htmlContent: string | undefined,
    width: number,
    height: number
) => Promise<Buffer>
const generateBufferFromHtml: pdfBuffers = async (browser, htmlContent, width, height) => {
    const page = await browser.newPage()
    await page.setContent(htmlContent || '', { waitUntil: 'networkidle0' })
    const pdfBuffer = await page.pdf({
        width: `${width}px`,
        height: `${height}px`,
        printBackground: true
    })
    return pdfBuffer
}
const groupTripId = (tripDetails: tripDetailsProps[]) => {
    const loadingToUnloading: number[] = []
    const loadingToStock: number[] = []
    const stockToUnloading: number[] = []
    tripDetails.forEach((data: tripDetailsProps) => {
        switch (data.tripName) {
            case 'LoadingToUnloading':
                loadingToUnloading.push(data.tripId)
                break
            case 'StockToUnloading':
                stockToUnloading.push(data.tripId)
                break
            case 'LoadingToStock':
                loadingToStock.push(data.tripId)
                break
            default:
        }
    })
    return { loadingToUnloading, loadingToStock, stockToUnloading }
}
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

// eslint-disable-next-line complexity
export const updateInvoiceDetails = async (req: Request, res: Response) => {
    const { tripName } = req.body.trip[0]
    const { loadingToStock, loadingToUnloading, stockToUnloading } = groupTripId(req.body.trip)
    let loadingPointToUnloadingPointTrip: InvoiceProp['trips']['loadingPointToUnloadingPointTrip'] =
        []
    let loadingPointToStockPointTrip: InvoiceProp['trips']['loadingPointToStockPointTrip'] = []
    let stockPointToUnloadingPointTrip: InvoiceProp['trips']['stockPointToUnloadingPointTrip'] = []
    if (tripName === 'LoadingToUnloading') {
        loadingPointToUnloadingPointTrip = await loadingToUnlaodingInvoice(loadingToUnloading)
    }
    if (tripName === 'StockToUnloading') {
        // @ts-expect-error type
        stockPointToUnloadingPointTrip = await stockToUnlaodingInvoice(stockToUnloading)
    }
    if (tripName === 'LoadingToStock') {
        loadingPointToStockPointTrip = await loadingToStockInvoice(loadingToStock)
    }
    const componentHtml = ReactDOMServer.renderToString(
        getContentBasedOnCompany(
            req.body.cementCompany.name,
            {
                trips: {
                    loadingPointToUnloadingPointTrip,
                    loadingPointToStockPointTrip,
                    stockPointToUnloadingPointTrip
                }
            },
            req.body.bill
        )
    )
    const dom = new JSDOM(`<!DOCTYPE html><html><body>${componentHtml}</body></html>`)
    const invoiceHtml = dom.window.document.querySelector('#invoice')?.outerHTML
    const annexureHtml = dom.window.document.querySelector('#annexure')?.outerHTML
    if (!invoiceHtml) logger.error('Required HTML sections not found')
    const browser = await puppeteer.launch()
    const invoicePdfBuffer = await generateBufferFromHtml(browser, invoiceHtml, 1200, 1300)
    const annexurePdfBuffer = await generateBufferFromHtml(browser, annexureHtml, 1200, 1300)
    await browser.close()
    const pdfDoc = await PDFDocument.create()
    const [invoicePdf, annexurePdf] = await Promise.all([
        PDFDocument.load(invoicePdfBuffer),
        PDFDocument.load(annexurePdfBuffer)
    ])
    const [invoicePage] = await pdfDoc.copyPages(invoicePdf, [0])
    const [annexurePage] = await pdfDoc.copyPages(annexurePdf, [0])
    pdfDoc.addPage(invoicePage)
    pdfDoc.addPage(annexurePage)
    const combinedPdfBuffer = await pdfDoc.save()
    await uploadToS3(combinedPdfBuffer, req.body.cementCompany.name, req.body.bill.billNo)

    await Promise.all([
        updateLoadingToStock(loadingToStock, req.body.bill.billNo),
        updateLoadingToUnloading(loadingToUnloading, req.body.bill.billNo),
        updateStockToUnloading(stockToUnloading, req.body.bill.billNo)
    ])
        .then(() => res.status(200).json(componentHtml))
        .catch((err) => res.status(500).json(`Error generating or uploading PDF: ${err}`))
}

// export const previewPDFController = async (req: Request, res: Response) => {
//     const { tripName } = req.body.trip[0]
//     const { loadingToStock, loadingToUnloading, stockToUnloading } = groupTripId(req.body.trip)
//     let loadingPointToUnloadingPointTrip:
//      InvoiceProp['trips']['loadingPointToUnloadingPointTrip'] =
//         []
//     let loadingPointToStockPointTrip:
//      InvoiceProp['trips']['loadingPointToStockPointTrip'] = []
//     let stockPointToUnloadingPointTrip:
// InvoiceProp['trips']['stockPointToUnloadingPointTrip'] = []
//     if (tripName === 'LoadingToUnloading') {
//         loadingPointToUnloadingPointTrip = await loadingToUnlaodingInvoice(loadingToUnloading)
//     }
//     if (tripName === 'StockToUnloading') {
//         stockPointToUnloadingPointTrip = await stockToUnlaodingInvoice(stockToUnloading)
//     }
//     if (tripName === 'LoadingToStock') {
//         loadingPointToStockPointTrip = await loadingToStockInvoice(loadingToStock)
//     }
//     const componentHtml = ReactDOMServer.renderToString(
//         getContentBasedOnCompany(
//             req.body.cementCompany.name,
//             {
//                 trips: {
//                     loadingPointToUnloadingPointTrip,
//                     loadingPointToStockPointTrip,
//                     stockPointToUnloadingPointTrip
//                 }
//             },
//             req.body.bill
//         )
//     )
//     res.status(200).json(componentHtml)
// }
