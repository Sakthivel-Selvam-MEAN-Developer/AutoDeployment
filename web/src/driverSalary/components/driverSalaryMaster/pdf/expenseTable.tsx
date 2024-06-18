import { FC } from 'react'
import { epochToMinimalDate } from '../../../../commonUtils/epochToTime'
import { Trip } from './types'
interface ExpenseTable {
    tripDetails: Trip[]
}
export const ExpenseTable: FC<ExpenseTable> = ({ tripDetails }) => {
    return (
        <>
            {tripDetails.map((trip, index) => (
                <TableContainer key={index} trip={trip} />
            ))}
        </>
    )
}
export const totalCalculation = (trip: Trip) => {
    let total = 0
    trip.expenses.map((expense) => (total += expense.acceptedAmount))
    return total
}
interface TablePorps {
    trip: Trip
}
const TableContainer: FC<TablePorps> = ({ trip }) => {
    const TotalExpense = totalCalculation(trip)
    return (
        <>
            <table className="advanceTable" style={{ width: '100%' }}>
                <tr>
                    <th style={{ textAlign: 'left' }}>SI No</th>
                    <th style={{ textAlign: 'left' }}>Date</th>
                    <th style={{ textAlign: 'left' }}>Description</th>
                    <th style={{ textAlign: 'right' }}>Amount</th>
                </tr>
                <TableCells trip={trip} />
                <tr>
                    <td></td>
                    <td></td>
                    <td style={{ textAlign: 'right' }}>
                        <h4>Total Amount</h4>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                        <h4>{TotalExpense.toFixed(2)}</h4>
                    </td>
                </tr>
            </table>
        </>
    )
}
const findTrip = (overallTrip: Trip) => {
    if (overallTrip.loadingPointToStockPointTrip !== null) {
        return { tripDetails: overallTrip.loadingPointToStockPointTrip, type: 'stock' }
    } else {
        return { tripDetails: overallTrip.loadingPointToUnloadingPointTrip, type: 'direct' }
    }
}
interface TableCells {
    trip: Trip
}
const TableCells: FC<TableCells> = ({ trip }) =>
    trip.expenses.map((expense, index) => {
        const { tripDetails } = findTrip(trip)
        return (
            <tr key={index}>
                <td style={{ textAlign: 'left' }}>1</td>
                <td style={{ textAlign: 'left' }}>{epochToMinimalDate(tripDetails.startDate)}</td>
                <td style={{ textAlign: 'left' }}>{expense.expenseType}</td>
                <td style={{ textAlign: 'right' }}>{expense.acceptedAmount.toFixed(2)}</td>
            </tr>
        )
    })
