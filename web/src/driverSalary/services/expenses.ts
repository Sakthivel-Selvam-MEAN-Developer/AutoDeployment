import { axiosInstance, getData } from '../../apiCalls'
interface expenseProps {}
export interface tokenProps {
    headers: {
        authorization: string
    }
}
interface updateExpense {
    acceptedAmount: number
    rejectableReason: string
}
export const createExpense = (data: expenseProps) =>
    axiosInstance.post(`/expenses`, data).then(getData)

export const getExpenseByTripId = (id: number | undefined) =>
    axiosInstance.get(`/expenses`, { params: { tripId: id } }).then(getData)

export const getAllExpenseByTripIdForApproval = (driverId: number) =>
    axiosInstance.get(`/expensesApproval`, { params: { driverId } }).then(getData)

export const updateExpenseApproval = (data: updateExpense, expenseId: number) =>
    axiosInstance.post(`/updateExpensesApproval`, data, { params: { expenseId } }).then(getData)
