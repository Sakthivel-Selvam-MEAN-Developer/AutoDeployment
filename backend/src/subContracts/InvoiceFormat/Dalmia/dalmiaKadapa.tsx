import './style.css'
import React, { FC } from 'react'
import DalmiaAnnexure from './dalmiaAnnexure.tsx'
import { toWords } from '../numberToWords.ts'
import { financialYear } from '../financialYear.ts'
import { epochToMinimalDate } from '../epochToNormal.ts'
import { InvoiceProp, totalProps } from '../type.tsx'
import { findBillingDetails } from '../customInvoiceAddress.ts'
interface dalmiaProps {
    trip: InvoiceProp['trips']
    bill: { billNo: string; date: number }
    total: totalProps
}
interface billingType {
    address: string
    gstNumber: string
}
const billing = (BillingDetails: billingType | null) => {
    if (BillingDetails === null) return
    return (
        <>
            <tr className="border">
                <td className="border" colSpan={6}>
                    Name : M/s. Dalmia Cement(Bharat) Limited
                </td>
            </tr>
            <tr className="border">
                <td className="border" colSpan={6}>
                    Address : {BillingDetails.address}
                </td>
            </tr>
            <tr className="border">
                <td colSpan={6} className="border">
                    GSTIN : {BillingDetails.gstNumber}
                </td>
            </tr>
        </>
    )
}
const DalmiaKadappaInvoice: FC<dalmiaProps> = ({ trip, bill, total }) => {
    const BillingDetails = findBillingDetails(trip)
    return (
        <>
            <section id="invoice">
                <style
                    dangerouslySetInnerHTML={{
                        __html: "\n.dalmia_kadappa_main,\n.dalmia_annexure_main,\n.dalmia_dalmiapuram_main {\n margin:'20px',    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode',\n        Geneva, Verdana, sans-serif;\n    color: black;\n}\n\n.dalmia_annexure_main table,\n.dalmia_annexure_main th,\n.dalmia_annexure_main td,\n.dalmia_dalmiapuram_main table,\n.dalmia_dalmiapuram_main th,\n.dalmia_dalmiapuram_main td,\n.dalmia_kadappa_main table,\n.dalmia_kadappa_main th,\n.dalmia_kadappa_main td {\n    border: 2px solid black;\n    border-collapse: collapse;\n}\n\n#dalmia_dalmiapuram_section,\n#dalmia_kadappa_section,\n#dalmia_annexure_section {\n    padding: 100px 50px !important;\n}\n\n.dalmia-head > * {\n    flex: 1;\n}\n\n.df {\n    display: flex;\n}\n\n.border {\n    border: none !important;\n    border-left: 2px solid black !important;\n    border-right: 2px solid black !important;\n}\n\n.border-top {\n    border: none !important;\n    border-left: 2px solid black !important;\n    border-right: 2px solid black !important;\n    border-top: 2px solid black !important;\n}\n\n.border-bottom {\n    border: none !important;\n    border-left: 2px solid black !important;\n    border-right: 2px solid black !important;\n    border-bottom: 2px solid black !important;\n}\n\n.dalmia_annexure_main .bg,\n.dalmia_kadappa_main .bg,\n.dalmia_dalmiapuram_main .bg {\n    background-color: #bfbfbf;\n}\n\n.p-15 {\n    padding: 15px 0 !important;\n}\n.tc {\n    text-align: center;\n}\n\n.tr {\n    text-align: right;\n}\n\ntd,\nth {\n    padding: 3px;\n}\n\n.tc {\n    text-align: center;\n}\n\n.tl {\n    text-align: left;\n}\n\n.tr {\n    text-align: right;\n}\n\n"
                    }}
                />
                <main className="dalmia_kadappa_main" style={{ padding: '20px', margin: '20px' }}>
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
                                <td>{bill.billNo}</td>
                            </tr>
                            <tr>
                                <td>State :</td>
                                <td>Tamil Nadu</td>
                                <td>State Code</td>
                                <td>33</td>
                                <td>Date</td>
                                <td>{epochToMinimalDate(bill.date)}</td>
                            </tr>
                            <tr className="border">
                                <td className="border" colSpan={6}>
                                    Details of Receiver/ Billed to:
                                </td>
                            </tr>
                            {trip.stockPointToUnloadingPointTrip?.length === 0 &&
                                billing(BillingDetails)}
                            {trip.stockPointToUnloadingPointTrip &&
                                trip.stockPointToUnloadingPointTrip.length > 0 &&
                                billing(BillingDetails)}
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
                                <td className="border tc">{total.totalFilledLoad.toFixed(2)}</td>
                                <td className="border tc">As Per Annexure</td>
                                <td className="border tr">{total.totalAmount.toFixed(2)}</td>
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
                                <td className="border tc">(Detailed As per Annexure Enclosed)</td>
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
                                            total.totalAmount * (6 / 100) * 2 + total.totalAmount
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
                                    Certified that the particulars given above are true and correct.
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
                                            total.totalAmount * (6 / 100) * 2 + total.totalAmount
                                        ) -
                                        (total.totalAmount * (6 / 100) * 2 + total.totalAmount)
                                    ).toFixed(2)}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={3}>Total Amount After Tax</td>
                                <td className="tr">
                                    {Math.round(
                                        total.totalAmount * (6 / 100) * 2 + total.totalAmount
                                    ).toFixed(2)}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={6}>
                                    We have taken registration under the CGST Act,2017 and have
                                    exercised the option to pay tax on services of GTA in relation
                                    to transport of Goods supplied by us during the financial year{' '}
                                    {financialYear}
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
            <DalmiaAnnexure trip={trip} bill={bill} total={total} />
        </>
    )
}

export default DalmiaKadappaInvoice
