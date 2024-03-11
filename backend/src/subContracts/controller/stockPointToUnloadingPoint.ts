import { Request, Response } from 'express'
import { create } from '../models/stockPointToUnloadingPoint.ts'
import {
    getOverAllTripIdByLoadingToStockId,
    updateStockToUnloadingInOverall
} from '../models/overallTrip.ts'
import { closeStockTrip } from '../models/loadingToStockPointTrip.ts'

export const createStockPointToUnloadingPointTrip = (req: Request, res: Response) => {
    create(req.body)
        .then(async (stockToUnloading) => {
            const overallTrip = await getOverAllTripIdByLoadingToStockId(
                stockToUnloading.loadingPointToStockPointTripId
            )
            await updateStockToUnloadingInOverall(overallTrip?.id, stockToUnloading.id)
            await closeStockTrip(stockToUnloading.loadingPointToStockPointTripId)
        })
        .then(() => res.sendStatus(200))
        .catch(() => res.status(500))
}
