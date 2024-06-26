import { FC } from 'react'
import { epochToMinimalDate } from '../../../../commonUtils/epochToTime'
import { driverDetailProps, Trip } from '../types'
import { TableContainer } from './expenseTableUtils'
interface ExpenseTable {
    tripDetails: driverDetailProps
}
export const ExpenseTable: FC<ExpenseTable> = ({ tripDetails }) => {
    return (
        <div className="expensetablesConatiner">
            {tripDetails.trips.map(
                (trip) =>
                    trip.expenses.length > 0 && (
                        <div key={trip.id} className="expenseTable">
                            <TableContainer trip={trip} />
                            <br />
                        </div>
                    )
            )}
        </div>
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
export const TableCells: FC<TableCells> = ({ trip }) =>
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
