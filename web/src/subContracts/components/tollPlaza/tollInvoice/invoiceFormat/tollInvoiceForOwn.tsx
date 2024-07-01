import { FC } from 'react'
import { epochToMinimalDate } from '../../../../../commonUtils/epochToTime'
import TripAmountCalculation from '../tollAmountCalculations'
import { tripProp } from '../type'
const headers = [
    'S.No',
    'Bill No',
    'Bill Date',
    'Vendor Code',
    'Delivery No',
    'Date',
    'City Code Description',
    'Truck No',
    'INV QTY',
    'Dhone',
    'Pullur',
    'SV Puram',
    'PAMIDI',
    'Davangere',
    'Maruru',
    'Bagepalli',
    'Devanahalli',
    'AP Misc Toll',
    'HYD Misc Toll',
    'BGL Misc Toll',
    'TN Misc Toll',
    'KER Misc Toll',
    'Rajampet (Muncipal)',
    'Total Toll'
]
const TableHeader: FC = () => (
    <tr className="table-head">
        {headers.map((header) => (
            <th key={header}>{header}</th>
        ))}
    </tr>
)

const TollInvoice: FC<tripProp> = ({ trips, bill }) => {
    const { tripDetails, totalAmount } = TripAmountCalculation(trips)
    const tollSumsByState = trips.map((trip) => {
        const acc: { [key: string]: number } = {}
        trip.toll.forEach((toll) => {
            const state = toll.tollPlazaLocation.state
            acc[state] = (acc[state] || 0) + toll.amount
        })
        return acc
    }, {})
    return (
        <div className="toll-invoice-format-for-own" id="toll-invoice-format-for-own">
            <table>
                <TableHeader />
                <tbody>
                    <tr className="table-head">
                        {headers.map((header) => (
                            <th key={header}>{header}</th>
                        ))}
                    </tr>
                    {tripDetails.map((trip, index) => (
                        <tr className="table-body" key={trip.id}>
                            <td>{index + 1}</td>
                            <td>{bill.number}</td>
                            <td>{epochToMinimalDate(bill.date)}</td>
                            <td>2406621</td>
                            <td>{trip.trip.invoiceNumber}</td>
                            <td>{epochToMinimalDate(trip.trip.startDate)}</td>
                            <td>
                                {trip.trip.stockPointToUnloadingPointTrip
                                    ? trip.trip.stockPointToUnloadingPointTrip[0].unloadingPoint
                                          .name
                                    : trip.trip.unloadingPoint?.name}
                            </td>
                            <td>{trip.trip.truck.vehicleNumber}</td>
                            <td>{trip.trip.filledLoad}</td>
                            <td>
                                {(trip.tollDetails &&
                                    trip.tollDetails[`${'Dhone'.toLowerCase()}`]) ||
                                    '-'}
                            </td>
                            <td>
                                {(trip.tollDetails &&
                                    trip.tollDetails[`${'Pullur'.toLowerCase()}`]) ||
                                    '-'}
                            </td>
                            <td>
                                {(trip.tollDetails &&
                                    trip.tollDetails[`${'SV Puram'.toLowerCase()}`]) ||
                                    '-'}
                            </td>
                            <td>
                                {(trip.tollDetails &&
                                    trip.tollDetails[`${'PAMIDI'.toLowerCase()}`]) ||
                                    '-'}
                            </td>
                            <td>
                                {(trip.tollDetails &&
                                    trip.tollDetails[`${'Davangere'.toLowerCase()}`]) ||
                                    '-'}
                            </td>
                            <td>
                                {(trip.tollDetails &&
                                    trip.tollDetails[`${'Maruru'.toLowerCase()}`]) ||
                                    '-'}
                            </td>
                            <td>
                                {(trip.tollDetails &&
                                    trip.tollDetails[`${'Bagepalli'.toLowerCase()}`]) ||
                                    '-'}
                            </td>
                            <td>
                                {(trip.tollDetails &&
                                    trip.tollDetails[`${'Devanahalli'.toLowerCase()}`]) ||
                                    '-'}
                            </td>
                            <td>
                                {(tollSumsByState.length && tollSumsByState[index]['AP']) || '-'}
                            </td>
                            <td>
                                {(tollSumsByState.length && tollSumsByState[index]['TG']) || '-'}
                            </td>
                            <td>
                                {(tollSumsByState.length && tollSumsByState[index]['KA']) || '-'}
                            </td>
                            <td>
                                {(tollSumsByState.length && tollSumsByState[index]['TN']) || '-'}
                            </td>
                            <td>
                                {(tollSumsByState.length && tollSumsByState[index]['KL']) || '-'}
                            </td>
                            <td>
                                {(tollSumsByState.length && tollSumsByState[index]['RM']) || '-'}
                            </td>
                            <td>
                                {trip.tollDetails &&
                                    Object.values(trip.tollDetails).reduce(
                                        (acc, current) => acc + current,
                                        0
                                    )}
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr className="table-head">
                        <th colSpan={2} style={{ border: '1px solid', padding: '2px' }}>
                            Vendor code
                        </th>
                        <th colSpan={2} style={{ border: '1px solid', padding: '2px' }}>
                            Bill No
                        </th>
                        <th style={{ border: '1px solid', padding: '2px' }}>Amount</th>
                        <th style={{ border: '1px solid', padding: '2px' }}>GST 12%</th>
                        <th style={{ border: '1px solid', padding: '2px' }}>Total Amount</th>
                    </tr>
                    <tr>
                        <th style={{ border: '1px solid', padding: '2px' }} colSpan={2}>
                            2406621
                        </th>
                        <th style={{ border: '1px solid', padding: '2px' }} colSpan={2}>
                            {bill.number}
                        </th>
                        <th style={{ border: '1px solid', padding: '2px' }}>
                            {totalAmount.toFixed(2)}
                        </th>
                        <th style={{ border: '1px solid', padding: '2px' }}>
                            {(totalAmount * (12 / 100)).toFixed(2)}
                        </th>
                        <th style={{ border: '1px solid', padding: '2px' }}>
                            {(totalAmount + totalAmount * (12 / 100)).toFixed(2)}
                        </th>
                    </tr>
                    <tr>
                        <td
                            style={{ border: '1px solid', padding: '2px', textAlign: 'center' }}
                            colSpan={6}
                        >
                            2406621 - Total Amount
                        </td>
                        <td style={{ border: '1px solid', padding: '2px', textAlign: 'center' }}>
                            {(totalAmount + totalAmount * (12 / 100)).toFixed(2)}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TollInvoice
