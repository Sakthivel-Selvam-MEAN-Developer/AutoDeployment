import { Request, Response } from 'express'
import ReactDOMServer from 'react-dom/server'
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

interface tripDetailsProps {
    tripId: number
    tripName: string
}

const groupTripId = (tripDetails: tripDetailsProps[]) => {
    const loadingToUnloading: number[] = []
    const loadingToStock: number[] = []
    const stockToUnloading: number[] = []
    tripDetails.map((data: tripDetailsProps) => {
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
        return 0
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
    cementCompanyName: string
}
type listTripDetailsByCompanyNameProps = (
    req: Request<object, object, object, RequestQuery>,
    res: Response
) => void
export const listTripDetailsByCompanyName: listTripDetailsByCompanyNameProps = async (req, res) => {
    const filterData = {
        startDate: parseInt(req.query.startDate),
        endDate: parseInt(req.query.endDate),
        company: req.query.cementCompanyName
    }
    await getTripByType(req.query.pageName, filterData)
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}

export const updateInvoiceDetails = async (req: Request, res: Response) => {
    const { loadingToStock, loadingToUnloading, stockToUnloading } = groupTripId(req.body.trip)
    let loadingPointToUnloadingPointTrip: InvoiceProp['trips']['loadingPointToUnloadingPointTrip'] =
        []
    let loadingPointToStockPointTrip: InvoiceProp['trips']['loadingPointToStockPointTrip'] = []
    let stockPointToUnloadingPointTrip: InvoiceProp['trips']['stockPointToUnloadingPointTrip'] = []

    if (req.body.trip[0].tripName === 'LoadingToUnloading') {
        loadingPointToUnloadingPointTrip = await loadingToUnlaodingInvoice(loadingToUnloading)
    }
    if (req.body.trip[0].tripName === 'StockToUnloading') {
        stockPointToUnloadingPointTrip = await stockToUnlaodingInvoice(stockToUnloading)
    }
    if (req.body.trip[0].tripName === 'LoadingToStock') {
        loadingPointToStockPointTrip = await loadingToStockInvoice(loadingToStock)
    }
    const componentHtml = ReactDOMServer.renderToString(
        getContentBasedOnCompany(
            req.body.company,
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
    Promise.all([
        updateLoadingToStock(loadingToStock, req.body.bill.billNo),
        updateLoadingToUnloading(loadingToUnloading, req.body.bill.billNo),
        updateStockToUnloading(stockToUnloading, req.body.bill.billNo)
        // updateBillNumber(req.body.billNo)
    ])
        .then(() => res.status(200).json(componentHtml))
        .catch(() => res.sendStatus(500))
}
