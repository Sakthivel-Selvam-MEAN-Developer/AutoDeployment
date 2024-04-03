import { Request, Response } from 'express'
import { expensesType } from '@prisma/client'
import { create, getAllExpenseByTripId, getAllExpenses } from '../models/expenses.ts'

function checkType(data: string) {
    switch (data) {
        case 'LOADING_CHARGES':
            return expensesType.LOADING_CHARGES
        case 'UNLOADING_CHARGES':
            return expensesType.UNLOADING_CHARGES
        case 'TOLL_EXPENSES':
            return expensesType.TOLL_EXPENSES
        case 'TRIP_ALLOWANCE':
            return expensesType.TRIP_ALLOWANCE
        case 'CASE_SLIP_EXPENSES':
            return expensesType.CASE_SLIP_EXPENSES
        case 'ROUTE_ALLOWANCES':
            return expensesType.ROUTE_ALLOWANCES
        case 'OFFICE_EXPENSES':
            return expensesType.OFFICE_EXPENSES
        case 'GREASING_CHARGES':
            return expensesType.GREASING_CHARGES
        case 'AIR_CHECKUP_CHARGES':
            return expensesType.AIR_CHECKUP_CHARGES
        case 'TOOLS_SPARES_CHARGES':
            return expensesType.TOOLS_SPARES_CHARGES
        case 'WORKSHOP_SHOWROOM_CHARGES':
            return expensesType.WORKSHOP_SHOWROOM_CHARGES
        case 'PHONE_ATM_CHARGES':
            return expensesType.PHONE_ATM_CHARGES
        case 'EMAIL_CHRGES':
            return expensesType.EMAIL_CHRGES
        case 'PUNCTURE_CHARGES':
            return expensesType.PUNCTURE_CHARGES
        case 'PARKING_CHARGES':
            return expensesType.PARKING_CHARGES
        case 'WEIGHT_BRIDGE_CHARGES':
            return expensesType.WEIGHT_BRIDGE_CHARGES
        case 'OIL_CHARGES':
            return expensesType.OIL_CHARGES
        case 'ADBLUE_OIL_CHARGES':
            return expensesType.ADBLUE_OIL_CHARGES
        case 'MECHANICAL_EXPENSES':
            return expensesType.MECHANICAL_EXPENSES
        case 'SAFETY_EXEPENSES':
            return expensesType.SAFETY_EXEPENSES
        case 'ELECTRICAL_EXPENSES':
            return expensesType.ELECTRICAL_EXPENSES
        case 'MISCELLANCEOUS_EXPENSES':
            return expensesType.MISCELLANCEOUS_EXPENSES
        default:
            return ''
    }
}
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
export const listAllExpenses = async (_req: Request, res: Response) => {
    getAllExpenses()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
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
