import { Request, Response } from 'express'
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
import { updateBillNumber } from '../models/billNumber.ts'

interface tripDetailsProps {
    tripId: number
    tripName: string
}
interface invoiceProps {
    loadingToUnloading: number[]
    loadingToStock: number[]
    stockToUnloading: number[]
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
    return null
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

export const getInvoiceDetails = (req: Request, res: Response) => {
    const { loadingToUnloading, loadingToStock, stockToUnloading }: invoiceProps = groupTripId(
        req.body
    )
    Promise.all([
        loadingToUnlaodingInvoice(loadingToUnloading),
        loadingToStockInvoice(loadingToStock),
        stockToUnlaodingInvoice(stockToUnloading)
    ])
        .then((data) => {
            const loadingPointToUnloadingPointTrip = data[0]
            const loadingPointToStockPointTrip = data[1]
            const stockPointToUnloadingPointTrip = data[2]
            return {
                loadingPointToUnloadingPointTrip,
                loadingPointToStockPointTrip,
                stockPointToUnloadingPointTrip
            }
        })
        .then((data) => res.status(200).json(data))
        .catch(() => res.sendStatus(500))
}
export const updateInvoiceDetails = (req: Request, res: Response) => {
    const { loadingToUnloading, loadingToStock, stockToUnloading }: invoiceProps = groupTripId(
        req.body.trip
    )
    Promise.all([
        updateLoadingToStock(loadingToStock, req.body.billNo),
        updateLoadingToUnloading(loadingToUnloading, req.body.billNo),
        updateStockToUnloading(stockToUnloading, req.body.billNo),
        updateBillNumber(req.body.billNo)
    ])
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(500))
}
