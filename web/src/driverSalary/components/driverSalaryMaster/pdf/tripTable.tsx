import { FC } from 'react'
import { epochToMinimalDate } from '../../../../commonUtils/epochToTime'
import { driverDetailProps, Trip } from '../types'
import { totalCalculation, totalTripExpenseCalculation } from './totalCalulation'
interface TablePorps {
    tripDetails: driverDetailProps
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
    'Batta'
]
export const TripTable: FC<TablePorps> = ({ tripDetails }) => {
    const {
        totalAdvance,
        totalExpense,
        totalFilledLoad,
        averageFilledLoad,
        totalFuel,
        totalBetta
    } = totalCalculation(tripDetails)
    return (
        <table className="tripTable" style={{ width: '100%' }}>
            <tr>
                {TableHead.map((head, index) => (
                    <th key={index} className="alignLeft">
                        {head}
                    </th>
                ))}
            </tr>
            <TableCells tripDetails={tripDetails.trips} />
            <tr>
                <td></td>
                <td></td>
                <td className="alignRight">
                    <h4>{totalAdvance.toFixed(2)}</h4>
                </td>
                <td></td>
                <td className="alignRight">
                    <h4>13,668.00</h4>
                </td>
                <td className="alignRight">
                    <h4>{totalExpense.toFixed(2)}</h4>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                    <b>
                        T {totalFilledLoad.toFixed(2)} <br />A {averageFilledLoad.toFixed(2)}
                    </b>
                </td>
                <td></td>
                <td>
                    <b>{totalFuel.toFixed(2)}</b>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                    <b>{totalBetta.toFixed(2)}</b>
                </td>
            </tr>
        </table>
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
        const { tripData, type } = findTrip(trip)
        let tripAdvance = 0
        trip.advanceforTrip.map(({ amount }) => {
            tripAdvance += amount
        })
        const tripExpense = totalTripExpenseCalculation(trip)
        return (
            <tr key={index}>
                <td className="alignLeft">{index + 1}</td>
                <td className="alignLeft">{epochToMinimalDate(tripData.startDate)}</td>
                <td className="alignRight">{tripAdvance.toFixed(2)}</td>
                <td className="alignLeft">{tripData.invoiceNumber}</td>
                <td className="alignLeft"></td>
                <td className="alignRight">{tripExpense.toFixed(2)}</td>
                <td className="alignLeft">{tripData.loadingPoint.cementCompany.name}</td>
                <td className="alignLeft">{tripData.loadingPoint.name}</td>
                <td className="alignLeft">
                    {type === 'direct' ? tripData.unloadingPoint.name : tripData.stockPoint.name}
                </td>
                <td className="alignLeft">Cement</td>
                <td className="alignRight">{tripData.filledLoad.toFixed(2)}</td>
                <td className="alignLeft"></td>
                <td className="alignRight">
                    {trip.fuel.length > 0 ? trip.fuel[0].totalprice.toFixed(2) : 0}
                </td>
                <td className="alignRight">0.00</td>
                <td className="alignRight">0.00</td>
                <td className="alignLeft"></td>
                <td className="alignRight">{trip.tripSalaryDetails.totalTripBetta.toFixed(2)}</td>
            </tr>
        )
    })
