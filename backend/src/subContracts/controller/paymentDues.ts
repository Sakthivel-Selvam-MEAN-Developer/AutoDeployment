import { Request, Response } from 'express'
import dayjs from 'dayjs'
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
import { getFuelDetailsWithoutTrip, updateFuelStatus } from '../models/fuel.ts'
import { getTransporterAccountByName } from '../models/transporter.ts'
import { getBunkAccountByName } from '../models/bunk.ts'
import { overallTripByPendingPaymentDues } from '../models/overallTrip.ts'

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
    stockPoint: {
        name: string
    }
    freightAmount: number
    transporterAmount: number
    stockPointToUnloadingPointTrip: stockPointToUnloadingPointTripProps[]
}

const getUnloadingPointForInitialPay = (tripType: tripProps) => {
    const unloading =
        tripType.stockPoint !== undefined ? tripType.stockPoint.name : tripType.unloadingPoint.name
    return unloading
}

const getUnloadingPointForFinalPay = (tripType: tripProps) => {
    const unloading =
        tripType.stockPointToUnloadingPointTrip !== undefined
            ? tripType.stockPointToUnloadingPointTrip[0].unloadingPoint.name
            : tripType.unloadingPoint.name
    return unloading
}
const getStockLocation = (paymentType: string, tripType: tripProps) => {
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
}

function tripInfo(matchingTrip: matchingTripProps, tripData: any, fuelDetails: fuelprops[]) {
    let tripType
    if (tripData[0].loadingPointToStockPointTrip !== null) {
        tripType = tripData[0].loadingPointToStockPointTrip
    } else if (tripData[0].loadingPointToUnloadingPointTrip !== null) {
        tripType = tripData[0].loadingPointToUnloadingPointTrip
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
            matchingTrip.type !== 'fuel pay' ? tripType.invoiceNumber : obj?.invoiceNumber,
        date: matchingTrip.type !== 'fuel pay' ? tripType.startDate : obj?.date,
        location: obj?.location,
        loadingPoint: matchingTrip.type !== 'fuel pay' ? tripType.loadingPoint.name : undefined,
        unloadingPoint: getStockLocation(matchingTrip.type, tripType),
        fuelId: obj?.id
    }
    return details
}

export const groupDataByName = async (
    duesData: any[],
    tripsData: gstDuesProps[],
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
                return tripInfo(matchingTrip, tripData, fuelDetails)
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
interface bankDetailsProps {
    ifsc: string
    accountTypeNumber: number
    accountNumber: number | string
    accountHolder: string
    bunkName: string
    name: string
    branchName: string
}
interface dataProps {
    type: string
    bankDetails: bankDetailsProps[]
    payableAmount: number
}
const getType = (type: string) => {
    if (type === 'initial pay') return { neftType: 'INITIALPAY', type: 'MagnumAdvance' }
    if (type === 'fuel pay') return { neftType: 'FUELPAY', type: 'MagnumFuel' }
    if (type === 'final pay') return { neftType: 'FINALPAY', type: 'MagnumFinal' }
    if (type === 'gst pay') return { neftType: 'GSTPAY', type: 'MagnumGST' }
}
interface type {
    neftType: string
    type: string
}

const getNEFTBody = (NEFTData: dataProps[]) => {
    let types: type | undefined = { neftType: '', type: '' }
    let NEFTDataBody: string = ''
    NEFTData.forEach((data) => {
        types = getType(data.type)
        NEFTDataBody += `${data.bankDetails[0].ifsc},${data.bankDetails[0].accountTypeNumber},${data.bankDetails[0].accountNumber},${data.bankDetails[0].accountHolder},${data.bankDetails[0].branchName},${types?.type},${data.payableAmount}\n`
    })
    return { body: NEFTDataBody, fileType: types.neftType }
}

const getNEFTData = (NEFTData: dataProps[]) => {
    const NEFTDataHeaders =
        'IFSC Code,Account type,Account number,Name of the beneficiary,Address of the beneficiary,Sender information,Amount\n'
    const { body: NEFTDataBody, fileType } = getNEFTBody(NEFTData)
    return { data: NEFTDataHeaders + NEFTDataBody, fileType }
}
export const donwloadNEFTFile = (req: Request, res: Response) => {
    const NEFTData: dataProps[] = req.body
    const { data: NEFTDetails, fileType } = getNEFTData(NEFTData)
    const date = dayjs().format('DDMMYYYY')
    res.status(200).send({
        fileName: `${fileType}${date}.txt`,
        data: NEFTDetails
    })
}
