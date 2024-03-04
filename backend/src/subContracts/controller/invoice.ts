import { Request, Response } from 'express'
import {
    updateBillNumber as updateLoadingToUnloading,
    getInvoiceDetails as loadingToUnlaodingInvoice
} from '../models/loadingToUnloadingTrip.ts'
import {
    updateBillNumber as updateLoadingToStock,
    getInvoiceDetails as loadingToStockInvoice
} from '../models/loadingToStockPointTrip.ts'
import {
    updateBillNumber as updateStockToUnloading,
    getInvoiceDetails as stockToUnlaodingInvoice
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
            const [
                loadingPointToUnloadingPointTrip,
                loadingPointToStockPointTrip,
                stockPointToUnloadingPointTrip
            ] = data
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
