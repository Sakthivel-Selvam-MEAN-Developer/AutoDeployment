import { FC } from 'react'
import { totalTripExpenseCalculation } from './totalCalulation'
import { Trip } from '../types'
import { TableCells } from './expenseTable'

interface TablePorps {
    trip: Trip
}
export const TableContainer: FC<TablePorps> = ({ trip }) => {
    const TotalExpense = totalTripExpenseCalculation(trip)
    return (
        <table>
            <tr>
                <th className="alignLeft" style={{ minWidth: '30px' }}>
                    SI No
                </th>
                <th className="alignLeft" style={{ minWidth: '50px' }}>
                    Date
                </th>
                <th className="alignLeft" style={{ minWidth: '70px' }}>
                    Description
                </th>
                <th className="alignRight" style={{ minWidth: '50px' }}>
                    Amount
                </th>
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
    )
}
