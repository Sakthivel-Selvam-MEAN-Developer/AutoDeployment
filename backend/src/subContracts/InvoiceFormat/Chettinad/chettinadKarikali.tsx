import { FC } from 'react'
import './style.css'
import { toWords } from '../numberToWords'
import { financialYear } from '../financialYear'
import React from 'react'
import { epochToMinimalDate } from '../epochToNormal'
import ChettinadAnnexure from './chettinadAnnexure'
import { AnnexureProps } from '../type'

const ChettinadKarikkali: FC<AnnexureProps> = ({ trip, total, bill, depot }) => {
    return (
        <>
            <section className="chettinad-section" id="invoice" style={{ padding: '20px' }}>
                <style
                    dangerouslySetInnerHTML={{
                        __html: "\n.chettinad-main *,\n.chettinad-ariyalur-main *,\n.chettinad_annexure_main * {\n    color: #000;\n    padding: 0;\n    margin: 0;\n    box-sizing: border-box;\n    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode',\n        Geneva, Verdana, sans-serif;\n}\n#chettinad-karikali-section,\n#chettinad-ariyalur-section {\n    padding: 100px 50px !important;\n}\n.chettinad-section {\n    font-weight: 600;\n    padding: 40px;\n}\n.chettinad-main div {\n    width: 100%;\n}\n.chettinad-main .head {\n    text-align: center;\n    background-color: #80808063;\n}\n.chettinad-main .date {\n    width: 400px;\n}\n.chettinad-main .billing-address {\n    justify-content: space-between;\n}\n.chettinad-main .amount > * {\n    flex: 1 !important;\n}\n.chettinad-ariyalur-main .details div > *,\n.chettinad-ariyalur-main .gst > * {\n    flex: 1;\n}\n\n/* Chettinad Annexure Styles */\n#chettinad_annexure_main {\n    padding: 50px 20px !important;\n}\n.chettinad_annexure_main * {\n    padding: 0;\n    margin: 0;\n}\n\n.chettinad_annexure_main .header {\n    display: flex;\n    align-items: center;\n    flex-direction: column;\n}\n\n.chettinad_annexure_main .header .magnum-address {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    margin: 10px 0 !important;\n    padding: 20px !important;\n}\n\n.chettinad_annexure_main .header .magnum-address * {\n    padding: 5px;\n}\n\n.chettinad_annexure_main .margin {\n    padding: 5px;\n    display: flex;\n    justify-content: end;\n}\n\n.chettinad_annexure_main .margin > *,\n.chettinad_annexure_main .margin .magnum-details .list > *,\n.chettinad_annexure_main .footer .total > * {\n    flex: 1;\n}\n\n.chettinad_annexure_main .margin .company-address * {\n    padding: 5px;\n}\n\n.chettinad_annexure_main .margin .magnum-details * {\n    display: flex;\n    align-items: center;\n}\n\n.chettinad_annexure_main .margin .magnum-details {\n    display: flex;\n    align-items: end;\n    flex-direction: column;\n}\n\n.chettinad_annexure_main .margin .magnum-details .list {\n    padding: 5px;\n    justify-content: space-between;\n    width: 400px;\n}\n\n.chettinad_annexure_main td,\n.chettinad_annexure_main th {\n    padding: 5px !important;\n    text-align: center;\n}\n\n.chettinad_annexure_main table,\n.chettinad_annexure_main th,\n.chettinad_annexure_main td {\n    border-collapse: collapse;\n    border: 1px solid black;\n}\n.chettinad_annexure_main table {\n    width: 100%;\n    margin: 40px 0 !important;\n}\n\n.chettinad_annexure_main .footer {\n    display: flex;\n    justify-content: space-between;\n}\n\n.chettinad_annexure_main .footer * {\n    padding-bottom: 8px;\n}\n\n.chettinad_annexure_main .footer .total {\n    display: flex;\n    justify-content: space-between;\n}\n\n.chettinad_annexure_main .footer .info {\n    display: flex;\n    flex-direction: column;\n}\n\n.chettinad_annexure_main .footer .sign {\n    display: flex;\n    align-items: end;\n}\n\n/* Common Styles */\n\n.df-fc {\n    display: flex;\n    flex-direction: column;\n}\n.df {\n    display: flex;\n}\n.bl {\n    border-left: 2px solid black;\n}\n.br {\n    border-right: 2px solid black;\n}\n.bt {\n    border-top: 2px solid black;\n}\n.bb {\n    border-bottom: 2px solid black;\n}\n.pt {\n    padding-top: 5px;\n}\n.pb {\n    padding-bottom: 5px;\n}\n.pl {\n    padding-left: 5px;\n}\n.pr {\n    padding-right: 5px;\n}\n.p-5 {\n    padding: 5px;\n}\n.p-2 {\n    padding: 2px;\n}\n.ai {\n    align-items: center;\n}\n.ae {\n    align-items: end;\n}\n.ta {\n    text-align: center;\n}\n.jc {\n    justify-content: center;\n}\n.jsp {\n    justify-content: space-between;\n}\n.jsa {\n    justify-content: space-around;\n}\n.te {\n    text-align: end;\n}\n.je {\n    justify-content: end;\n}\n.bg {\n    background-color: #00000021;\n}\n"
                    }}
                />
                <main className="chettinad-main bt bb bl br df-fc">
                    <div className="head bb pt pb">
                        <h1>TAX INVOICE</h1>
                    </div>
                    <div className="transportation df-fc bb">
                        <div className="pan df jc">
                            <div className="df-fc">
                                <h2 className="ta bb br p-2">TRANSPORTATION BILL</h2>
                                <p className="p-5 bb br">PAN.NO : ABBFM2821M</p>
                            </div>
                            <div className="date df-fc jsp">
                                <div className="df jsp bb">
                                    <p className="p-5 br" style={{ width: '75px', height: '40px' }}>
                                        Bill No
                                    </p>
                                    <p className="p-5">{bill.billNo}</p>
                                </div>
                                <div className="df jsp bb">
                                    <p className="p-5 br" style={{ width: '75px' }}>
                                        Date
                                    </p>
                                    <p className="p-5">{epochToMinimalDate(bill.date)}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="p-5 bb">GSTIN : 33ABBFM2821M2ZD</p>
                        </div>
                        <div>
                            <p className="p-5">Tax is payable on reverse charges : NO</p>
                        </div>
                    </div>
                    <div className="df">
                        <div className="billing-address bb br df-fc">
                            <div className="bb">
                                <h3 className="ta p-2">BILLING ADDRESS</h3>
                            </div>
                            <div>
                                <div className="p-5">
                                    <h4 className="p-2">
                                        M/s . Chettinad Cement Corporation Private Ltd
                                    </h4>
                                    <p className="p-2">Rani Meyyammai nagar, Karikkali,</p>
                                    <p className="p-2">Vedasandur.TK, Dindigul.DT-624703</p>
                                    <p className="p-2">Tamilnadu (state code: 33)</p>
                                </div>
                                <div>
                                    <h3 className="pl pb">
                                        GSTIN: 33AAACC3130A1ZQ, PAN :AAACC3130A
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="shipping-details bb">
                            <div className="bb">
                                <h3 className="ta p-2">Shipping details</h3>
                            </div>
                            <div className="df-fc ai p-5">
                                <div className="df jc p-2">
                                    <h3 style={{ textDecoration: 'underline' }}>Commodity</h3>
                                    <span>&nbsp;:&nbsp;</span>
                                    <p>Cement</p>
                                </div>
                                <div className="df ai jc p-2">
                                    <h2 style={{ textDecoration: 'underline' }}>Vendor Code</h2>
                                    <span>&nbsp;:&nbsp;</span>
                                    <h2>3600428</h2>
                                </div>
                                <h4 className="p-2" style={{ textDecoration: 'underline' }}>
                                    Area of Transport
                                </h4>
                                <p className="p-2">Karnataka</p>
                            </div>
                            <div className="pb bt pt">
                                <p className="ta">(Details enclosed)</p>
                            </div>
                        </div>
                    </div>
                    <div className="amount df bb">
                        <div className="description-of-service">
                            <div className="df bb br">
                                <h3 style={{ width: '100px' }} className="ta br">
                                    S.NO
                                </h3>
                                <h3 className="ta" style={{ width: '100%' }}>
                                    Description of service
                                </h3>
                            </div>
                            <div className="df br" style={{ height: '100px' }}>
                                <p style={{ width: '100px' }} className="ta br pt pb">
                                    1
                                </p>
                                <div className="df-fc pt pb jsp">
                                    <div>
                                        <h4 className="ta p-2">
                                            Transportation charges for {depot}
                                        </h4>
                                        <p className="ta p-2">
                                            ({epochToMinimalDate(total.fromDate)} to
                                            {epochToMinimalDate(total.endDate)})
                                        </p>
                                    </div>
                                    <div style={{ height: '24px' }}>
                                        <h3 className="ta p-2 bt">Total Amount Before Tax</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="df">
                            <div className="df-fc jsp br">
                                <div>
                                    <h3 className="ta bb">SAC</h3>
                                    <p className="ta pt">996791</p>
                                </div>
                                <p style={{ height: '29px' }} className="pb bt" />
                            </div>
                            <div className="df-fc jsp br">
                                <div>
                                    <h3 className="ta bb">Qty</h3>
                                    <p className="ta pt">{total.totalFilledLoad.toFixed(2)}</p>
                                </div>
                                <h3 style={{ height: '29px' }} className="ta p-2 bt">
                                    {total.totalFilledLoad.toFixed(2)}
                                </h3>
                            </div>
                            <div className="df-fc jsp br">
                                <div>
                                    <h3 className="ta bb">UOM</h3>
                                    <p className="ta pt">MTS</p>
                                </div>
                                <p style={{ height: '29px' }} className="p-2 bt" />
                            </div>
                            <div className="df-fc jsp">
                                <div>
                                    <h3 className="ta bb" style={{ width: '200px' }}>
                                        Taxable Value
                                    </h3>
                                    <p className="te pt pr">{total.totalAmount.toFixed(2)}</p>
                                </div>
                                <h3
                                    style={{ height: '29px', width: '200px' }}
                                    className="te p-2 bt"
                                >
                                    {total.totalAmount.toFixed(2)}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="df">
                        <div />
                        <div className="df-fc bl">
                            <div className="df jsp bb">
                                <p className="p-2">Add : CGST</p>
                                <p className="p-2">6%</p>
                                <p style={{ width: '202px' }} className="te p-2 bl">
                                    {(total.totalAmount * (6 / 100)).toFixed(2)}
                                </p>
                            </div>
                            <div className="df jsp bb">
                                <p className="p-2">Add : SGST</p>
                                <p className="p-2">6%</p>
                                <p style={{ width: '202px' }} className="te p-2 bl">
                                    {(total.totalAmount * (6 / 100)).toFixed(2)}
                                </p>
                            </div>
                            <div className="df jsp bb">
                                <p className="p-2">Add : IGST</p>
                                <p className="p-2">12%</p>
                                <p style={{ width: '202px' }} className="te p-2 bl" />
                            </div>
                            <div className="df jsp bb">
                                <p className="p-2">Total Tax Amount : GST</p>
                                <p style={{ width: '202px' }} className="te p-2 bl">
                                    {(total.totalAmount * (6 / 100) * 2).toFixed(2)}
                                </p>
                            </div>
                            <div className="df jsp bb">
                                <p className="p-2">Round Off</p>
                                <p style={{ width: '202px' }} className="te p-2 bl">
                                    {(
                                        Math.round(
                                            total.totalAmount * (6 / 100) * 2 + total.totalAmount
                                        ) -
                                        (total.totalAmount * (6 / 100) * 2 + total.totalAmount)
                                    ).toFixed(2)}
                                </p>
                            </div>
                            <div className="df jsp">
                                <h4 className="p-2">Total Amount After Tax</h4>
                                <h3 style={{ width: '202px' }} className="te p-2 bl">
                                    {Math.round(
                                        total.totalAmount * (6 / 100) * 2 + total.totalAmount
                                    ).toFixed(2)}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="bt pt pb pl pr">
                        <h4>
                            Total invoice value ( in words) :
                            {toWords.convert(
                                Math.round(total.totalAmount * (6 / 100) * 2 + total.totalAmount),
                                {
                                    currency: true
                                }
                            )}
                        </h4>
                    </div>
                    <div className="bt pt pb pl pr">
                        <p>
                            We have taken registration under the CGST Act,2017 and have exercised
                            the option to pay tax on services of GTA in relation to transport of
                            Goods supplied by us during the financial year {financialYear} under the
                            forward charge.
                        </p>
                    </div>
                    <div className="bt pt pb pl pr">
                        <p>Certified that the particulars given above are true and correct.</p>
                    </div>
                    <div className="df bt">
                        <div className="br">
                            <h4 className="bb p-2 ta">Kindly pass the above bill and credit the</h4>
                            <div className="pt pb pr pl">
                                <h4 className="pb">BANK DETAILS</h4>
                                <h4 className="p-2">Bank Name : Indian Overseas Bank</h4>
                                <h4 className="p-2">Branch : Kollampalayam</h4>
                                <h4 className="p-2">Acount No: 159433000055555</h4>
                                <h4 className="p-2">IFCS Code : IOBA0001594</h4>
                            </div>
                        </div>
                        <div className="df-fc jsp ai">
                            <h3 className="ta p-2">For Magnum Logistics</h3>
                            <div style={{ padding: '50px' }}></div>
                            <h4 className="ta pb">Authorised Signatory</h4>
                        </div>
                    </div>
                </main>
            </section>
            <hr style={{ margin: '0 20px' }} />
            <ChettinadAnnexure trip={trip} bill={bill} total={total} />
        </>
    )
}

export default ChettinadKarikkali
