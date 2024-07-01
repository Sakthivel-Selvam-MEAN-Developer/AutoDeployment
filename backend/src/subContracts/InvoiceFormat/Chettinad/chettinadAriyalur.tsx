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
}

const ChettinadAriyalur: FC<invoiceProps> = ({ trip, bill, total }) => (
    <>
        <section id="invoice" className="chettinad-ariyalur-section" style={{ padding: '20px' }}>
            <style
                dangerouslySetInnerHTML={{
                    __html: "\n.chettinad-main *,\n.chettinad-ariyalur-main *,\n.chettinad_annexure_main * {\n    color: #000;\n    padding: 0;\n    margin: 0;\n    box-sizing: border-box;\n    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode',\n        Geneva, Verdana, sans-serif;\n}\n#chettinad-karikali-section,\n.chettinad-ariyalur-section {\n    padding: 100px 50px !important;\n}\n.chettinad-section {\n    font-weight: 600;\n    padding: 40px;\n}\n.chettinad-main div {\n    width: 100%;\n}\n.chettinad-main .head {\n    text-align: center;\n    background-color: #80808063;\n}\n.chettinad-main .date > *,\n.chettinad-main .date div > * {\n    flex: 1;\n}\n.chettinad-main .date {\n    width: 300px;\n}\n.chettinad-main .billing-address {\n    justify-content: space-between;\n}\n.chettinad-main .amount > * {\n    flex: 1 !important;\n}\n.chettinad-ariyalur-main .details div > *,\n.chettinad-ariyalur-main .gst > * {\n    flex: 1;\n}\n\n/* Chettinad Annexure Styles */\n#chettinad_annexure_main {\n    padding: 50px 20px !important;\n}\n.chettinad_annexure_main * {\n    padding: 0;\n    margin: 0;\n}\n\n.chettinad_annexure_main .header {\n    display: flex;\n    align-items: center;\n    flex-direction: column;\n}\n\n.chettinad_annexure_main .header .magnum-address {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    margin: 10px 0 !important;\n    padding: 20px !important;\n}\n\n.chettinad_annexure_main .header .magnum-address * {\n    padding: 5px;\n}\n\n.chettinad_annexure_main .margin {\n    padding: 5px;\n    display: flex;\n    justify-content: end;\n}\n\n.chettinad_annexure_main .margin > *,\n.chettinad_annexure_main .margin .magnum-details .list > *,\n.chettinad_annexure_main .footer .total > * {\n    flex: 1;\n}\n\n.chettinad_annexure_main .margin .company-address * {\n    padding: 5px;\n}\n\n.chettinad_annexure_main .margin .magnum-details * {\n    display: flex;\n    align-items: center;\n}\n\n.chettinad_annexure_main .margin .magnum-details {\n    display: flex;\n    align-items: end;\n    flex-direction: column;\n}\n\n.chettinad_annexure_main .margin .magnum-details .list {\n    padding: 5px;\n    justify-content: space-between;\n    width: 400px;\n}\n\n.chettinad_annexure_main td,\n.chettinad_annexure_main th {\n    padding: 5px !important;\n    text-align: center;\n}\n\n.chettinad_annexure_main table,\n.chettinad_annexure_main th,\n.chettinad_annexure_main td {\n    border-collapse: collapse;\n    border: 1px solid black;\n}\n.chettinad_annexure_main table {\n    width: 100%;\n    margin: 40px 0 !important;\n}\n\n.chettinad_annexure_main .footer {\n    display: flex;\n    justify-content: space-between;\n}\n\n.chettinad_annexure_main .footer * {\n    padding-bottom: 8px;\n}\n\n.chettinad_annexure_main .footer .total {\n    display: flex;\n    justify-content: space-between;\n}\n\n.chettinad_annexure_main .footer .info {\n    display: flex;\n    flex-direction: column;\n}\n\n.chettinad_annexure_main .footer .sign {\n    display: flex;\n    align-items: end;\n}\n\n/* Common Styles */\n\n.df-fc {\n    display: flex;\n    flex-direction: column;\n}\n.df {\n    display: flex;\n}\n.bl {\n    border-left: 2px solid black;\n}\n.br {\n    border-right: 2px solid black;\n}\n.bt {\n    border-top: 2px solid black;\n}\n.bb {\n    border-bottom: 2px solid black;\n}\n.pt {\n    padding-top: 5px;\n}\n.pb {\n    padding-bottom: 5px;\n}\n.pl {\n    padding-left: 5px;\n}\n.pr {\n    padding-right: 5px;\n}\n.p-5 {\n    padding: 5px;\n}\n.p-2 {\n    padding: 2px;\n}\n.ai {\n    align-items: center;\n}\n.ae {\n    align-items: end;\n}\n.ta {\n    text-align: center;\n}\n.jc {\n    justify-content: center;\n}\n.jsp {\n    justify-content: space-between;\n}\n.jsa {\n    justify-content: space-around;\n}\n.te {\n    text-align: end;\n}\n.je {\n    justify-content: end;\n}\n.bg {\n    background-color: #00000021;\n}\n"
                }}
            />
            <main className="chettinad-ariyalur-main bb bt br bl">
                <div className="df jsp bb">
                    <div style={{ width: '60vw' }}>
                        <h4 className="p-2">GSTIN NO : 33ABBFM2821M2ZD</h4>
                        <p className="p-2">Tax Is Payable On Reverse Charge : (Yes/No) : No</p>
                        <h4 className="p-2">Vendor Code : 3600428</h4>
                    </div>
                    <div className="bl pr" style={{ width: '40vw' }}>
                        <h4 className="p-2">INVOICE NO : {bill.billNo}</h4>
                        <h4 className="p-2">DATE : {epochToMinimalDate(bill.date)}</h4>
                        <h4 className="p-2">PAN No : ABBFM2821M2</h4>
                    </div>
                </div>
                <div className="df jsp bb">
                    <div style={{ width: '60vw' }}>
                        <div className="pl pt pb pr bb bg">
                            <h4 className="ta">Details of Service Receiver(Billed to)</h4>
                        </div>
                        <div className="pl">
                            <p className="df p-2">M/s Chettinad Cement Corporation Private Ltd.</p>
                            <p className="p-2">Ariyalur Trichy Road, Keelapaluvur (p.o),</p>
                            <p className="p-2">Ariyalur District - 621707</p>
                            <p className="p-2">Tamilnadu, India.</p>
                            <p className="p-2">State Code : 33</p>
                            <p className="p-2">GSTIN Number : 33AAACC3130A1ZQ</p>
                        </div>
                    </div>
                    <div style={{ width: '40vw' }} className="bl pb other-details">
                        <div className="pt pb pr bb" style={{ backgroundColor: '#00000021' }}>
                            <h4 className="ta">Other Details</h4>
                        </div>
                        <div className="pl details df-fc">
                            <div className="df p-2">
                                <p>PO Reference</p>
                                <p>-</p>
                            </div>
                            <div className="df p-2">
                                <p>PO Date</p>
                                <p>-</p>
                            </div>
                            <div className="df p-2">
                                <p>Product Transported</p>
                                <p>Cement</p>
                            </div>
                            <div className="df p-2">
                                <p>Vessel Name</p>
                                <p>-</p>
                            </div>
                            <div className="df p-2">
                                <p>Mode of Transpot</p>
                                <p>By Truck</p>
                            </div>
                            <div className="df p-2">
                                <p>Financial Year</p>
                                <p>{financialYear}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="df bb" style={{ height: '154px' }}>
                    <div style={{ width: '7vw' }} className="br">
                        <div style={{ height: '130px' }}>
                            <h4 style={{ height: '24px' }} className="df jc ai bb bg">
                                S.NO
                            </h4>
                            <p className="ta">1</p>
                        </div>
                        <p style={{ height: '24px' }} className="bt bg bb" />
                    </div>
                    <div style={{ width: '24vw' }} className="br">
                        <div style={{ height: '130px' }}>
                            <h4 style={{ height: '24px' }} className="df jc ai bb bg">
                                Description of Servics
                            </h4>
                            <div>
                                <p className="pl pt pb">TRANSPORTATION CHARGES</p>
                                <small className="p-2">Period:</small>
                                <br />
                                <small className="p-2">From : {total.fromDate}</small>
                                <br />
                                <small className="p-2">To : {total.endDate}</small>
                            </div>
                        </div>
                        <p style={{ height: '24px' }} className="df jc ai bt bg bb" />
                    </div>
                    <div style={{ width: '9vw' }} className="br">
                        <div style={{ height: '130px' }}>
                            <h5 style={{ height: '24px' }} className="df jc ai bb bg">
                                HSN/SAC
                            </h5>
                            <p className="ta df jc ai" style={{ height: '50px' }}>
                                996791
                            </p>
                        </div>
                        <p style={{ height: '24px' }} className="df jc ai bt bg bb" />
                    </div>
                    <div style={{ width: '9vw' }} className="br">
                        <div style={{ height: '130px' }}>
                            <h4 style={{ height: '24px' }} className="df jc ai bb bg">
                                Qty
                            </h4>
                            <p className="ta df jc ai" style={{ height: '50px' }}>
                                {total.totalFilledLoad.toFixed(2)}
                            </p>
                        </div>
                        <p style={{ height: '24px' }} className="df jc ai ta bt bg bb">
                            {total.totalFilledLoad.toFixed(2)}
                        </p>
                    </div>
                    <div style={{ width: '7vw' }} className="br">
                        <div style={{ height: '130px' }}>
                            <h4 style={{ height: '24px' }} className="df jc ai bb bg">
                                UOM
                            </h4>
                            <p />
                        </div>
                        <p style={{ height: '24px' }} className="df jc ai bt bg bb" />
                    </div>
                    <div className="df-fc">
                        <div className="df" style={{ height: '145px' }}>
                            <div style={{ width: '7vw' }} className="br bb">
                                <h4 style={{ height: '24px' }} className="df jc ai bb bg">
                                    Rate
                                </h4>
                                <p className="ta df jc ai" style={{ height: '50px' }}>
                                    As Per Annexure
                                </p>
                            </div>
                            <div style={{ width: '13vw' }} className="br bb">
                                <h4 style={{ height: '24px' }} className="df jc ai bb bg">
                                    Total
                                </h4>
                                <p className="ta df jc ai" style={{ height: '50px' }}>
                                    {total.totalAmount.toFixed(2)}
                                </p>
                            </div>
                            <div style={{ width: '9vw' }} className="br bb">
                                <h4 style={{ height: '24px' }} className="df jc ai bb bg">
                                    Discount
                                </h4>
                                <p className="ta df jc ai" style={{ height: '50px' }}>
                                    -
                                </p>
                            </div>
                            <div style={{ width: '15vw' }} className="bb">
                                <h4 style={{ height: '24px' }} className="df jc ai bb bg">
                                    Taxable value
                                </h4>
                                <p className="df je ai pr" style={{ height: '50px' }}>
                                    {total.totalAmount.toFixed(2)}
                                </p>
                            </div>
                        </div>
                        <div className="df jsp bg" style={{ height: '20px' }}>
                            <p className="df jc ai pl">Total Amount Before Tax</p>
                            <p className="df jc ai pr"> {total.totalAmount.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
                <div className="df-fc">
                    <div className="df jsp">
                        <div style={{ width: '70vw' }} className="br">
                            <h5 style={{ height: '24px' }} className="ta p-2 bb bg">
                                Total Invoice Value (Rupees In Words)
                            </h5>
                            <h4 style={{ height: '100px' }} className="df jc ai">
                                {toWords.convert(
                                    Math.round(
                                        total.totalAmount * (6 / 100) * 2 + total.totalAmount
                                    ),
                                    {
                                        currency: true
                                    }
                                )}
                            </h4>
                        </div>
                        <div className="df">
                            <div
                                className="df-fc br jsp"
                                style={{ width: '15vw', height: '150px' }}
                            >
                                <div className="df jsp gst">
                                    <div>
                                        <h5 className="ta p-2 bb br bg" style={{ height: '24px' }}>
                                            GST
                                        </h5>
                                        <p className="ta p-2">SGST</p>
                                        <p className="ta p-2">CGST</p>
                                    </div>
                                    <div>
                                        <h5 className="ta p-2 bb bg" style={{ height: '24px' }}>
                                            Rate
                                        </h5>
                                        <p className="ta p-2">6%</p>
                                        <p className="ta p-2">6%</p>
                                    </div>
                                </div>
                                <div className="pl">
                                    <h5 className="p-2">Total TAX Amount</h5>
                                    <h5 className="p-2">Round Off</h5>
                                </div>
                            </div>
                            <div style={{ width: '15vw', height: '150px' }} className="df-fc jsp">
                                <div>
                                    <p className="te bb bg" style={{ height: '24px' }} />
                                    <p className="te p-2">
                                        {(total.totalAmount * (6 / 100)).toFixed(2)}
                                    </p>
                                    <p className="te p-2">
                                        {(total.totalAmount * (6 / 100)).toFixed(2)}
                                    </p>
                                </div>
                                <div>
                                    <p className="te p-2">
                                        {(
                                            total.totalAmount * (6 / 100) * 2 +
                                            total.totalAmount
                                        ).toFixed(2)}
                                    </p>
                                    <p className="te p-2">
                                        {(
                                            Math.round(
                                                total.totalAmount * (6 / 100) * 2 +
                                                    total.totalAmount
                                            ) -
                                            (total.totalAmount * (6 / 100) * 2 + total.totalAmount)
                                        ).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="df je bt">
                        <h5 className="te p-2 br">Total Amount After TAX</h5>
                        <h4 style={{ width: '15vw' }} className="df je p-2">
                            {Math.round(
                                total.totalAmount * (6 / 100) * 2 + total.totalAmount
                            ).toFixed(2)}
                        </h4>
                    </div>
                </div>
                <div className="bg bt p-2">
                    <p>GST is payable by the service recipitent.</p>
                </div>
                <div className="bg bt p-2">
                    <p>Certified that the Particulars given above are true and correct.</p>
                </div>
                <div className="bt p-2">
                    <p>
                        We have taken registration under the CGST Act,2017 and have exercised the
                        option to pay tax on services of GTA in relation to transport of Goods
                        supplied by us during the financial year {financialYear}
                        &nbsp;under the forward charge.
                    </p>
                </div>
                <div className="df jsp bt">
                    <div style={{ width: '70vw' }} className="br">
                        <h4 className="ta p-2 bb bg">BANK DETAILS</h4>
                        <div style={{ height: '150px' }} className="df-fc jc">
                            <p className="p-2">Bank Name : Indian Overseas Bank</p>
                            <p className="p-2">Branch : Kollampalayam</p>
                            <p className="p-2">Acount No: 159433000055555</p>
                            <p className="p-2">IFCS Code : IOBA0001594</p>
                        </div>
                    </div>
                    <div style={{ width: '30vw' }}>
                        <h4 className="ta p-2 bb bg">for MAGNUM LOGISTICS</h4>
                        <div style={{ padding: '50px' }}></div>
                        <div>
                            <h5 className="p-2 ta bg bt bb">Authorised Signatory</h5>
                            <div className="pb pt pl">
                                <h5 className="p-2">Name : Sureshkumar V</h5>
                                <h5 className="p-2">Designation : MANAGER</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </section>
        <ChettinadAriyalurAnnexure trip={trip} total={total} bill={bill} />
    </>
)

export default ChettinadAriyalur
