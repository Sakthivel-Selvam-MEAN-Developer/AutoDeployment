import { Request, Response } from 'express'
import { getInvoiceDetail } from '../models/invoice.ts'
import { updateBillNumber as updateLoadingToUnloading } from '../models/loadingToUnloadingTrip.ts'
import { updateBillNumber as updateLoadingToStock } from '../models/loadingToStockPointTrip.ts'
import { updateBillNumber as updateStockToUnloading } from '../models/stockPointToUnloadingPoint.ts'
import { updateBillNumber } from '../models/billNumber.ts'

interface tripDetailsProps {
    overallTripId: number
    tripId: number
    tripName: string
}
export const getInvoiceDetails = (req: Request, res: Response) => {
    getInvoiceDetail(req.body)
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
export const updateInvoiceDetails = (req: Request, res: Response) => {
    const loadingToUnloading: number[] = []
    const loadingToStock: number[] = []
    const stockToUnloading: number[] = []
    req.body.trip.map((data: tripDetailsProps) => {
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
                return 0
        }
        return 0
    })
    Promise.all([
        updateLoadingToStock(loadingToStock, req.body.billNo),
        updateLoadingToUnloading(loadingToUnloading, req.body.billNo),
        updateStockToUnloading(stockToUnloading, req.body.billNo),
        updateBillNumber(req.body.billNo)
    ])
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(500))
}
