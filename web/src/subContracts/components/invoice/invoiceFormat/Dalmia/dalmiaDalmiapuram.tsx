import './style.css'
import signature from '../signature.png'
import { FC, useEffect, useState } from 'react'
import { InvoiceProp } from '../../interface'
import { getInvoiceDetails } from '../../../../services/invoice'
import { InvoiceProps } from '../UltraTech/ultraTech-APCW'
import calculateTotals from '../calculateTotal'
import { epochToMinimalDate } from '../../../../../commonUtils/epochToTime'
import dayjs from 'dayjs'
import { financialYear } from '../financialYear'
import Dalmia_Annexure from './dalmiaAnnexure'
import { toWords } from '../numberToWords'
import { Box, CircularProgress } from '@mui/material'

const DalmiaDalmiapuramInvoice: FC<InvoiceProps> = ({
    tripId,
    lastBillNumber,
    setLoading,
    loading
}) => {
    const [total, setTotal] = useState({
        totalAmount: 0,
        totalFilledLoad: 0,
        numberOfTrips: 0,
        fromDate: 0,
        endDate: 0,
        shortageQuantity: 0
    })
    const [trip, setTrip] = useState<InvoiceProp>({} as InvoiceProp)

    useEffect(() => {
        getInvoiceDetails(tripId)
            .then(setTrip)
            .then(() => setLoading(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        if (trip !== null) setTotal(calculateTotals(trip))
    }, [trip])
    return (
        <>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <section id="dalmia_dalmiapuram_section">
                        <main className="dalmia_dalmiapuram_main">
                            <table className="border-top" style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <th colSpan={5} className="bg" style={{ padding: '10px' }}>
                                            TAX INVOICE
                                        </th>
                                    </tr>
                                    <tr>
                                        <td>PAN No</td>
                                        <td>ABBFM2821M</td>
                                        <td colSpan={2}>Phone/Cell No</td>
                                        <td>8220018402</td>
                                    </tr>
                                    <tr>
                                        <td>GST No</td>
                                        <td>33ABBFM2821M2ZD</td>
                                        <td colSpan={2}>E Mail ID</td>
                                        <td>magnumlogistics.erd@gmail.com</td>
                                    </tr>
                                    <tr>
                                        <td>PF Code</td>
                                        <td>Nil</td>
                                        <td colSpan={2}>Bill No</td>
                                        <td>{lastBillNumber}</td>
                                    </tr>
                                    <tr>
                                        <td>ESI Code</td>
                                        <td>Nil</td>
                                        <td colSpan={2}>Bill Date</td>
                                        <td>{dayjs().format('DD/MM/YYYY')}</td>
                                    </tr>
                                    <tr>
                                        <td>Vendor Code</td>
                                        <td>1190781803</td>
                                        <td colSpan={2}>Running / Final</td>
                                        <td>{financialYear}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2} rowSpan={5}>
                                            To <br />
                                            The Authorised Officer <br />
                                            DALMIA CEMENT (BHARAT) LTD
                                            <br />
                                            Dalmiapuram - 621651
                                            <br />
                                            GST No 33AADCA9414C1Z6
                                        </td>
                                        <td colSpan={2}>PO/WO No Date</td>
                                        <td />
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>Cost Centre / Asset Code</td>
                                    </tr>
                                    <tr>
                                        <td rowSpan={2}>Billing Period</td>
                                        <td>From</td>
                                        <td>{epochToMinimalDate(total.fromDate)}</td>
                                    </tr>
                                    <tr>
                                        <td>To</td>
                                        <td>{epochToMinimalDate(total.endDate)}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>Entry Sheet No. &amp; Date</td>
                                        <td />
                                    </tr>
                                    <tr>
                                        <td>Nature Of Work:</td>
                                        <td colSpan={4}>
                                            Cement Transportation Logistics work carried out in DPM
                                            to variours dist
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>HSN/SAC CODE: 996791</td>
                                        <td>Service description :</td>
                                        <td colSpan={3}>
                                            Goods Transports Agency Serivice For Road Transport
                                        </td>
                                    </tr>
                                    <tr className="border-top">
                                        <td colSpan={5} className="border-top">
                                            Dear Sir,
                                            <br />
                                            <p>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Kindly
                                                process this invoice raised by our establishment,
                                                namely MAGNUM LOGISTICS for the service rendered to
                                                your organisation as required under the terms of WO/
                                                Agreement and settle the bill amount.
                                            </p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="table2" style={{ width: '100%' }}>
                                <tbody>
                                    <tr style={{ textAlign: 'center' }} className="bg">
                                        <th style={{ padding: '10px' }}>GST No</th>
                                        <th style={{ padding: '10px' }}>Description</th>
                                        <th style={{ padding: '10px' }}>UM</th>
                                        <th style={{ padding: '10px' }}>QTY</th>
                                        <th style={{ padding: '10px' }}>Rate</th>
                                        <th style={{ padding: '10px' }}>Amount(Rs)</th>
                                    </tr>
                                    <tr className="border">
                                        <td className="border" />
                                        <td className="border tc">As Per Annexure</td>
                                        <td className="border" />
                                        <td className="border tc">{total.totalFilledLoad}</td>
                                        <td className="border tc">As Per Annexure</td>
                                        <td className="border tr">{total.totalAmount}</td>
                                    </tr>
                                    <tr className="border">
                                        <td className="border" />
                                        <td className="border" />
                                        <td className="border" />
                                        <td className="border" />
                                        <td className="border" />
                                        <td className="border tr">-</td>
                                    </tr>
                                    <tr className="border">
                                        <td className="border" />
                                        <td className="border" />
                                        <td className="border" />
                                        <td className="border" />
                                        <td className="border" />
                                        <td className="border tr">-</td>
                                    </tr>
                                    <tr className="border">
                                        <td className="border" />
                                        <td className="border" />
                                        <td className="border" />
                                        <td className="border" />
                                        <td className="border" />
                                        <td className="border tr">-</td>
                                    </tr>
                                    <tr className="border">
                                        <td className="border" />
                                        <td>Taxable Value</td>
                                        <td />
                                        <td className="tc">{total.totalFilledLoad}</td>
                                        <td />
                                        <td className=" tr">{total.totalAmount}</td>
                                    </tr>
                                    <tr className="border">
                                        <td className="border" />
                                        <td className="border">Total Value Of Service</td>
                                        <td className="border" />
                                        <td className="border" />
                                        <td className="border" />
                                        <td className="border" />
                                    </tr>
                                    <tr className="border">
                                        <td className="border" />
                                        <td className="border">Add : GST Amount</td>
                                        <td className="border" />
                                        <td className="border" />
                                        <td className="border" />
                                        <td className="border" />
                                    </tr>
                                    <tr className="border" style={{ paddingTop: '10px' }}>
                                        <td className="border" />
                                        <td className="border tc">CGST@6%</td>
                                        <td className="border" />
                                        <td className="border" />
                                        <td className="border" />
                                        <td className="border tr">
                                            {' '}
                                            {(total.totalAmount * (6 / 100)).toFixed(2)}
                                        </td>
                                    </tr>
                                    <tr className="border">
                                        <td className="border" />
                                        <td className="border tc">SGST@6%</td>
                                        <td className="border" />
                                        <td className="border" />
                                        <td className="border" />
                                        <td className="border tr">
                                            {' '}
                                            {(total.totalAmount * (6 / 100)).toFixed(2)}
                                        </td>
                                    </tr>
                                    <tr className="border">
                                        <td className="border" />
                                        <td className="border tc">IGST 12%</td>
                                        <td className="border" />
                                        <td className="border" />
                                        <td className="border" />
                                        <td className="border tr">
                                            {' '}
                                            {(total.totalAmount * (6 / 100) * 2).toFixed(2)}
                                        </td>
                                    </tr>
                                    <tr className="border">
                                        <td className="border" />
                                        <td className="border tc">Round Off</td>
                                        <td className="border" />
                                        <td className="border" />
                                        <td className="border" />
                                        <td className="border tr">
                                            {(
                                                Math.round(
                                                    total.totalAmount * (6 / 100) * 2 +
                                                        total.totalAmount
                                                ) -
                                                (total.totalAmount * (6 / 100) * 2 +
                                                    total.totalAmount)
                                            ).toFixed(2)}
                                        </td>
                                    </tr>
                                    <tr style={{ textAlign: 'right' }} className="bg">
                                        <td colSpan={4} style={{ padding: '10px' }}>
                                            TOTAL Value Of Invoice
                                        </td>
                                        <td style={{ padding: '10px' }} />
                                        <td style={{ padding: '10px 5px' }}>
                                            {Math.round(
                                                total.totalAmount * (6 / 100) * 2 +
                                                    total.totalAmount
                                            ).toFixed(2)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style={{ width: '100%' }} className="border-bottom">
                                <tbody>
                                    <tr className="border-bottom">
                                        <td style={{ padding: '10px' }} className="border-bottom">
                                            Total invoice Amount in Words :
                                        </td>
                                        <td
                                            style={{ padding: '10px' }}
                                            className="border-bottom"
                                            colSpan={2}
                                        >
                                            {toWords.convert(
                                                Math.round(
                                                    total.totalAmount * (6 / 100) * 2 +
                                                        total.totalAmount
                                                ),
                                                {
                                                    currency: true
                                                }
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '10px' }} colSpan={2}>
                                            GST Payable Under Reverse Charges (No) :
                                        </td>
                                        <td style={{ padding: '10px' }}>
                                            Certified that the particulars given above are true and
                                            Correct
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '10px' }} colSpan={3}>
                                            We have taken registration under the CGST Act,2017 and
                                            have exercised the option to pay tax on services of GTA
                                            in relation to transport of Goods supplied by us during
                                            the financial year {financialYear}
                                            &nbsp;under the forward charge: Yes
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style={{ width: '100%' }} className="border-bottom">
                                <tbody>
                                    <tr className="border-bottom">
                                        <th
                                            className="border-bottom tc"
                                            style={{ padding: '10px' }}
                                        >
                                            Bank Details:
                                        </th>
                                        <th className="border-bottom">For Magnum Logistics</th>
                                    </tr>
                                    <tr className="border-top">
                                        <td className="border-top">
                                            Bank Name: Indian Overseas Bank <br />
                                            ACCount Name: MAGNUM LOGISTICS <br />
                                            A/C No: 159433000055555
                                            <br />
                                            Branch : Kollampalayam
                                            <br />
                                        </td>
                                        <td className="tc">
                                            <img src={signature} alt="signature" />
                                        </td>
                                    </tr>
                                    <tr className="border">
                                        <td className="border">IFSC code : IOBA0001594</td>
                                        <td style={{ textAlign: 'center' }}>
                                            Authorised Signatory
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </main>
                    </section>
                    <hr style={{ margin: '0 20px' }} />
                    <Dalmia_Annexure
                        tripDetails={trip}
                        lastBillNumber={lastBillNumber}
                        total={total}
                    />
                </>
            )}
        </>
    )
}

export default DalmiaDalmiapuramInvoice
