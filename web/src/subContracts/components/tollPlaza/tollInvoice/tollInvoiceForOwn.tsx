import { FC } from 'react'
import { tripProp } from './type'
import { epochToMinimalDate } from '../../../../commonUtils/epochToTime'
import TripAmountCalculation from './tollAmountCalculations'

const TollInvoice: FC<tripProp> = ({ trips, bill }) => {
    const { tripDetails, totalAmount } = TripAmountCalculation(trips)
    return (
        <div className="toll-invoice-format-for-own">
            <table>
                <tbody>
                    <tr className="table-head">
                        <th>S.No</th>
                        <th>Bill No</th>
                        <th>Bill Date</th>
                        <th>Vendor Code</th>
                        <th>Delivery No</th>
                        <th>Date</th>
                        <th>City Code Description</th>
                        <th>Truck No</th>
                        <th>INV QTY</th>
                        <th>Dhone</th>
                        <th>Pullur</th>
                        <th>SV Puram</th>
                        <th>PAMIDI</th>
                        <th>Davangere</th>
                        <th>Maruru</th>
                        <th>Bagepalli</th>
                        <th>Devanahalli</th>
                        <th>AP Misc Toll</th>
                        <th>HYD Misc Toll</th>
                        <th>BGL Misc Toll</th>
                        <th>TN Misc Toll</th>
                        <th>KER Misc Toll</th>
                        <th>Rajampet (Muncipal)</th>
                        <th>Total Toll</th>
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
                                {trip.tollDetails &&
                                    trip.tollDetails[`${'Dhone'.toLocaleLowerCase()}`]}
                            </td>
                            <td>
                                {trip.tollDetails &&
                                    trip.tollDetails[`${'Pullur'.toLocaleLowerCase()}`]}
                            </td>
                            <td>
                                {trip.tollDetails &&
                                    trip.tollDetails[`${'SV Puram'.toLocaleLowerCase()}`]}
                            </td>
                            <td>
                                {trip.tollDetails &&
                                    trip.tollDetails[`${'PAMIDI'.toLocaleLowerCase()}`]}
                            </td>
                            <td>
                                {trip.tollDetails &&
                                    trip.tollDetails[`${'Davangere'.toLocaleLowerCase()}`]}
                            </td>
                            <td>
                                {trip.tollDetails &&
                                    trip.tollDetails[`${'Maruru'.toLocaleLowerCase()}`]}
                            </td>
                            <td>
                                {trip.tollDetails &&
                                    trip.tollDetails[`${'Bagepalli'.toLocaleLowerCase()}`]}
                            </td>
                            <td>
                                {trip.tollDetails &&
                                    trip.tollDetails[`${'Devanahalli'.toLocaleLowerCase()}`]}
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
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
