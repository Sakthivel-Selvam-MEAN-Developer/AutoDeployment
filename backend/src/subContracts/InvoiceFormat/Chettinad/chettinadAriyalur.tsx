import React, { FC } from 'react'
import './style.css'
import { financialYear } from '../financialYear.ts'
import { toWords } from '../numberToWords.ts'
import ChettinadAriyalurAnnexure from './chettinadAriyalurAnnexure.tsx'
import { epochToMinimalDate } from '../epochToNormal.ts'
import { InvoiceProp } from '../type.tsx'

interface totalProps {
    totalAmount: number
    totalFilledLoad: number
    numberOfTrips: number
    fromDate: number
    endDate: number
    shortageQuantity: number
}

interface invoiceProps {
    trip: InvoiceProp['trips']
    bill: { billNo: string; date: number }
    total: totalProps
    depot?: string
}

const ChettinadAriyalur: FC<invoiceProps> = ({ trip, bill, total, depot }) => (
    <>
        <section id="invoice" className="chettinad-ariyalur-section" style={{ padding: '20px' }}>
            <style
                dangerouslySetInnerHTML={{
                    __html: "\n.chettinad-ariyalur-section * {\nmargin: 0;\ncolor: black;\npadding: 0;\nfont-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode',\n    Geneva, Verdana, sans-serif;\n }\n\n .tc {\ntext-align: center;\n }\n\n .tr {\ntext-align: right;\n }\n\n .chettinad-ariyalur-section table {\nwidth: 100%;\n }\n\n .chettinad-ariyalur-section table,\n .chettinad-ariyalur-section td,\n .chettinad-ariyalur-section tr {\nborder-collapse: collapse;\n }\n\n .p10 {\npadding: 10px;\n }\n\n .p5 {\npadding: 5px;\n }\n\n .pl5 {\npadding-left: 5px;\n }\n\n .pt5 {\npadding-top: 5px;\n }\n\n .pb10 {\npadding-bottom: 10px;\n }\n\n .pr5 {\npadding-right: 5px;\n }\n\n .bt {\nborder-top: 2px solid black;\n }\n\n .br {\nborder-right: 2px solid black;\n }\n\n .bb {\nborder-bottom: 2px solid black;\n }\n\n .bl {\nborder-left: 2px solid black;\n }\n            "
                }}
            />
            <table className="bt bl br bb">
                <tbody>
                    <tr>
                        <td colSpan={10} className="p5 br">
                            <h4>GSTIN NO : 33ABBFM2821M2ZD</h4>
                        </td>
                        <td colSpan={8} className="p5">
                            <h4>INVOICE NO : {bill.billNo}</h4>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={10} className="p5 br">
                            <p>Tax Is Payable On Reverse Charge : (Yes/No) : No</p>
                        </td>
                        <td colSpan={8} className="p5">
                            <h4>DATE : {epochToMinimalDate(bill.date)}</h4>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={10} className="p5 br">
                            <h4>Vendor Code : 3600428</h4>
                        </td>
                        <td colSpan={8} className="p5">
                            <h4>PAN No : ABBFM2821M2</h4>
                        </td>
                    </tr>
                    <tr>
                        <td
                            colSpan={10}
                            style={{ textAlign: 'center', backgroundColor: '#e2e2e2' }}
                            className="p10 bt bb bl br"
                        >
                            <h4>Details of Service Receiver(Billed to)</h4>
                        </td>
                        <td
                            colSpan={8}
                            className="bb br bt p10"
                            style={{ textAlign: 'center', backgroundColor: '#e2e2e2' }}
                        >
                            <h4>Other Details</h4>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={10} className="br p5">
                            M/s Chettinad Cement Corporation Private Ltd.
                        </td>
                        <td colSpan={4} className="p5">
                            PO Reference
                        </td>
                        <td colSpan={4} className="p5">
                            -
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={10} className="br p5">
                            Ariyalur Trichy Road, Keelapaluvur (p.o),
                        </td>
                        <td colSpan={4} className="p5">
                            PO Date
                        </td>
                        <td colSpan={4} className="p5">
                            -
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={10} className="br p5">
                            Ariyalur District - 621707
                        </td>
                        <td colSpan={4} className="p5">
                            Product Transported
                        </td>
                        <td colSpan={4} className="p5">
                            Cement
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={10} className="br p5">
                            Tamilnadu, India.
                        </td>
                        <td colSpan={4} className="p5">
                            Vessel Name
                        </td>
                        <td colSpan={4} className="p5">
                            -
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={10} className="br p5">
                            State Code : 33
                        </td>
                        <td colSpan={4} className="p5">
                            Mode of Transpot
                        </td>
                        <td colSpan={4} className="p5">
                            By Truck
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={10} className="br bb p5 pb10">
                            GSTIN Number : 33AAACC3130A1ZQ
                        </td>
                        <td colSpan={4} className="bb p5 pb10">
                            Financial Year
                        </td>
                        <td colSpan={4} className="bb p5 pb10">
                            {financialYear}
                        </td>
                    </tr>
                    <tr style={{ backgroundColor: '#e2e2e2' }}>
                        <td className="p5 tc br bb">
                            <h4>S.NO</h4>
                        </td>
                        <td className="p5 tc br bb" colSpan={3}>
                            <h4>Description of Servics</h4>
                        </td>
                        <td className="p5 tc br bb" colSpan={2}>
                            <h4>HSN/SAC</h4>
                        </td>
                        <td className="p5 tc br bb">
                            <h4>Qty</h4>
                        </td>
                        <td className="p5 tc br bb">
                            <h4>UOM</h4>
                        </td>
                        <td className="p5 tc br bb" colSpan={2}>
                            <h4>Rate</h4>
                        </td>
                        <td className="p5 tc br bb" colSpan={3}>
                            <h4>Total</h4>
                        </td>
                        <td className="p5 tc br bb" colSpan={2}>
                            <h4>Discount</h4>
                        </td>
                        <td className="p5 tc br bb" colSpan={3}>
                            <h4>Taxable value</h4>
                        </td>
                    </tr>
                    <tr>
                        <td className="p5 tc br">
                            <p>1</p>
                        </td>
                        <td className="p5 tc br" colSpan={3}>
                            <p>TRANSPORTATION CHARGES for {depot}</p>
                        </td>
                        <td className="p5 tc br" colSpan={2}>
                            <p>996791</p>
                        </td>
                        <td className="p5 tc br">
                            <p>{total.totalFilledLoad.toFixed(2)}</p>
                        </td>
                        <td className="p5 tc br">
                            <p>-</p>
                        </td>
                        <td className="p5 tc br" colSpan={2}>
                            <p>As Per Annexure</p>
                        </td>
                        <td className="p5 tc br" colSpan={3}>
                            <p>{total.totalAmount.toFixed(2)}</p>
                        </td>
                        <td className="p5 tc br" colSpan={2}>
                            <p>-</p>
                        </td>
                        <td className="p5 tr br" colSpan={3}>
                            <p>{total.totalAmount.toFixed(2)}</p>
                        </td>
                    </tr>
                    <tr>
                        <td className="p5 tc br">
                            <p />
                        </td>
                        <td className="p5 br" colSpan={3}>
                            <small>Period :</small>
                        </td>
                        <td className="p5 tc br" colSpan={2}>
                            <p />
                        </td>
                        <td className="p5 tc br">
                            <p />
                        </td>
                        <td className="p5 tc br">
                            <p />
                        </td>
                        <td className="p5 tc br" colSpan={2}>
                            <p />
                        </td>
                        <td className="p5 tc br" colSpan={3}>
                            <p />
                        </td>
                        <td className="p5 tc br" colSpan={2}>
                            <p />
                        </td>
                        <td className="p5 tr br" colSpan={3}>
                            <p />
                        </td>
                    </tr>
                    <tr>
                        <td className="p5 tc br bb">
                            <p />
                        </td>
                        <td className="p5 br bb" colSpan={3}>
                            <small>From : {epochToMinimalDate(total.fromDate)}</small>
                        </td>
                        <td className="p5 tc br bb" colSpan={2}>
                            <p />
                        </td>
                        <td className="p5 tc br bb">
                            <p />
                        </td>
                        <td className="p5 tc br bb">
                            <p />
                        </td>
                        <td className="p5 tc br bb" colSpan={2}>
                            <p />
                        </td>
                        <td className="p5 tc br bb" colSpan={3}>
                            <p />
                        </td>
                        <td className="p5 tc br bb" colSpan={2}>
                            <p />
                        </td>
                        <td className="p5 tr br bb" colSpan={3}>
                            <p />
                        </td>
                    </tr>
                    <tr style={{ backgroundColor: '#e2e2e2' }}>
                        <td className="p5 tc br bb">
                            <p />
                        </td>
                        <td className="p5 br bb" colSpan={3}>
                            <small>To : {epochToMinimalDate(total.endDate)}</small>
                        </td>
                        <td className="p5 tc br bb" colSpan={2}>
                            <p />
                        </td>
                        <td className="p5 tc br bb">
                            <p>{total.totalFilledLoad.toFixed(2)}</p>
                        </td>
                        <td className="p5 bb" colSpan={9}>
                            <p>Total Amount Before Tax</p>
                        </td>
                        <td className="p5 tr br bb">
                            <p>{total.totalAmount.toFixed(2)}</p>
                        </td>
                    </tr>
                    <tr style={{ backgroundColor: '#e2e2e2' }}>
                        <td colSpan={8} className="tc bb p5 br">
                            <h4>Total Invoice Value (Rupees In Words)</h4>
                        </td>
                        <td colSpan={3} className="tc br bb">
                            <h4>GST</h4>
                        </td>
                        <td colSpan={3} className="tc bb br">
                            <h4>Rate</h4>
                        </td>
                        <td colSpan={4} className="bb" />
                    </tr>
                    <tr>
                        <td colSpan={8} className="tc p5 br">
                            <h4 />
                        </td>
                        <td colSpan={3} className="tc p5">
                            <p>SGST</p>
                        </td>
                        <td colSpan={3} className="tc br p5">
                            <p>6%</p>
                        </td>
                        <td colSpan={4} className="tr p5">
                            {(total.totalAmount * (6 / 100)).toFixed(2)}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={8} className="tc p5 br">
                            <h4 />
                        </td>
                        <td colSpan={3} className="tc p5">
                            <p>CGST</p>
                        </td>
                        <td colSpan={3} className="tc br p5">
                            <p>6%</p>
                        </td>
                        <td colSpan={4} className="tr p5">
                            {(total.totalAmount * (6 / 100)).toFixed(2)}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={8} className="tc p5 br">
                            <h4>
                                {toWords.convert(
                                    Math.round(
                                        total.totalAmount * (6 / 100) * 2 + total.totalAmount
                                    ),
                                    {
                                        currency: true
                                    }
                                )}
                            </h4>
                        </td>
                        <td colSpan={3} className="tc p5">
                            <p />
                        </td>
                        <td colSpan={3} className="tc br p5">
                            <p />
                        </td>
                        <td colSpan={4} className="tr p5" />
                    </tr>
                    <tr>
                        <td colSpan={8} className="tc p5 br">
                            <h4 />
                        </td>
                        <td colSpan={6} className="p5 br tc">
                            <h5>Total TAX Amount</h5>
                        </td>
                        <td colSpan={4} className="tr p5">
                            {(total.totalAmount * (6 / 100) * 2 + total.totalAmount).toFixed(2)}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={8} className="tc p5 br">
                            <h4 />
                        </td>
                        <td colSpan={6} className="p5 br tc">
                            <h5>Round Off</h5>
                        </td>
                        <td colSpan={4} className="tr p5">
                            {(
                                Math.round(total.totalAmount * (6 / 100) * 2 + total.totalAmount) -
                                (total.totalAmount * (6 / 100) * 2 + total.totalAmount)
                            ).toFixed(2)}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={14} className="p5 br bt tr">
                            <h5>Total Amount After TAX</h5>
                        </td>
                        <td colSpan={4} className="tr p5 bt">
                            <h4>
                                {Math.round(
                                    total.totalAmount * (6 / 100) * 2 + total.totalAmount
                                ).toFixed(2)}
                            </h4>
                        </td>
                    </tr>
                    <tr style={{ backgroundColor: '#e2e2e2' }}>
                        <td colSpan={18} className="bb p5 bt">
                            <p>GST is payable by the service recipitent.</p>
                        </td>
                    </tr>
                    <tr style={{ backgroundColor: '#e2e2e2' }}>
                        <td colSpan={18} className="bb p5">
                            <p>Certified that the Particulars given above are true and correct.</p>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={18} className="bb p5">
                            <p>
                                We have taken registration under the CGST Act,2017 and have
                                exercised the option to pay tax on services of GTA in relation to
                                transport of Goods supplied by us during the financial year
                                2024-2025 under the forward charge.
                            </p>
                        </td>
                    </tr>
                    <tr style={{ backgroundColor: '#e2e2e2' }}>
                        <td colSpan={10} className="tc p5 br bb">
                            <h4>BANK DETAILS</h4>
                        </td>
                        <td colSpan={8} className="tc p5 bb">
                            <h4>for MAGNUM LOGISTICS</h4>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={10} className="p5 br">
                            <p />
                        </td>
                        <td colSpan={8} className="p5">
                            <p />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={10} className="p5 br">
                            <p>Bank Name : Indian Overseas Bank</p>
                        </td>
                        <td colSpan={8} className="p5">
                            <p />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={10} className="p5 br">
                            <p>Branch : Kollampalayam</p>
                        </td>
                        <td colSpan={8} className="p5">
                            <p />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={10} className="p5 br">
                            <p>Acount No: 159433000055555</p>
                        </td>
                        <td colSpan={8} className="p5">
                            <p />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={10} className="p5 br">
                            <p>IFCS Code : IOBA0001594</p>
                        </td>
                        <td colSpan={8} className="p5">
                            <p />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={10} className="p5 br">
                            <p />
                        </td>
                        <td
                            colSpan={8}
                            className="p5 tc bb bt"
                            style={{ backgroundColor: '#e2e2e2' }}
                        >
                            <h5>Authorised Signatory</h5>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={10} className="p5 br">
                            <p />
                        </td>
                        <td colSpan={8} className="p5">
                            <h5>Name : Sureshkumar V</h5>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={10} className="p5 br">
                            <p />
                        </td>
                        <td colSpan={8} className="p5">
                            <h5>Designation : MANAGER</h5>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
        <hr style={{ margin: '0 20px' }} />
        <ChettinadAriyalurAnnexure trip={trip} total={total} bill={bill} />
    </>
)

export default ChettinadAriyalur
