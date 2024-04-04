import { axiosInstance, getData } from '../../apiCalls'
interface expenseProps {}
export interface tokenProps {
    headers: {
        authorization: string
    }
}
export const createExpense = (data: expenseProps) =>
    axiosInstance.post(`/expenses`, data).then(getData)

export const getExpenseByTripId = (id: number) =>
    axiosInstance.get(`/expenses`, { params: { tripId: id } }).then(getData)

export const getAllExpenseByTripIdForApproval = () =>
    axiosInstance.get(`/expensesApproval`).then(getData)
