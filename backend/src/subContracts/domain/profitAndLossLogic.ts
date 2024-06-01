import axios from 'axios'
import { IncomingHttpHeaders } from 'http'
import dayjs from 'dayjs'
import { allTrips, allTripDetails, responseDetails, tripType as tripTypeProp } from './types.ts'

const getTripType = (trips: allTrips | null) => {
    if (trips?.loadingPointToStockPointTrip !== null) {
        return {
            ...trips?.loadingPointToStockPointTrip,
            unloadingPoint: trips?.loadingPointToStockPointTrip.stockPointToUnloadingPointTrip
                ? trips.loadingPointToStockPointTrip.stockPointToUnloadingPointTrip[0]
                      .unloadingPoint.name
                : ''
        }
    }
    return {
        ...trips.loadingPointToUnloadingPointTrip,
        unloadingPoint: trips.loadingPointToUnloadingPointTrip?.unloadingPoint?.name
    }
}
type type = (
    tripType: tripTypeProp,
    pandl: number,
    totalDieselAmount: number,
    totalExpenses: number
) => responseDetails['trip']

const getTripObject: type = (tripType, pandl, totalDieselAmount, totalExpenses) => ({
    id: 1,
    vehicleNumber: tripType?.truck?.vehicleNumber,
    startDate: tripType?.startDate,
    invoiceNumber: tripType?.invoiceNumber,
    transporterName: tripType?.truck?.transporter.name,
    csmName: tripType?.truck?.transporter.csmName,
    loadingPoint: tripType?.loadingPoint?.name,
    stockPoint: tripType?.stockPoint ? tripType.stockPoint.name : 'Null',
    unloadingPoint: tripType?.unloadingPoint,
    filledLoad: tripType?.filledLoad,
    totalFreightAmount: tripType?.totalFreightAmount,
    totalDieselAmount,
    totalExpenses,
    pandl
})

const groupProfitAndLossDetails = async (
    driverDetails: allTripDetails,
    tripDetails: allTrips | null
) => {
    const { expenses, tripSalaryDetails, driverTrip } = driverDetails
    let tripSalaryIds: number[] = []
    const responseTrips: responseDetails[] = []
    driverTrip.forEach((trip) => {
        tripSalaryIds.push(trip.unloadingTripSalaryId)
        tripSalaryIds.push(trip.stockTripSalaryId || 0)
    })
    const tripType = getTripType(tripDetails)
    const expenseAmountByTrip = expenses
        .filter((exp) => exp.tripId === tripDetails?.id)
        .reduce((acc, expense) => acc + expense.acceptedAmount, 0)
    const tripBettaByTrip = tripSalaryDetails
        .filter((salary) => tripSalaryIds.includes(salary.id))
        .reduce((acc, salary) => acc + salary.tripBetta, 0)
    const dateDuration = dayjs
        .unix(tripDetails?.shortageQuantity[0].unloadedDate || 0)
        .diff(dayjs.unix(tripType.startDate || 0), 'day')
    const totalDailyBetta = dateDuration * tripSalaryDetails[0].dailyBetta
    const totalDailyAmount = dateDuration * 350
    const totalDieselAmount =
        (tripDetails?.paymentDues.length && tripDetails?.paymentDues[0].payableAmount) || 0
    const totalRanKMAmount =
        ((tripType.unloadingKilometer ? tripType.unloadingKilometer : 0) -
            (tripType.loadingKilometer ? tripType.loadingKilometer : 0)) *
        8.5
    const totalExpenses =
        totalDailyAmount +
        totalDailyBetta +
        totalDieselAmount +
        totalRanKMAmount +
        tripBettaByTrip +
        expenseAmountByTrip +
        (tripDetails?.shortageQuantity[0].shortageAmount || 0)
    const pandl = (tripType.totalFreightAmount ? tripType.totalFreightAmount : 0) - totalExpenses
    responseTrips.push({
        trip: getTripObject(tripType, pandl, totalDieselAmount, totalExpenses),
        expenseAmountByTrip,
        tripBettaByTrip,
        totalDailyBetta,
        totalDailyAmount,
        totalRanKMAmount,
        totalDieselAmount,
        shortageAmount: tripDetails?.shortageQuantity[0].shortageAmount || 0,
        vehicleExpense: 0
    })
    tripSalaryIds = []
    return responseTrips
}
type Type = (
    headers: IncomingHttpHeaders,
    tripDetails: allTrips | null
) => Promise<responseDetails[]>
export const profitAndLossLogic: Type = async (headers, tripDetails) => {
    const driverDetails = await axios
        .get(`${headers.hostname}/api/drivertrip/getDriverTrip`, {
            params: { id: tripDetails?.id },
            headers: { Authorization: headers.authorization }
        })
        .then(async (data) =>
            groupProfitAndLossDetails(data.data, tripDetails).then((details) => details)
        )
    return driverDetails
}
