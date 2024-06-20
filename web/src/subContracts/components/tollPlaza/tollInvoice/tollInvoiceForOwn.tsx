import { FC } from 'react'
import { tripProp } from './type'

const TollInvoice: FC<tripProp> = ({ trips, bill }) => {
    console.log(bill)
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
                    {trips.map((trip, index) => (
                        <tr className="table-body" key={trip.id}>
                            <td>{index + 1}</td>
                            <td>MGL-129A1</td>
                            <td>12/12/2012</td>
                            <td>12212</td>
                            <td>345w334232</td>
                            <td>23/12/2011</td>
                            <td>CBT-12-CBT</td>
                            <td>TN67YU7890</td>
                            <td>1232.76</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>897</td>
                            <td>787</td>
                            <td>678</td>
                            <td>2377</td>
                            <td>-</td>
                            <td>-</td>
                            <td>12324.00</td>
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
                            MGL23A-347
                        </th>
                        <th style={{ border: '1px solid', padding: '2px' }}>250498</th>
                        <th style={{ border: '1px solid', padding: '2px' }}>30059.76</th>
                        <th style={{ border: '1px solid', padding: '2px' }}>280557.76</th>
                    </tr>
                    <tr>
                        <th style={{ border: '1px solid', padding: '2px' }} colSpan={2}>
                            2406621
                        </th>
                        <th style={{ border: '1px solid', padding: '2px' }} colSpan={2}>
                            MGL23A-347
                        </th>
                        <th style={{ border: '1px solid', padding: '2px' }}>250498</th>
                        <th style={{ border: '1px solid', padding: '2px' }}>30059.76</th>
                        <th style={{ border: '1px solid', padding: '2px' }}>280557.76</th>
                    </tr>
                    <tr>
                        <th style={{ border: '1px solid', padding: '2px' }} colSpan={2}>
                            2406621
                        </th>
                        <th style={{ border: '1px solid', padding: '2px' }} colSpan={2}>
                            MGL23A-347
                        </th>
                        <th style={{ border: '1px solid', padding: '2px' }}>250498</th>
                        <th style={{ border: '1px solid', padding: '2px' }}>30059.76</th>
                        <th style={{ border: '1px solid', padding: '2px' }}>280557.76</th>
                    </tr>
                    <tr>
                        <td
                            style={{ border: '1px solid', padding: '2px', textAlign: 'center' }}
                            colSpan={6}
                        >
                            2406621 - Total Amount
                        </td>
                        <td style={{ border: '1px solid', padding: '2px', textAlign: 'center' }}>
                            841673.96
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TollInvoice
