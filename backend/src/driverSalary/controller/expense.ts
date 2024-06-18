import { Request, Response } from 'express'
import { expensesType } from '@prisma/client'
import { IncomingHttpHeaders } from 'http'
import axios from 'axios'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import {
    create,
    getAllExpenseByTripId,
    getAllExpenseForApproval,
    updateExpenseApproval as updateExpense
} from '../models/expenses.ts'
import { getAllDriverTripById } from '../models/driverTrip.ts'

dayjs.extend(utc)

const checkType = (data: string) =>
    ({
        LOADING_CHARGES: expensesType.LOADING_CHARGES,
        UNLOADING_CHARGES: expensesType.UNLOADING_CHARGES,
        TOLL_EXPENSES: expensesType.TOLL_EXPENSES,
        TRIP_ALLOWANCE: expensesType.TRIP_ALLOWANCE,
        CASE_SLIP_EXPENSES: expensesType.CASE_SLIP_EXPENSES,
        ROUTE_ALLOWANCES: expensesType.ROUTE_ALLOWANCES,
        OFFICE_EXPENSES: expensesType.OFFICE_EXPENSES,
        GREASING_CHARGES: expensesType.GREASING_CHARGES,
        AIR_CHECKUP_CHARGES: expensesType.AIR_CHECKUP_CHARGES,
        TOOLS_SPARES_CHARGES: expensesType.TOOLS_SPARES_CHARGES,
        WORKSHOP_SHOWROOM_CHARGES: expensesType.WORKSHOP_SHOWROOM_CHARGES,
        PHONE_ATM_CHARGES: expensesType.PHONE_ATM_CHARGES,
        EMAIL_CHRGES: expensesType.EMAIL_CHRGES,
        PUNCTURE_CHARGES: expensesType.PUNCTURE_CHARGES,
        PARKING_CHARGES: expensesType.PARKING_CHARGES,
        WEIGHT_BRIDGE_CHARGES: expensesType.WEIGHT_BRIDGE_CHARGES,
        OIL_CHARGES: expensesType.OIL_CHARGES,
        ADBLUE_OIL_CHARGES: expensesType.ADBLUE_OIL_CHARGES,
        MECHANICAL_EXPENSES: expensesType.MECHANICAL_EXPENSES,
        SAFETY_EXEPENSES: expensesType.SAFETY_EXEPENSES,
        ELECTRICAL_EXPENSES: expensesType.ELECTRICAL_EXPENSES,
        MISCELLANCEOUS_EXPENSES: expensesType.MISCELLANCEOUS_EXPENSES
    })[data] || ''

interface expensesTypeProps {
    expenseType: string
}
export const createExpense = async (req: Request, res: Response) => {
    const data = await req.body.map((expense: expensesTypeProps) => {
        const name = checkType(expense.expenseType)
        if (name === '') return res.status(500)
        return { ...expense, expenseType: name, expenseDate: dayjs.utc().startOf('day').unix() }
    })
    await create(data)
        .then(() => res.sendStatus(200))
        .catch(() => res.status(500))
}
interface QueryParam {
    driverId: string
}
const getOverallTrip = (hostname: string | undefined | string[], allTripIds: string) =>
    axios.get(`${hostname}/api/overalltrip/ids`, {
        params: { ids: allTripIds }
    })
const expenseApproval = async (headers: IncomingHttpHeaders, alltripIds: number[]) => {
    const falseExpense = await getAllExpenseForApproval(alltripIds)
    const alltripId = [...new Set(falseExpense.map((id) => id.tripId))]
    const overallTrip = await getOverallTrip(headers.hostname, JSON.stringify(alltripId))
    return overallTrip.data.map((trip: { id: number }) => {
        const falseExpenseByTripId = falseExpense.filter((expense) => expense.tripId === trip.id)
        return { trip, expense: falseExpenseByTripId }
    })
}
export const ListAllExpenseByTripIdForApproval = async (
    req: Request<object, object, object, QueryParam>,
    res: Response
) => {
    const { driverId } = req.query
    const allTripIdByDriverId = await getAllDriverTripById(parseInt(driverId))
    const alltripIds = [...new Set(allTripIdByDriverId.map((id) => id.tripId))]
    const combinedTrip = await expenseApproval(req.headers, alltripIds)
    res.status(200).json(combinedTrip)
}
type RequestQuery = {
    tripId: string
}
export const listAllExpenseByTripId = async (
    req: Request<object, object, object, RequestQuery>,
    res: Response
) => {
    const { tripId } = req.query
    getAllExpenseByTripId(parseInt(tripId))
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
type RequestExpenseQuery = {
    expenseId: string
}
export interface updateExpenseType {
    acceptedAmount: number
    rejectableReason: string
}
export const updateExpenseApproval = async (
    req: Request<object, object, updateExpenseType, RequestExpenseQuery>,
    res: Response
) => {
    const { expenseId } = req.query
    updateExpense(parseInt(expenseId), req.body)
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
