import { ReactElement } from 'react'
interface loadingPointToUnloadingPointTrip {
    id: number
    loadingPoint: { name: string }
    invoiceNumber: string
    startDate: number
    unloadingPoint: { name: string }
    truck: { vehicleNumber: string }
}
interface loadingPointToStockPointTrip {
    id: number
    loadingPoint: { name: string }
    invoiceNumber: string
    startDate: number
    stockPointToUnloadingPointTrip: [{ unloadingPoint: { name: string } }]
    truck: { vehicleNumber: string }
}
export interface expense {
    id: number
    tripId: number
    expenseType: string
    placedAmount: number
}
export interface trips {
    id: number
    loadingPointToUnloadingPointTrip?: loadingPointToUnloadingPointTrip
    loadingPointToStockPointTrip?: loadingPointToStockPointTrip
}
export interface expenseApprovalProps {
    trip: trips
    expense: expense[]
}
export interface expenseListProps {
    expensesForApproval: expenseApprovalProps[]
    setReload: React.Dispatch<React.SetStateAction<boolean>>
    reload: boolean
}
export interface ExpenseAccordionSummaryProps {
    trip: trips
}
export type ExpenseType = (
    driverList: never[],
    setDriverId: React.Dispatch<React.SetStateAction<number>>,
    driverName: string | null,
    setDriverName: React.Dispatch<React.SetStateAction<string | null>>
) => ReactElement
export type props = (
    expensesForApproval: expenseApprovalProps[],
    setReload: React.Dispatch<React.SetStateAction<boolean>>,
    reload: boolean
) => ReactElement
