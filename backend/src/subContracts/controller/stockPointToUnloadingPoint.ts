import { Request, Response } from 'express'
import {
    create,
    getAllStockToUnloadingPointUnbilledTrips
} from '../models/stockPointToUnloadingPoint.ts'
import {
    getOverAllTripIdByLoadingToStockId,
    updateStockToUnloadingInOverall
} from '../models/overallTrip.ts'
import { closeStockTrip } from '../models/loadingToStockPointTrip.ts'
import { handlePrismaError } from '../../../prisma/errorHandler.ts'
import { getTripSalaryDetailsByLoactionId } from '../../driverSalary/models/tripSalary.ts'
import {
    getDriverIdByTripId,
    updateDriverTripWithTripSalaryId
} from '../../driverSalary/models/driverTrip.ts'
import logger from '../../logger.ts'

interface rowProps {
    freightAmount: number
    invoiceNumber: string
    loadingPointToStockPointTripId: number
    startDate: number
    totalFreightAmount: number
    totalTransporterAmount: number
    transporterAmount: number
    unloadingPointId: number
    truckId?: number
}

const createStockToUnloadTrip = async (data: rowProps) =>
    create(data).then(async (stockToUnloading) => {
        const overallTrip = await getOverAllTripIdByLoadingToStockId(
            stockToUnloading.loadingPointToStockPointTripId
        )
        await updateStockToUnloadingInOverall(overallTrip?.id, stockToUnloading.id)
        await closeStockTrip(stockToUnloading.loadingPointToStockPointTripId)
        return overallTrip
    })
interface RequestQuery {
    type: string
    stockPointId: string
}
export const createStockPointToUnloadingPointTrip = async (
    req: Request<object, object, rowProps, RequestQuery>,
    res: Response
) => {
    const { type, stockPointId } = req.query
    const { truckId, ...resData } = req.body
    logger.info(truckId)
    if (type !== 'Own') {
        createStockToUnloadTrip(resData)
            .then(() => res.sendStatus(200))
            .catch((error) => handlePrismaError(error, res))
    } else if (type === 'Own') {
        const tripSalary = await getTripSalaryDetailsByLoactionId(
            '',
            req.body.unloadingPointId.toString(),
            stockPointId.toString()
        )
        if (tripSalary !== null) {
            const overallTrip = await createStockToUnloadTrip(resData)
            const driverTrip = await getDriverIdByTripId(overallTrip?.id || 0)
            await updateDriverTripWithTripSalaryId(
                driverTrip?.id || 0,
                tripSalary.tripBetta,
                tripSalary.id
            ).then((data) => res.status(200).json(data))
        } else res.status(400).send('There is no trip salary details for specified locations')
    }
}
export const listAllStocktoUnloadingPointUnbilledTrips = (_req: Request, res: Response) => {
    getAllStockToUnloadingPointUnbilledTrips().then((data) => res.status(200).json(data))
}
