import { axiosInstance, getData } from '../../apiCalls'
interface expenseProps {}
export interface tokenProps {
    headers: {
        authorization: string
    }
}
export const createExpense = (data: expenseProps) =>
    axiosInstance.post(`/expenses`, data).then(getData)
