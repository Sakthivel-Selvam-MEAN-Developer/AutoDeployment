import { Request, Response } from 'express'
import { create } from '../models/stockPointToUnloadingPoint.ts'
import {
    getOverAllTripIdByLoadingToStockId,
    updateStockToUnloadingInOverall
} from '../models/overallTrip.ts'
import { closeStockTrip } from '../models/loadingToStockPointTrip.ts'
import { handlePrismaError } from '../../../prisma/errorHandler.ts'
import { getTripSalaryDetailsByLoactionId } from '../../driverSalary/models/tripSalary.ts'
import {
    getDriverIdByTripId,
    create as createDriverTrip
} from '../../driverSalary/models/driverTrip.ts'

interface dataProps {
    id: number
    loadingPointToStockPointTripId: number
}
interface rowProps {
    freightAmount: number
    invoiceNumber: string
    loadingPointToStockPointTripId: number
    startDate: number
    totalFreightAmount: number
    totalTransporterAmount: number
    transporterAmount: number
    truckId: number
    unloadingPointId: number
}
const overAllTrip = async (stockToUnloading: dataProps, type: string, row: rowProps) => {
    const overallTrip = await getOverAllTripIdByLoadingToStockId(
        stockToUnloading.loadingPointToStockPointTripId
    )
    await updateStockToUnloadingInOverall(overallTrip?.id, stockToUnloading.id)
    await closeStockTrip(stockToUnloading.loadingPointToStockPointTripId)
    if (type !== 'Own') return
    const driverId = await getDriverIdByTripId(overallTrip?.id || 0)
    const stockPointId = overallTrip?.loadingPointToStockPointTrip?.stockPointId || ''
    const tripSalary = await getTripSalaryDetailsByLoactionId(
        '',
        row.unloadingPointId.toString(),
        stockPointId ? stockPointId.toString() : ''
    )
    await createDriverTrip({
        tripId: overallTrip?.id || 0,
        tripStartDate: row.startDate,
        driverId: driverId?.driverId || 0,
        tripSalaryId: tripSalary?.id || 0
    })
}
export const createStockPointToUnloadingPointTrip = (req: Request, res: Response) => {
    const { type } = req.params
    create(req.body)
        .then(async (stockToUnloading) => overAllTrip(stockToUnloading, type, req.body))
        .then(() => res.sendStatus(200))
        .catch((error) => handlePrismaError(error, res))
}
