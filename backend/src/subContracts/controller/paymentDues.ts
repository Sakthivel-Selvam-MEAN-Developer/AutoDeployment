import { Request, Response } from 'express'
import {
    create,
    findTripWithActiveDues,
    getCompletedDues,
    getGstDuesGroupByName,
    getGstPaymentDues,
    getOnlyActiveDuesByName,
    getUpcomingDuesByFilter,
    updatePaymentDues,
    updatePaymentNEFTStatus
} from '../models/paymentDues.ts'
import { getFuelDetailsWithoutTrip, updateFuelStatus } from '../models/fuel.ts'
import { getTransporterAccountByName } from '../models/transporter.ts'
import { getBunkAccountByName } from '../models/bunk.ts'
import { overallTripByPendingPaymentDues } from '../models/overallTrip.ts'
import { handlePrismaError } from '../../../prisma/errorHandler.ts'
import { dataProps, getNEFTData } from '../domain/neftLogic.ts'

interface transporterAccountProps {
    name: string
    accountNumber: string
    ifsc: string
    branchName: string
    accountTypeNumber: number
}
interface bunkAccountProps {
    bunkName: string
    accountNumber: string
    ifsc: string
    branchName: string
    accountTypeNumber: number
}
interface gstAccountProps {
    name: string
    accountNumber: string
    ifsc: string
    branchName: string
    accountTypeNumber: number
}
interface groupedDuesProps {
    _count: { status: number }
    _sum: { payableAmount: number | null }
    name: string
}
interface stockPointToUnloadingPointTripProps {
    unloadingPoint: {
        name: string
    }
}
interface tripProps {
    truck: {
        vehicleNumber: string
        transporter: {
            name: string
        }
    }
    loadingPoint: {
        name: string
    }
    unloadingPoint: {
        name: string
    }
    stockPoint:
        | {
              name: string
          }
        | undefined
    invoiceNumber: number
    startDate: number
    stockPointToUnloadingPointTrip: stockPointToUnloadingPointTripProps[] | undefined
}
interface overallTripProps {
    loadingPointToStockPointTrip: tripProps | undefined
    loadingPointToUnloadingPointTrip: tripProps | undefined
    stockPointToUnloadingPointTrip: tripProps | undefined
}
interface tripDueProps {
    id: number
    payableAmount: number
    overallTripId: number | null
    type: string
    name: string
    status: boolean
    vehicleNumber: string
    dueDate: number
    fuelId: number | null
}
export const createPaymentDues = (req: Request, res: Response) => {
    create(req.body)
        .then(() => res.sendStatus(200))
        .catch((error) => handlePrismaError(error, res))
}
export interface fuelprops {
    id: number
    fueledDate: number
    invoiceNumber: string
    bunk: {
        location: string
    }
}
function getFuelPayDate(fuelId: number | null, fuelDetails: fuelprops[]) {
    const fuelTrip = fuelDetails.find((fuel: fuelprops) => fuel.id === fuelId)
    if (fuelTrip === undefined) return
    return {
        date: fuelTrip.fueledDate,
        location: fuelTrip.bunk.location,
        invoiceNumber: fuelTrip.invoiceNumber,
        id: fuelTrip.id
    }
}

const getUnloadingPointForInitialPay = (tripType: tripProps | undefined) => {
    const unloading =
        tripType?.stockPoint !== undefined
            ? tripType?.stockPoint.name
            : tripType?.unloadingPoint.name
    return unloading
}

const getUnloadingPointForFinalPay = (tripType: tripProps | undefined) => {
    const unloading =
        tripType?.stockPointToUnloadingPointTrip !== undefined
            ? tripType?.stockPointToUnloadingPointTrip[0].unloadingPoint.name
            : tripType?.unloadingPoint.name
    return unloading
}
const getStockLocation = (paymentType: string, tripType: tripProps | undefined) => {
    if (paymentType === 'initial pay') return getUnloadingPointForInitialPay(tripType)
    if (paymentType === 'final pay') return getUnloadingPointForFinalPay(tripType)
}
interface matchingTripProps {
    id: number
    type: string
    fuelId: number | null
    vehicleNumber: string
    overallTripId: number | null
    payableAmount: number
    dueDate: number
}

function tripInfo(
    matchingTrip: matchingTripProps,
    tripData: overallTripProps,
    fuelDetails: fuelprops[]
) {
    let tripType
    if (tripData.loadingPointToStockPointTrip !== null) {
        tripType = tripData.loadingPointToStockPointTrip
    } else if (tripData.loadingPointToUnloadingPointTrip !== null) {
        tripType = tripData.loadingPointToUnloadingPointTrip
    }
    let obj
    if (matchingTrip.type === 'fuel pay') obj = getFuelPayDate(matchingTrip.fuelId, fuelDetails)
    const details = {
        id: matchingTrip.id,
        overallTripId: matchingTrip.overallTripId,
        payableAmount: matchingTrip.payableAmount,
        type: matchingTrip.type,
        number: matchingTrip.vehicleNumber,
        invoiceNumber:
            matchingTrip.type !== 'fuel pay' ? tripType?.invoiceNumber : obj?.invoiceNumber,
        date: matchingTrip.type !== 'fuel pay' ? tripType?.startDate : obj?.date,
        location: obj?.location,
        loadingPoint: matchingTrip.type !== 'fuel pay' ? tripType?.loadingPoint.name : undefined,
        unloadingPoint: getStockLocation(matchingTrip.type, tripType),
        fuelId: obj?.id,
        dueDate: matchingTrip.dueDate
    }
    return details
}

export const groupDataByName = async (
    duesData: any[],
    tripsData: tripDueProps[],
    tripDetails: any[],
    fuelDetails: fuelprops[],
    transporterAccounts: transporterAccountProps[],
    bunkAccount: bunkAccountProps[]
) =>
    duesData.map((due) => {
        const matchingTrips = tripsData.filter((trip) => trip.name === due.name)
        const transporterAccount = transporterAccounts.filter((acc) => acc.name === due.name)
        const bunkBankAccount = bunkAccount.filter((account) => account.bunkName === due.name)
        return {
            name: due.name,
            dueDetails: {
                // eslint-disable-next-line no-underscore-dangle
                count: due._count.status,
                // eslint-disable-next-line no-underscore-dangle
                totalPayableAmount: due._sum.payableAmount
            },
            bankDetails: transporterAccount.length !== 0 ? transporterAccount : bunkBankAccount,
            tripDetails: matchingTrips.map((matchingTrip) => {
                const tripData = tripDetails.filter(
                    (trip) =>
                        trip.id === matchingTrip.overallTripId ||
                        (matchingTrip.overallTripId === null &&
                            matchingTrip.status === false &&
                            matchingTrip.type === 'fuel pay')
                )
                return tripInfo(matchingTrip, tripData[0], fuelDetails)
            })
        }
    })
interface RequestQuery {
    todayDate: string
    status: string
    type: string
}

export const listOnlyActiveTransporterDues = async (
    req: Request<object, object, object, RequestQuery>,
    res: Response
) => {
    const { todayDate, status, type } = req.query
    const duesData = await getOnlyActiveDuesByName(parseInt(todayDate), status === 'true', type)
    const name = duesData.map((data) => data.name)
    const tripsData = await findTripWithActiveDues(parseInt(todayDate), status === 'true', type)
    const tripDetails = await overallTripByPendingPaymentDues()
    const fuelDetails = await getFuelDetailsWithoutTrip()
    const transporterAccounts = await getTransporterAccountByName(name)
    const bunkAccount = await getBunkAccountByName(name)
    await groupDataByName(
        duesData,
        tripsData,
        tripDetails,
        fuelDetails,
        transporterAccounts,
        bunkAccount
    )
        .then((data) => res.status(200).json(data))
        .catch(() => res.sendStatus(500))
}

export const updatePayment = (req: Request, res: Response) => {
    updatePaymentDues(req.body)
        .then(async () => {
            if (req.body.type === 'fuel pay') await updateFuelStatus(req.body.fuelId)
        })
        .then((data) => res.status(200).json(data))
        .catch(() => res.sendStatus(500))
}

export const updateNEFTStatus = (req: Request, res: Response) => {
    updatePaymentNEFTStatus(req.body)
        .then((data) => res.status(200).json(data))
        .catch(() => res.sendStatus(500))
}
const findTripType = (overallTrip: overallTripProps) => {
    let tripType
    if (overallTrip.loadingPointToStockPointTrip !== null) {
        tripType = overallTrip.loadingPointToStockPointTrip
    } else if (overallTrip.loadingPointToUnloadingPointTrip !== null) {
        tripType = overallTrip.loadingPointToUnloadingPointTrip
    }
    return tripType
}
export const groupGstDue = async (
    groupedGstDues: groupedDuesProps[],
    gstPaymentDues: any[],
    bankDetails: gstAccountProps[]
) =>
    groupedGstDues.map((groupedDue) => {
        const matchingGstDue = gstPaymentDues?.filter((due) => groupedDue.name === due.name)
        const bankDetail = bankDetails.filter((account) => groupedDue.name === account.name)
        return {
            name: groupedDue.name,
            dueDetails: {
                // eslint-disable-next-line no-underscore-dangle
                count: groupedDue._count.status,
                // eslint-disable-next-line no-underscore-dangle
                payableAmount: groupedDue._sum.payableAmount
            },
            bankDetails: bankDetail,
            tripDetails: matchingGstDue?.map((matchingTrip) => {
                const trip = findTripType(matchingTrip.overallTrip)
                return {
                    id: matchingTrip.id,
                    vehicleNumber: matchingTrip.vehicleNumber,
                    type: matchingTrip.type,
                    amount: matchingTrip.payableAmount,
                    loadingPoint: trip?.loadingPoint.name,
                    unloadingPoint:
                        matchingTrip.overallTrip.stockPointToUnloadingPointTrip !== null
                            ? matchingTrip.overallTrip.stockPointToUnloadingPointTrip.unloadingPoint
                                  .name
                            : trip?.unloadingPoint.name,
                    invoiceNumber: trip?.invoiceNumber,
                    startDate: trip?.startDate,
                    transporterInvoice: matchingTrip.overallTrip.transporterInvoice
                }
            })
        }
    })

export const listGstDuesGroupByName = async (req: Request, res: Response) => {
    const groupedGstDues = await getGstDuesGroupByName(req.params.status === 'true')
    const name = groupedGstDues.map((dues) => dues.name)
    const bankDetails = req.params.status === 'false' ? await getTransporterAccountByName(name) : []
    const gstPaymentDues = await getGstPaymentDues(name, req.params.status === 'true')
    await groupGstDue(groupedGstDues, gstPaymentDues, bankDetails)
        .then((gstDueData) => res.status(200).json(gstDueData))
        .catch(() => res.sendStatus(500))
}
interface RequestQuery {
    transporterName: string
    from: string
    to: string
    paymentType: string
}
export const listAllUpcomingTransporterDues = (
    req: Request<object, object, object, RequestQuery>,
    res: Response
) => {
    const { transporterName, from, to, paymentType } = req.query
    getUpcomingDuesByFilter(transporterName, from, to, paymentType?.toLowerCase())
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
interface CompletedQuery {
    name: string
    from: string
    to: string
    page: string
    payType: string
}
export const listAllCompletedDues = (
    req: Request<object, object, object, CompletedQuery>,
    res: Response
) => {
    const { name, from, to, page, payType } = req.query
    getCompletedDues(name, parseInt(from), parseInt(to), parseInt(page), payType)
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
export const donwloadNEFTFile = (req: Request, res: Response) => {
    const NEFTData: dataProps[] = req.body
    const finalData = getNEFTData(NEFTData)
    res.status(200).send(finalData)
}
