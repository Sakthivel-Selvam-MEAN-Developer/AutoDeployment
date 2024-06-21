import { FC } from 'react'
import { epochToMinimalDate } from '../../../../commonUtils/epochToTime'
import { Trip } from './types'
import { totalTripExpenseCalculation } from './totalCalulation'
interface ExpenseTable {
    tripDetails: Trip[]
}
export const ExpenseTable: FC<ExpenseTable> = ({ tripDetails }) => {
    return (
        <>
            {tripDetails.map(
                (trip) =>
                    trip.expenses.length > 0 && (
                        <>
                            <TableContainer key={trip.id} trip={trip} />
                            <br />
                        </>
                    )
            )}
        </>
    )
}
interface TablePorps {
    trip: Trip
}
const TableContainer: FC<TablePorps> = ({ trip }) => {
    const TotalExpense = totalTripExpenseCalculation(trip)
    return (
        <>
            <table className="advanceTable" style={{ width: '100%' }}>
                <tr>
                    <th className="alignLeft">SI No</th>
                    <th className="alignLeft">Date</th>
                    <th className="alignLeft">Description</th>
                    <th className="alignRight">Amount</th>
                </tr>
                <TableCells trip={trip} />
                <tr>
                    <td></td>
                    <td></td>
                    <td className="alignRight">
                        <h4>Total Amount</h4>
                    </td>
                    <td className="alignRight">
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
                <td className="alignLeft">{index + 1}</td>
                <td className="alignLeft">{epochToMinimalDate(tripDetails.startDate)}</td>
                <td className="alignLeft">{expense.expenseType}</td>
                <td className="alignRight">{expense.acceptedAmount.toFixed(2)}</td>
            </tr>
        )
    })
