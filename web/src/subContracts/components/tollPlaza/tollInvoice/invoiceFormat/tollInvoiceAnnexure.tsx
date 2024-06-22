import { epochToMinimalDate } from '../../../../../commonUtils/epochToTime'
import { toWords } from '../../../invoice/invoiceFormat/numberToWords'
import { props } from '../alignTripDetails'
import TripAmountCalculation from '../tollAmountCalculations'

const TollInvoiceForUntraTech = ({ trips }: { trips: props['trip'] }) => {
    const { filledLoad, tollTotal, tripDetails, totalAmount } = TripAmountCalculation(trips)
    return (
        <div id="toll-invoice-format" className="toll-invoice-format">
            <table>
                <tbody>
                    <tr>
                        <td colSpan={36}>
                            <h1 style={{ textAlign: 'center' }}>MAGNUM LOGISTICS</h1>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={36}>
                            <h4 style={{ textAlign: 'center' }}>
                                Erode(Dt), Tamilnadu-638 002, Ph: 9791791402
                            </h4>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={36}>
                            <h4 style={{ textAlign: 'center' }}>
                                Email Id : magnumlogistics.erd@gmail.com
                            </h4>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={36}>
                            <h4 style={{ textAlign: 'center' }}>
                                AUTHORISED TRANSPORTER OF ULTRATECH CEMENT LTD, ANDHRA PRADESH
                                CEMENT WORKS
                            </h4>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={36}>
                            <h4 style={{ textAlign: 'center' }}>
                                TRANSPORTATION TOLL BILL : for CEMENT ( HSN of Service :- ) 8704
                            </h4>
                        </td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td colSpan={36}>
                            <h4>Vendor Code :- 2406621</h4>
                        </td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td colSpan={26}>
                            <h4>Whether Tax Payable under Revesre Charge : &quot;NO&quot;</h4>
                        </td>
                        <td colSpan={10}>
                            <h4>Bill No :- MGL24A-15 </h4>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={26}>
                            <h4>Person Laible to Pay GST</h4>
                        </td>
                        <td colSpan={10}>
                            <h4>Date :- 4/16/24</h4>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={26}>
                            <h4>UltraTech Cement Limited</h4>
                        </td>
                        <td colSpan={10}>
                            <h4>PAN No :- ABBFM2821M</h4>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={26}>
                            <h4>Bhogasamudram, Tadipatri Mandal, Anantapur District,</h4>
                        </td>
                        <td colSpan={10}>
                            <h4>GST No :- 33ABBFM2821M2ZD</h4>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={26}>
                            <h4>Andhra Pradesh - 515415</h4>
                        </td>
                        <td colSpan={10}>
                            <h4>Status :- Company</h4>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={26}>
                            <h4>PAN :- AAACL6442L</h4>
                        </td>
                        <td colSpan={10}>
                            <h4>SAC :- 996791</h4>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={26}>
                            <h4>
                                Name of Consigner - UltraTech Cement Limited - Andhra Pradesh Cement
                                Works
                            </h4>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={26}>
                            <h4>Place of Origin :- ANDHRA PRADESH</h4>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={26}>
                            <h4>
                                Place of Supply &amp state (In case of inter state Service otherwise
                                N/A) :-- KA/TS/TN/AP
                            </h4>
                        </td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr className="table-head">
                        <td>
                            <small>S.No</small>
                        </td>
                        <td>
                            <small>DI Number</small>
                        </td>
                        <td>
                            <small>DI Creation Date</small>
                        </td>
                        <td>
                            <small>Sold-to-Party Name</small>
                        </td>
                        <td>
                            <small>City Code Description</small>
                        </td>
                        <td>
                            <small>Truck No.</small>
                        </td>
                        <td>
                            <small>LR No.</small>
                        </td>
                        <td>
                            <small>INV QTY</small>
                        </td>
                        <td>
                            <small>Marur Toll AP</small>
                        </td>
                        <td>
                            <small>Bagepalli Toll KA</small>
                        </td>
                        <td>
                            <small>Nalluru Devanahalli Toll KA</small>
                        </td>
                        <td>
                            <small>Hoskote & Electronic City KAToll Plaza</small>
                        </td>
                        <td>
                            <small>Bandapalli Plaza AP</small>
                        </td>
                        <td>
                            <small>Yerradoddi Toll plaza AP</small>
                        </td>
                        <td>
                            <small>Bandlapalli Toll Plaza AP</small>
                        </td>
                        <td>
                            <small>Danamaiahgaaripalli Toll Plaza AP</small>
                        </td>
                        <td>
                            <small>Durgamvripalli Toll AP</small>
                        </td>
                        <td>
                            <small>Attibele Toll Plaza KA</small>
                        </td>
                        <td>
                            <small>Thennepalli Toll AP</small>
                        </td>
                        <td>
                            <small>Vallam Toll plaza</small>
                        </td>
                        <td>
                            <small>Enamkariyandal toll</small>
                        </td>
                        <td>
                            <small>Pallikonda / Mahasamudram Toll Plaza TN</small>
                        </td>
                        <td>
                            <small>Vaniyambadi Toll Plaza TN</small>
                        </td>
                        <td>
                            <small>Krishnagiri Toll Plaza (TN)</small>
                        </td>
                        <td>
                            <small>L&T Krishnagiri Thopur Toll (TN)</small>
                        </td>
                        <td>
                            <small>Omalur Toll Plaza (TN)</small>
                        </td>
                        <td>
                            <small>Vaiguntham Toll Plaza (TN)</small>
                        </td>
                        <td>
                            <small>Vijayamangalam Toll Plaza (TN)</small>
                        </td>
                        <td>
                            <small>Chengapaly Toll Plaza (TN)</small>
                        </td>
                        <td>
                            <small>Neelambur Toll Plaza (TN)</small>
                        </td>
                        <td>
                            <small>Trichy Cochin Toll Plaza (TN)</small>
                        </td>
                        <td>
                            <small>Pampam Pallam Toll Plaza (KL TOLL)</small>
                        </td>
                        <td>
                            <small>Paniyankara (KL TOLL)</small>
                        </td>
                        <td>
                            <small>Paliyekkarera Toll Plaza (KL TOLL)</small>
                        </td>
                        <td>
                            <small>Kumbalam Toll Plaza KL</small>
                        </td>
                        <td>
                            <small>Total Toll Amount</small>
                        </td>
                    </tr>
                    {tripDetails.map((trip, index) => (
                        <tr className="table-body" key={trip.id}>
                            <td>
                                <small>{index + 1}</small>
                            </td>
                            <td>
                                <small>{trip.trip.invoiceNumber}</small>
                            </td>
                            <td>
                                <small>{epochToMinimalDate(trip.trip.startDate)}</small>
                            </td>
                            <td>
                                <small>{trip.trip.partyName}</small>
                            </td>
                            <td>
                                <small>COIMBATORE-RMC_6464-6409</small>
                            </td>
                            <td>
                                <small>{trip.trip.truck.vehicleNumber}</small>
                            </td>
                            <td>
                                <small>{trip.trip.lrNumber}</small>
                            </td>
                            <td>
                                <small>{trip.trip.filledLoad}</small>
                            </td>
                            <td>
                                <small>
                                    {(trip.tollDetails &&
                                        trip.tollDetails[
                                            `${'Marur Toll AP'.toLocaleLowerCase()}`
                                        ]) ||
                                        '-'}
                                </small>
                            </td>
                            <td>
                                <small>
                                    {(trip.tollDetails &&
                                        trip.tollDetails[
                                            `${'Bagepalli Toll KA'.toLocaleLowerCase()}`
                                        ]) ||
                                        '-'}
                                </small>
                            </td>
                            <td>
                                <small>
                                    {(trip.tollDetails &&
                                        trip.tollDetails[
                                            `${'Nalluru Devanahalli Toll KA'.toLocaleLowerCase()}`
                                        ]) ||
                                        '-'}
                                </small>
                            </td>
                            <td>
                                <small>
                                    {(trip.tollDetails &&
                                        trip.tollDetails[
                                            `${'Hoskote & Electronic City KAToll Plaza'.toLocaleLowerCase()}`
                                        ]) ||
                                        '-'}
                                </small>
                            </td>
                            <td>
                                <small>
                                    {(trip.tollDetails &&
                                        trip.tollDetails[
                                            `${'Bandapalli Plaza AP'.toLocaleLowerCase()}`
                                        ]) ||
                                        '-'}
                                </small>
                            </td>
                            <td>
                                <small>
                                    {(trip.tollDetails &&
                                        trip.tollDetails[
                                            `${'Yerradoddi Toll plaza AP'.toLocaleLowerCase()}`
                                        ]) ||
                                        '-'}
                                </small>
                            </td>
                            <td>
                                <small>
                                    {(trip.tollDetails &&
                                        trip.tollDetails[
                                            `${'Bandlapalli Toll Plaza AP'.toLocaleLowerCase()}`
                                        ]) ||
                                        '-'}
                                </small>
                            </td>
                            <td>
                                <small>
                                    {(trip.tollDetails &&
                                        trip.tollDetails[
                                            `${'Danamaiahgaaripalli Toll Plaza AP'.toLocaleLowerCase()}`
                                        ]) ||
                                        '-'}
                                </small>
                            </td>
                            <td>
                                <small>
                                    {(trip.tollDetails &&
                                        trip.tollDetails[
                                            `${'Durgamvripalli Toll AP'.toLocaleLowerCase()}`
                                        ]) ||
                                        '-'}
                                </small>
                            </td>
                            <td>
                                <small>
                                    {(trip.tollDetails &&
                                        trip.tollDetails[
                                            `${'Attibele Toll Plaza KA'.toLocaleLowerCase()}`
                                        ]) ||
                                        '-'}
                                </small>
                            </td>
                            <td>
                                <small>
                                    {(trip.tollDetails &&
                                        trip.tollDetails[
                                            `${'Thennepalli Toll AP'.toLocaleLowerCase()}`
                                        ]) ||
                                        '-'}
                                </small>
                            </td>
                            <td>
                                <small>
                                    {(trip.tollDetails &&
                                        trip.tollDetails[
                                            `${'Vallam Toll Plaza'.toLocaleLowerCase()}`
                                        ]) ||
                                        '-'}
                                </small>
                            </td>
                            <td>
                                <small>
                                    {(trip.tollDetails &&
                                        trip.tollDetails[
                                            `${'Enamkariyandal Toll'.toLocaleLowerCase()}`
                                        ]) ||
                                        '-'}
                                </small>
                            </td>
                            <td>
                                <small>
                                    {(trip.tollDetails &&
                                        trip.tollDetails[
                                            `${'Pallikonda / Mahasamudram Toll Plaza TN'.toLocaleLowerCase()}`
                                        ]) ||
                                        '-'}
                                </small>
                            </td>
                            <td>
                                <small>
                                    {(trip.tollDetails &&
                                        trip.tollDetails[
                                            `${'Vaniyambadi Toll Plaza TN'.toLocaleLowerCase()}`
                                        ]) ||
                                        '-'}
                                </small>
                            </td>
                            <td>
                                <small>
                                    {(trip.tollDetails &&
                                        trip.tollDetails[
                                            `${'Krishnagiri Toll Plaza TN'.toLocaleLowerCase()}`
                                        ]) ||
                                        '-'}
                                </small>
                            </td>
                            <td>
                                <small>
                                    {(trip.tollDetails &&
                                        trip.tollDetails[
                                            `${'L&T Krishnagiri Thopur Toll (TN)'.toLocaleLowerCase()}`
                                        ]) ||
                                        '-'}
                                </small>
                            </td>
                            <td>
                                <small>
                                    {(trip.tollDetails &&
                                        trip.tollDetails[
                                            `${'Omalur Toll Plaza (TN)'.toLocaleLowerCase()}`
                                        ]) ||
                                        '-'}
                                </small>
                            </td>
                            <td>
                                <small>
                                    {(trip.tollDetails &&
                                        trip.tollDetails[
                                            `${'Vaiguntham Toll Plaza (TN)'.toLocaleLowerCase()}`
                                        ]) ||
                                        '-'}
                                </small>
                            </td>
                            <td>
                                <small>
                                    {(trip.tollDetails &&
                                        trip.tollDetails[
                                            `${'Vijayamangalam Toll Plaza (TN)'.toLocaleLowerCase()}`
                                        ]) ||
                                        '-'}
                                </small>
                            </td>
                            <td>
                                <small>
                                    {(trip.tollDetails &&
                                        trip.tollDetails[
                                            `${'Chengapaly Toll Plaza (TN)'.toLocaleLowerCase()}`
                                        ]) ||
                                        '-'}
                                </small>
                            </td>
                            <td>
                                <small>
                                    {(trip.tollDetails &&
                                        trip.tollDetails[
                                            `${'Neelambur Toll Plaza (TN)'.toLocaleLowerCase()}`
                                        ]) ||
                                        '-'}
                                </small>
                            </td>
                            <td>
                                <small>
                                    {(trip.tollDetails &&
                                        trip.tollDetails[
                                            `${'Trichy Cochin Toll Plaza (TN)'.toLocaleLowerCase()}`
                                        ]) ||
                                        '-'}
                                </small>
                            </td>
                            <td>
                                <small>
                                    {(trip.tollDetails &&
                                        trip.tollDetails[
                                            `${'Pampam Pallam Toll Plaza (KL TOLL)'.toLocaleLowerCase()}`
                                        ]) ||
                                        '-'}
                                </small>
                            </td>
                            <td>
                                <small>
                                    {(trip.tollDetails &&
                                        trip.tollDetails[
                                            `${'Paniyankara (KL TOLL)'.toLocaleLowerCase()}`
                                        ]) ||
                                        '-'}
                                </small>
                            </td>
                            <td>
                                <small>
                                    {(trip.tollDetails &&
                                        trip.tollDetails[
                                            `${'Paliyekkarera Toll Plaza (KL TOLL)'.toLocaleLowerCase()}`
                                        ]) ||
                                        '-'}
                                </small>
                            </td>
                            <td>
                                <small>
                                    {(trip.tollDetails &&
                                        trip.tollDetails[
                                            `${'Kumbalam Toll Plaza KL'.toLocaleLowerCase()}`
                                        ]) ||
                                        '-'}
                                </small>
                            </td>
                            <td>
                                <small>
                                    {trip.tollDetails &&
                                        Object.values(trip.tollDetails).reduce(
                                            (acc, current) => acc + current,
                                            0
                                        )}
                                </small>
                            </td>
                        </tr>
                    ))}
                    <tr className="total">
                        <td colSpan={7} style={{ textAlign: 'center' }}>
                            <h4>Total</h4>
                        </td>
                        {tollTotal && (
                            <>
                                <td>
                                    <small>{filledLoad}</small>
                                </td>
                                <td>
                                    <small>
                                        {tollTotal[`${'Marur Toll AP'.toLocaleLowerCase()}`] || '-'}
                                    </small>
                                </td>
                                <td>
                                    <small>
                                        {tollTotal[`${'Bagepalli Toll KA'.toLocaleLowerCase()}`] ||
                                            '-'}
                                    </small>
                                </td>
                                <td>
                                    <small>
                                        {tollTotal[
                                            `${'Nalluru Devanahalli Toll KA'.toLocaleLowerCase()}`
                                        ] || '-'}
                                    </small>
                                </td>
                                <td>
                                    <small>
                                        {tollTotal[
                                            `${'Hoskote & Electronic City KAToll Plaza'.toLocaleLowerCase()}`
                                        ] || '-'}
                                    </small>
                                </td>
                                <td>
                                    <small>
                                        {tollTotal[
                                            `${'Bandapalli Plaza AP'.toLocaleLowerCase()}`
                                        ] || '-'}
                                    </small>
                                </td>
                                <td>
                                    <small>
                                        {tollTotal[
                                            `${'Yerradoddi Toll plaza AP'.toLocaleLowerCase()}`
                                        ] || '-'}
                                    </small>
                                </td>
                                <td>
                                    <small>
                                        {tollTotal[
                                            `${'Bandlapalli Toll Plaza AP'.toLocaleLowerCase()}`
                                        ] || '-'}
                                    </small>
                                </td>
                                <td>
                                    <small>
                                        {tollTotal[
                                            `${'Danamaiahgaaripalli Toll Plaza AP'.toLocaleLowerCase()}`
                                        ] || '-'}
                                    </small>
                                </td>
                                <td>
                                    <small>
                                        {tollTotal[
                                            `${'Durgamvripalli Toll AP'.toLocaleLowerCase()}`
                                        ] || '-'}
                                    </small>
                                </td>
                                <td>
                                    <small>
                                        {tollTotal[
                                            `${'Attibele Toll Plaza KA'.toLocaleLowerCase()}`
                                        ] || '-'}
                                    </small>
                                </td>
                                <td>
                                    <small>
                                        {tollTotal[
                                            `${'Thennepalli Toll AP'.toLocaleLowerCase()}`
                                        ] || '-'}
                                    </small>
                                </td>
                                <td>
                                    <small>
                                        {tollTotal[`${'Vallam Toll Plaza'.toLocaleLowerCase()}`] ||
                                            '-'}
                                    </small>
                                </td>
                                <td>
                                    <small>
                                        {tollTotal[
                                            `${'Enamkariyandal Toll'.toLocaleLowerCase()}`
                                        ] || '-'}
                                    </small>
                                </td>
                                <td>
                                    <small>
                                        {tollTotal[
                                            `${'Pallikonda / Mahasamudram Toll Plaza TN'.toLocaleLowerCase()}`
                                        ] || '-'}
                                    </small>
                                </td>
                                <td>
                                    <small>
                                        {tollTotal[
                                            `${'Vaniyambadi Toll Plaza TN'.toLocaleLowerCase()}`
                                        ] || '-'}
                                    </small>
                                </td>
                                <td>
                                    <small>
                                        {tollTotal[
                                            `${'Krishnagiri Toll Plaza TN'.toLocaleLowerCase()}`
                                        ] || '-'}
                                    </small>
                                </td>
                                <td>
                                    <small>
                                        {tollTotal[
                                            `${'L&T Krishnagiri Thopur Toll (TN)'.toLocaleLowerCase()}`
                                        ] || '-'}
                                    </small>
                                </td>
                                <td>
                                    <small>
                                        {tollTotal[
                                            `${'Omalur Toll Plaza (TN)'.toLocaleLowerCase()}`
                                        ] || '-'}
                                    </small>
                                </td>
                                <td>
                                    <small>
                                        {tollTotal[
                                            `${'Vaiguntham Toll Plaza (TN)'.toLocaleLowerCase()}`
                                        ] || '-'}
                                    </small>
                                </td>
                                <td>
                                    <small>
                                        {tollTotal[
                                            `${'Vijayamangalam Toll Plaza (TN)'.toLocaleLowerCase()}`
                                        ] || '-'}
                                    </small>
                                </td>
                                <td>
                                    <small>
                                        {tollTotal[
                                            `${'Chengapaly Toll Plaza (TN)'.toLocaleLowerCase()}`
                                        ] || '-'}
                                    </small>
                                </td>
                                <td>
                                    <small>
                                        {tollTotal[
                                            `${'Neelambur Toll Plaza (TN)'.toLocaleLowerCase()}`
                                        ] || '-'}
                                    </small>
                                </td>
                                <td>
                                    <small>
                                        {tollTotal[
                                            `${'Trichy Cochin Toll Plaza (TN)'.toLocaleLowerCase()}`
                                        ] || '-'}
                                    </small>
                                </td>
                                <td>
                                    <small>
                                        {tollTotal[
                                            `${'Pampam Pallam Toll Plaza (KL TOLL)'.toLocaleLowerCase()}`
                                        ] || '-'}
                                    </small>
                                </td>
                                <td>
                                    <small>
                                        {tollTotal[
                                            `${'Paniyankara (KL TOLL)'.toLocaleLowerCase()}`
                                        ] || '-'}
                                    </small>
                                </td>
                                <td>
                                    <small>
                                        {tollTotal[
                                            `${'Paliyekkarera Toll Plaza (KL TOLL)'.toLocaleLowerCase()}`
                                        ] || '-'}
                                    </small>
                                </td>
                                <td>
                                    <small>
                                        {tollTotal[
                                            `${'Kumbalam Toll Plaza KL'.toLocaleLowerCase()}`
                                        ] || '-'}
                                    </small>
                                </td>
                            </>
                        )}
                        <td>
                            <small>{totalAmount.toFixed(2)}</small>
                        </td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td colSpan={4} />
                        <td
                            colSpan={4}
                            style={{ textAlign: 'center', padding: '8px', border: '1px solid' }}
                        >
                            <h4>Toll Amount</h4>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4} />
                        <td colSpan={3} style={{ padding: '5px', border: '1px solid' }}>
                            <h4>Gross Total Amount</h4>
                        </td>
                        <td style={{ padding: '5px', textAlign: 'right', border: '1px solid' }}>
                            <h4>{totalAmount.toFixed(2)}</h4>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4} />
                        <td colSpan={3} style={{ padding: '5px', border: '1px solid' }}>
                            <h4>IGST @ 12%</h4>
                        </td>
                        <td style={{ padding: '5px', textAlign: 'right', border: '1px solid' }}>
                            <h4>{(totalAmount * (12 / 100)).toFixed(2)}</h4>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4} />
                        <td colSpan={3} style={{ padding: '5px', border: '1px solid' }}>
                            <h4>Round Off</h4>
                        </td>
                        <td style={{ padding: '5px', textAlign: 'right', border: '1px solid' }}>
                            <h4>0.00</h4>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4} />
                        <td colSpan={3} style={{ padding: '5px', border: '1px solid' }}>
                            <h4>Total Amount</h4>
                        </td>
                        <td style={{ padding: '5px', textAlign: 'right', border: '1px solid' }}>
                            <h4>{(totalAmount + totalAmount * (12 / 100)).toFixed(2)}</h4>
                        </td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td colSpan={14} style={{ textAlign: 'center' }}>
                            <h4>
                                Toll Amount In Words (Including GST) :- Rupee{' '}
                                {toWords.convert(totalAmount + totalAmount * (12 / 100), {
                                    currency: true
                                })}
                            </h4>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TollInvoiceForUntraTech
