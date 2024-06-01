import './style.css'
import { FC, useContext, useEffect, useState } from 'react'
import { InvoiceProps } from '../UltraTech/ultraTech-APCW'
import { InvoiceProp } from '../../interface'
import { getInvoiceDetails } from '../../../../services/invoice'
import calculateTotals from '../calculateTotal'
import DalmiaAnnexure from './dalmiaAnnexure'
import { Box, CircularProgress } from '@mui/material'
import { epochToMinimalDate } from '../../../../../commonUtils/epochToTime'
import { toWords } from '../numberToWords'
import { financialYear } from '../financialYear'
import { billNoContext } from '../../invoiceContext'

const DalmiaKadappaInvoice: FC<InvoiceProps> = ({ tripId, setLoading, loading }) => {
    const [total, setTotal] = useState({
        totalAmount: 0,
        totalFilledLoad: 0,
        numberOfTrips: 0,
        fromDate: 0,
        endDate: 0,
        shortageQuantity: 0
    })
    const [trip, setTrip] = useState<InvoiceProp>({} as InvoiceProp)
    const { invoiceValues } = useContext(billNoContext)
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
                    <section id="dalmia_kadappa_section">
                        <main className="dalmia_kadappa_main">
                            <table id="table1" style={{ width: '100%' }} className="border-top">
                                <tbody>
                                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                                        <th colSpan={6}>INVOICE</th>
                                    </tr>
                                    <tr>
                                        <td>GSTIN :</td>
                                        <td>33ABBFM2821M2ZD</td>
                                        <td>PAN</td>
                                        <td>ABBFM2821M</td>
                                        <td>Inv No.</td>
                                        <td>{invoiceValues.billNo}</td>
                                    </tr>
                                    <tr>
                                        <td>State :</td>
                                        <td>Tamil Nadu</td>
                                        <td>State Code</td>
                                        <td>33</td>
                                        <td>Date</td>
                                        <td>{epochToMinimalDate(invoiceValues.date)}</td>
                                    </tr>
                                    <tr className="border">
                                        <td className="border" colSpan={6}>
                                            Details of Receiver/ Billed to:
                                        </td>
                                    </tr>
                                    <tr className="border">
                                        <td className="border" colSpan={6}>
                                            Name : M/s. Dalmia Cement(Bharat) Limited
                                        </td>
                                    </tr>
                                    <tr className="border">
                                        <td className="border" colSpan={6}>
                                            Address : Chinnakomerla Village Jammalmadugu, Kadappa
                                            District, Andra Pradesh - 516434
                                        </td>
                                    </tr>
                                    <tr className="border">
                                        <td colSpan={6} className="border">
                                            GSTIN : 37AADCA9414C1ZY
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="table2" style={{ width: '100%' }}>
                                <tbody>
                                    <tr className="border tc">
                                        <td className="border tl">State : Andhra Pradesh</td>
                                        <td>State Code</td>
                                        <td>37</td>
                                        <td>PAN</td>
                                        <td colSpan={2}>AADCA9414C</td>
                                    </tr>
                                    <tr className="tc">
                                        <td className="p-15">Name of Product/Service</td>
                                        <td className="p-15">To (Place)</td>
                                        <td className="p-15">SAC</td>
                                        <td className="p-15">Qty in MT</td>
                                        <td className="p-15">Rate/MT</td>
                                        <td className="p-15">Amount</td>
                                    </tr>
                                    <tr className="border">
                                        <td className="border">Being Transport Charges</td>
                                        <td className="border" />
                                        <td className="border tc">996791</td>
                                        <td className="border" />
                                        <td className="border" />
                                        <td className="border" />
                                    </tr>
                                    <tr className="border">
                                        <td className="border">Material: Cement</td>
                                        <td className="border tc">As Per Annexure</td>
                                        <td className="border" />
                                        <td className="border tc">
                                            {total.totalFilledLoad.toFixed(2)}
                                        </td>
                                        <td className="border tc">As Per Annexure</td>
                                        <td className="border tr">
                                            {total.totalAmount.toFixed(2)}
                                        </td>
                                    </tr>
                                    <tr className="border">
                                        <td className="border">
                                            Period From : {epochToMinimalDate(total.fromDate)}
                                        </td>
                                        <td className="border" />
                                        <td className="border" />
                                        <td className="border" />
                                        <td className="border" />
                                        <td className="border" />
                                    </tr>
                                    <tr className="border">
                                        <td className="border">
                                            Period To : {epochToMinimalDate(total.endDate)}
                                        </td>
                                        <td className="border" />
                                        <td className="border" />
                                        <td className="border" />
                                        <td className="border" />
                                        <td className="border" />
                                    </tr>
                                    <tr className="border">
                                        <td className="border tc">
                                            (Detailed As per Annexure Enclosed)
                                        </td>
                                        <td className="border" />
                                        <td className="border" />
                                        <td className="border" />
                                        <td className="border" />
                                        <td className="border" />
                                    </tr>
                                    <tr>
                                        <td colSpan={2} className="tc">
                                            Total
                                        </td>
                                        <td />
                                        <td className="tc">{total.totalFilledLoad.toFixed(2)}</td>
                                        <td />
                                        <td className="tr">{total.totalAmount.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>Total Invoice Amount in Words:</td>
                                        <td colSpan={3}>Total Amount Before Tax</td>
                                        <td className="tr">{total.totalAmount.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2} rowSpan={3} className="tc">
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
                                        <td colSpan={2}>Add : CGST</td>
                                        <td />
                                        <td className="tr">-</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>Add : SGST</td>
                                        <td />
                                        <td className="tr">-</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>Add : IGST</td>
                                        <td>12.0%</td>
                                        <td className="tr">
                                            {(total.totalAmount * (12 / 100)).toFixed(2)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2} rowSpan={3} className="tc">
                                            Certified that the particulars given above are true and
                                            correct.
                                        </td>
                                        <td colSpan={3}>Tax Amount : IGST @12%</td>
                                        <td className="tr">
                                            {(total.totalAmount * (12 / 100)).toFixed(2)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3}>Round off</td>
                                        <td className="tr">
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
                                    <tr>
                                        <td colSpan={3}>Total Amount After Tax</td>
                                        <td className="tr">
                                            {Math.round(
                                                total.totalAmount * (6 / 100) * 2 +
                                                    total.totalAmount
                                            ).toFixed(2)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={6}>
                                            We have taken registration under the CGST Act,2017 and
                                            have exercised the option to pay tax on services of GTA
                                            in relation to transport of Goods supplied by us during
                                            the financial year {financialYear}
                                            &nbsp;under the forward charge.
                                        </td>
                                    </tr>
                                    <tr className="border">
                                        <td
                                            className="border"
                                            colSpan={2}
                                            style={{ textDecoration: 'underline' }}
                                        >
                                            Bank Details:
                                        </td>
                                        <td rowSpan={5} colSpan={4} className="tc"></td>
                                    </tr>
                                    <tr className="border">
                                        <td className="border" colSpan={2}>
                                            Bank Name: Indian Overseas Bank
                                        </td>
                                    </tr>
                                    <tr className="border">
                                        <td className="border" colSpan={2}>
                                            Branch : Kollampalayam
                                        </td>
                                    </tr>
                                    <tr className="border">
                                        <td className="border" colSpan={2}>
                                            A/C No: 159433000055555
                                        </td>
                                    </tr>
                                    <tr className="border">
                                        <td className="border" colSpan={2}>
                                            IFSC code : 10BA0001594
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </main>
                    </section>
                    <hr style={{ margin: '0 20px' }} />
                    <DalmiaAnnexure
                        tripDetails={trip}
                        billNo={invoiceValues.billNo}
                        total={total}
                    />
                </>
            )}
        </>
    )
}

export default DalmiaKadappaInvoice
