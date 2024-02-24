import { Request, Response } from 'express'
import {
    create,
    findTripWithActiveDues,
    getCompletedDues,
    getGstDuesGroupByName,
    getGstPaymentDues,
    getOnlyActiveDuesByName,
    getUpcomingDuesByDefault,
    getUpcomingDuesByFilter,
    updatePaymentDues,
    updatePaymentNEFTStatus
} from '../models/paymentDues.ts'
import { getOverallTrip } from '../models/overallTrip.ts'
import { getFuelDetailsWithoutTrip, updateFuelStatus } from '../models/fuel.ts'
import { getTransporterAccountByName } from '../models/transporter.ts'
import { getBunkAccountByName } from '../models/bunk.ts'

interface transporterAccountProps {
    name: string
    accountNumber: string
    ifsc: string
    address: string
    accountTypeNumber: number
}
interface bunkAccountProps {
    bunkName: string
    accountNumber: string
    ifsc: string
    location: string
    accountTypeNumber: number
}
interface gstAccountProps {
    name: string
    accountNumber: string
    ifsc: string
    address: string
    accountTypeNumber: number
}
interface groupedDuesProps {
    _count: { status: number }
    _sum: { payableAmount: number | null }
    name: string
}
interface gstDuesProps {
    id: number
    payableAmount: number
    overallTripId: number | null
    type: string
    name: string
    status: boolean
    vehicleNumber: string
    fuelId: number | null
}
export const createPaymentDues = (req: Request, res: Response) => {
    create(req.body)
        .then(() => res.sendStatus(200))
        .catch(() => res.status(500))
}
interface fuelprops {
    id: number
    fueledDate: number
    invoiceNumber: string
    bunk: {
        location: string
    }
}
function getFuelPayDate(fuelId: number, fuelDetails: fuelprops[]) {
    const fuelTrip = fuelDetails.find((fuel: fuelprops) => fuel.id === fuelId)
    if (fuelTrip) {
        return {
            date: fuelTrip.fueledDate,
            location: fuelTrip.bunk.location,
            invoiceNumber: fuelTrip.invoiceNumber,
            id: fuelTrip.id
        }
    }
}

function tripInfo(matchingTrip: any, tripData: any, fuelDetails: any) {
    let invoice
    let obj
    let loadingPoint
    let unloadingPoint
    let date
    if (matchingTrip.type === 'initial pay') {
        invoice =
            tripData[0].loadingPointToStockPointTrip !== null
                ? tripData[0].loadingPointToStockPointTrip.invoiceNumber
                : tripData[0].loadingPointToUnloadingPointTrip.invoiceNumber
        loadingPoint =
            tripData[0].loadingPointToStockPointTrip !== null
                ? tripData[0].loadingPointToStockPointTrip.loadingPoint.name
                : tripData[0].loadingPointToUnloadingPointTrip.loadingPoint.name
        unloadingPoint =
            tripData[0].loadingPointToStockPointTrip !== null
                ? tripData[0].loadingPointToStockPointTrip.stockPoint.name
                : tripData[0].loadingPointToUnloadingPointTrip.unloadingPoint.name
        date =
            tripData[0].loadingPointToStockPointTrip !== null
                ? tripData[0].loadingPointToStockPointTrip.startDate
                : tripData[0].loadingPointToUnloadingPointTrip.startDate
    } else if (matchingTrip.type === 'final pay') {
        invoice =
            tripData[0].stockPointToUnloadingPointTrip !== null
                ? tripData[0].stockPointToUnloadingPointTrip.invoiceNumber
                : tripData[0].loadingPointToUnloadingPointTrip.invoiceNumber
        loadingPoint =
            tripData[0].loadingPointToStockPointTrip !== null
                ? tripData[0].loadingPointToStockPointTrip.stockPoint.name
                : tripData[0].loadingPointToUnloadingPointTrip.loadingPoint.name
        unloadingPoint =
            tripData[0].stockPointToUnloadingPointTrip !== null
                ? tripData[0].stockPointToUnloadingPointTrip.unloadingPoint.name
                : tripData[0].loadingPointToUnloadingPointTrip.unloadingPoint.name
        date =
            tripData[0].stockPointToUnloadingPointTrip !== null
                ? tripData[0].stockPointToUnloadingPointTrip.startDate
                : tripData[0].loadingPointToUnloadingPointTrip.startDate
    } else obj = getFuelPayDate(matchingTrip.fuelId, fuelDetails)
    const details = {
        id: matchingTrip.id,
        overallTripId: matchingTrip.overallTripId,
        payableAmount: matchingTrip.payableAmount,
        type: matchingTrip.type,
        number: matchingTrip.vehicleNumber,
        invoiceNumber: matchingTrip.type !== 'fuel pay' ? invoice : obj?.invoiceNumber,
        date: matchingTrip.type !== 'fuel pay' ? date : obj?.date,
        location: obj?.location,
        loadingPoint,
        unloadingPoint,
        fuelId: obj?.id
    }
    return details
}

export const groupDataByName = async (
    duesData: groupedDuesProps[],
    tripsData: gstDuesProps[],
    tripDetails: any[],
    fuelDetails: any[],
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
                return tripInfo(matchingTrip, tripData, fuelDetails)
            })
        }
    })

export const listOnlyActiveTransporterDues = async (req: Request, res: Response) => {
    const { duedate, status } = req.params
    const duesData = await getOnlyActiveDuesByName(parseInt(duedate), status === 'true')
    const name = duesData.map((data) => data.name)
    const tripsData = await findTripWithActiveDues(parseInt(duedate), status === 'true')
    const tripDetails = await getOverallTrip()
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
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(500))
}
export const groupGstDue = async (
    groupedGstDues: groupedDuesProps[],
    gstPaymentDues: gstDuesProps[],
    bankDetails: gstAccountProps[]
) =>
    groupedGstDues.map((groupedDue) => {
        const matchingGstDue = gstPaymentDues.filter((due) => groupedDue.name === due.name)
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
            tripDetails: matchingGstDue.map((matchingTrip) => ({
                id: matchingTrip.id,
                vehicleNumber: matchingTrip.vehicleNumber,
                type: matchingTrip.type,
                amount: matchingTrip.payableAmount
            }))
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
export const listAllUpcomingTransporterDues = (req: Request, res: Response) => {
    const { name, from, to } = req.params
    getUpcomingDuesByFilter(name, parseInt(from), parseInt(to))
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
export const listAllUpcomingTransporterDuesByDefault = (_req: Request, res: Response) => {
    getUpcomingDuesByDefault()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}

export const listAllCompletedDues = (req: Request, res: Response) => {
    const { name, from, to, page } = req.params
    getCompletedDues(name, parseInt(from), parseInt(to), parseInt(page))
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
