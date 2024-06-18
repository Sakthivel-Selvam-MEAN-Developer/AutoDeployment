import { FC } from 'react'
import { epochToMinimalDate } from '../../../../commonUtils/epochToTime'
import { Trip } from './types'
export const totalCalculation = (trip: Trip) => {
    let total = 0
    trip.expenses.map((expense) => (total += expense.acceptedAmount))
    return total
}
interface TablePorps {
    tripDetails: Trip[]
}
const TableHead = [
    'SI No',
    'Date',
    'Advance',
    'GC No.',
    'FastTag',
    'Expenses',
    'Customer',
    'From Place',
    'To Place',
    'Particulars',
    'Weight',
    'Km',
    'Diesel',
    'Fixed Lts',
    'Diff.Lts',
    'Kmpl',
    'CRH',
    'Batta'
]
export const TripTable: FC<TablePorps> = ({ tripDetails }) => {
    // const TotalExpense = totalCalculation(trip)
    return (
        <>
            <table className="advanceTable" style={{ width: '100%' }}>
                <tr>
                    {TableHead.map((head, index) => (
                        <th key={index} style={{ textAlign: 'left' }}>
                            {head}
                        </th>
                    ))}
                </tr>
                <TableCells tripDetails={tripDetails} />
                <tr>
                    <td></td>
                    <td></td>
                    <td style={{ textAlign: 'right' }}>
                        <h4>17,000.00</h4>
                    </td>
                    <td></td>
                    <td style={{ textAlign: 'right' }}>
                        <h4>13,668.00</h4>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                        <h4>12,180.00</h4>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>T 250.74 A 41.79</td>
                    <td></td>
                    <td>1,784.13</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>31,000.00</td>
                </tr>
            </table>
        </>
    )
}
const findTrip = (overallTrip: Trip) => {
    if (overallTrip.loadingPointToStockPointTrip !== null) {
        return { tripData: overallTrip.loadingPointToStockPointTrip, type: 'stock' }
    } else {
        return { tripData: overallTrip.loadingPointToUnloadingPointTrip, type: 'direct' }
    }
}
interface TableCells {
    tripDetails: Trip[]
}
const TableCells: FC<TableCells> = ({ tripDetails }) =>
    tripDetails.map((trip, index) => {
        const { tripData } = findTrip(trip)
        return (
            <tr key={index}>
                <td style={{ textAlign: 'left' }}>1</td>
                <td style={{ textAlign: 'left' }}>{epochToMinimalDate(tripData.startDate)}</td>
                <td style={{ textAlign: 'left' }}>1</td>
                <td style={{ textAlign: 'left' }}>1</td>
                <td style={{ textAlign: 'left' }}>1</td>
                <td style={{ textAlign: 'left' }}>1</td>
                <td style={{ textAlign: 'left' }}>{tripData.loadingPoint.cementCompany.name}</td>
                <td style={{ textAlign: 'left' }}>{tripData.loadingPoint.name}</td>
                <td style={{ textAlign: 'left' }}>{tripData.unloadingPoint.name}</td>
                <td style={{ textAlign: 'left' }}>Cement</td>
                <td style={{ textAlign: 'left' }}>{tripData.filledLoad.toFixed(2)}</td>
                <td style={{ textAlign: 'left' }}>1</td>
                <td style={{ textAlign: 'left' }}>1</td>
                <td style={{ textAlign: 'left' }}>0.00</td>
                <td style={{ textAlign: 'left' }}>0.00</td>
                <td style={{ textAlign: 'left' }}>1</td>
                <td style={{ textAlign: 'left' }}>1</td>
                <td style={{ textAlign: 'left' }}>{trip.tripSalaryDeatails.totalTripBetta}</td>
            </tr>
        )
    })
