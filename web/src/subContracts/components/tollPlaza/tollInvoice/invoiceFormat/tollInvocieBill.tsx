import { FC } from 'react'
import './tollFormat.css'
import { epochToMinimalDate } from '../../../../../commonUtils/epochToTime'
import TripAmountCalculation from '../tollAmountCalculations'
import { tripProp } from '../type'
import { financialYear } from './financialYear'
import { toWords } from './numberToWords'

const TollInvoiceBillFormat: FC<tripProp> = ({ trips, bill }) => {
    const { filledLoad, totalAmount } = TripAmountCalculation(trips)
    return (
        <div
            className="toll-invoice-bill-format"
            id="toll-invoice-bill-format"
            style={{ padding: '20px' }}
        >
            <table>
                <tbody>
                    <tr>
                        <td colSpan={10} style={{ textAlign: 'center' }}>
                            <h3>
                                TRANSPORTATION TOLL BILL : for CEMENT ( HSN of Service :- ) 8704
                            </h3>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={10}>&nbsp;</td>
                    </tr>
                    <tr>
                        <td colSpan={10}>Vendor Code :-2406621</td>
                    </tr>
                    <tr>
                        <td colSpan={10}>&nbsp;</td>
                    </tr>
                    <tr>
                        <td colSpan={6} style={{ padding: '2px 0' }}>
                            Whether Tax Payable under Revesre Charge : &quot;NO&quot;
                        </td>
                        <td colSpan={4} style={{ padding: '2px 0' }}>
                            Bill No :- {bill.number}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={6} style={{ padding: '2px 0' }}>
                            Person Laible to Pay GST
                        </td>
                        <td colSpan={4} style={{ padding: '2px 0' }}>
                            Date :- {epochToMinimalDate(bill.date)}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={6} style={{ padding: '2px 0' }}>
                            UltraTech Cement Limited
                        </td>
                        <td colSpan={4} style={{ padding: '2px 0' }}>
                            PAN No :- ABBFM2821M
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={6} style={{ padding: '2px 0' }}>
                            Bhogasamudram, Tadipatri Mandal, Anantapur District,
                        </td>
                        <td colSpan={4} style={{ padding: '2px 0' }}>
                            GST No (Transporter) :- 33ABBFM2821M2ZD
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={6} style={{ padding: '2px 0' }}>
                            GST NO of UTCL :- 37AAACL6442L1Z9
                        </td>
                        <td colSpan={4} style={{ padding: '2px 0' }}>
                            SAC :- 996791
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={6} style={{ padding: '2px 0' }}>
                            PAN :- AAACL6442L
                        </td>
                        <td colSpan={4} style={{ padding: '2px 0' }}>
                            FY :- {financialYear}
                        </td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td colSpan={10} style={{ padding: '2px 0' }}>
                            Name of Consigner- UltraTech Cement Limited - Andhra Pradesh Cement
                            Works
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={10} style={{ padding: '2px 0' }}>
                            Place of Origin :- ANDHRA PRADESH
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={10} style={{ padding: '2px 0' }}>
                            Place of Supply &amp; state ( In case of inter state Service otherwise
                            N/A) :-- KA/TS/TN/AP
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={10}>&nbsp;</td>
                    </tr>
                    <tr className="table-head">
                        <td>S.No</td>
                        <td colSpan={2}>Bill Date</td>
                        <td colSpan={2}>Bill Number</td>
                        <td>State</td>
                        <td>No of ICDN</td>
                        <td>Qty</td>
                        <td colSpan={2}>Total Amount</td>
                    </tr>
                    <tr className="table-body">
                        <td>1</td>
                        <td colSpan={2}>{epochToMinimalDate(bill.date)}</td>
                        <td colSpan={2}>{bill.number}</td>
                        <td>TN</td>
                        <td>{trips.length}</td>
                        <td>{filledLoad}</td>
                        <td colSpan={2}>{totalAmount.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td colSpan={10}>&nbsp;</td>
                    </tr>
                    <tr>
                        <td />
                        <td colSpan={2} style={{ padding: '5px', border: '1px solid' }}>
                            Toll Amount
                        </td>
                        <td
                            colSpan={2}
                            style={{ padding: '5px', border: '1px solid', textAlign: 'right' }}
                        >
                            {totalAmount.toFixed(2)}
                        </td>
                    </tr>
                    <tr>
                        <td />
                        <td colSpan={2} style={{ padding: '5px', border: '1px solid' }}>
                            IGST 12%
                        </td>
                        <td
                            colSpan={2}
                            style={{ padding: '5px', border: '1px solid', textAlign: 'right' }}
                        >
                            {(totalAmount * (12 / 100)).toFixed(2)}
                        </td>
                    </tr>
                    <tr>
                        <td />
                        <td colSpan={2} style={{ padding: '5px', border: '1px solid' }}>
                            Round off
                        </td>
                        <td
                            colSpan={2}
                            style={{ padding: '5px', border: '1px solid', textAlign: 'right' }}
                        >
                            0.00
                        </td>
                    </tr>
                    <tr>
                        <td />
                        <td colSpan={2} style={{ padding: '5px', border: '1px solid' }}>
                            Total Amount
                        </td>
                        <td
                            colSpan={2}
                            style={{ padding: '5px', border: '1px solid', textAlign: 'right' }}
                        >
                            {(totalAmount + totalAmount * (12 / 100)).toFixed(2)}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={10}>&nbsp;</td>
                    </tr>
                    <tr>
                        <td
                            style={{ border: '1px solid', padding: '3px', textAlign: 'center' }}
                            colSpan={10}
                        >
                            Toll Amount In Words (Including GST) :- Rupee{' '}
                            {toWords.convert(totalAmount + totalAmount * (12 / 100), {
                                currency: true
                            })}
                        </td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td colSpan={10} style={{ textAlign: 'right', paddingRight: '20px' }}>
                            For MAGNUM LOGISTICS
                        </td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td colSpan={10} style={{ textAlign: 'right', paddingRight: '20px' }}>
                            Authorised Signatory
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default TollInvoiceBillFormat
