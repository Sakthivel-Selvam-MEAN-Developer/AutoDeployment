import { Request, Response } from 'express'
import { expensesType } from '@prisma/client'
import {
    create,
    getAllExpenseByTripId,
    getAllExpenseForApproval,
    groupAllExpensesByTripId
} from '../models/expenses.ts'

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
        return { ...expense, expenseType: name }
    })
    await create(data)
        .then(() => res.sendStatus(200))
        .catch(() => res.status(500))
}
export const ListAllExpenseByTripIdForApproval = async (_req: Request, res: Response) => {
    const allTripId = await groupAllExpensesByTripId()
    const falseExpense = await getAllExpenseForApproval()
    const d = allTripId.map((trip) => {
        const details = falseExpense.filter((data) => trip.tripId === data.tripId)
        return { tripId: trip.tripId, tripExpenses: details }
    })
    res.status(200).json(d)
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
