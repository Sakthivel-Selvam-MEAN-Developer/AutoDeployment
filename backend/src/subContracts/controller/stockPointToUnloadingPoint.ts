import { Request, Response } from 'express'
import { create } from '../models/stockPointToUnloadingPoint.ts'
import {
    getOverAllTripIdByLoadingToStockId,
    updateStockToUnloadingInOverall
} from '../models/overallTrip.ts'
import { closeStockTrip } from '../models/loadingToStockPointTrip.ts'
import { handlePrismaError } from '../../../prisma/errorHandler.ts'

interface dataProps {
    id: number
    loadingPointToStockPointTripId: number
}
const overAllTrip = async (stockToUnloading: dataProps) => {
    const overallTrip = await getOverAllTripIdByLoadingToStockId(
        stockToUnloading.loadingPointToStockPointTripId
    )
    await updateStockToUnloadingInOverall(overallTrip?.id, stockToUnloading.id)
    await closeStockTrip(stockToUnloading.loadingPointToStockPointTripId)
}
export const createStockPointToUnloadingPointTrip = (req: Request, res: Response) => {
    create(req.body)
        .then(async (stockToUnloading) => overAllTrip(stockToUnloading))
        .then(() => res.sendStatus(200))
        .catch((error) => handlePrismaError(error, res))
}
