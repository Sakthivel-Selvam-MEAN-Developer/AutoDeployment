import React, { FC } from 'react'
import './style.css'
import { toWords } from '../numberToWords.ts'
import MahaAnnexure from './mahaAnnexure.tsx'
import { financialYear } from '../financialYear.ts'
import { epochToMinimalDate } from '../epochToNormal.ts'
import { totalProps } from '../type.tsx'
import { InvoiceProps } from '../CustomInvoice/customInvoice.tsx'

export interface InvoiceProp {
    trip: InvoiceProps['trip']
    bill: { billNo: string; date: number }
    total: totalProps
}
const tableRow = (total: totalProps) => (
    <tr>
        <td className="br bb" style={{ textAlign: 'center' }}>
            1
        </td>
        <td className="br bb" style={{ textAlign: 'center' }}>
            As Per Annexure
        </td>
        <td className="br bb" style={{ textAlign: 'center' }}>
            As Per Annexure
        </td>
        <td className="br bb" style={{ textAlign: 'center' }}>
            {total.totalFilledLoad.toFixed(2)}
        </td>
        <td className="br bb" style={{ textAlign: 'center' }}>
            As Per Annexure
        </td>
        <td className="br bb" style={{ textAlign: 'right' }}>
            {total.totalAmount.toFixed(2)}
        </td>
    </tr>
)

const MahaInvoice: FC<InvoiceProp> = ({ trip, bill, total }) => (
    <>
        <section id="invoice" style={{ padding: '20px' }}>
            <style
                dangerouslySetInnerHTML={{
                    __html: "\n.Maha-main {\n    margin: 0;\n    padding: 0;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    /* min-height: 100vh; */\n}\n\n.container {\n    /* margin: 20px; */\n    padding: 20px;\n    width: 100%;\n}\n\n.transport_info {\n    margin-bottom: 20px;\n    display: inline-block;\n}\n\n.Address_info {\n    margin-bottom: 20px;\n    display: inline-block;\n\n    left: 20px;\n}\n\n.invoice_details {\n    font-weight: 600;\n    margin-bottom: 20px;\n    display: inline-block;\n\n    left: 30px;\n}\n\n.invoice_details_2 {\n    width: 100%;\n}\n\n.invoice_details_2 p {\n    text-align: center;\n}\n\n.Maha_annexure_main > table,\n.Maha_annexure_main > th {\n    border: 1px solid black;\n    padding: 10px;\n}\n.invoice_details_2 table,\n.invoice_details table,\n.invoice_details_2 th,\n.invoice_details th,\n.invoice_details_2 td,\n.invoice_details td {\n    border: 1px solid black;\n    padding: 4px;\n    border-collapse: collapse;\n}\n.invoice_details_2 table th {\n    background-color: rgba(128, 128, 128, 0.318);\n}\n\n.Maha_annexure_main > th > td {\n    text-align: center;\n}\n\n.GST_details {\n    font-weight: 600;\n}\n\n.Magum {\n    font-size: 20px;\n}\n\n.container * {\n    margin: 0;\n    padding: 0;\n}\n\n.header > * {\n    flex: 1;\n}\n\n.invoice-details > * {\n    flex: 1;\n}\n\n.invoice-details-body {\n    display: flex;\n    flex-direction: column;\n}\n\n.invoice-details-body .invoice {\n    display: flex;\n    justify-content: space-evenly;\n}\n\n.invoice-details-body .invoice > * {\n    flex: 1;\n}\n\n.bb {\n    border-bottom: 2px solid black;\n}\n\n.bt {\n    border-top: 2px solid black;\n}\n\n.br {\n    border-right: 2px solid black;\n}\n\n.bl {\n    border-left: 2px solid black;\n}\n#Maha_annexure_main {\n    font-family: 'Times New Roman', Times, serif !important;\n}\n\n"
                }}
            />
            <main className="maha-main">
                <div className="container" style={{ height: 'auto' }}>
                    <h3 style={{ textAlign: 'center' }}>TAX INVOICE</h3>
                    <div
                        className="header bt bl br"
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: 'row'
                        }}
                    >
                        <h5 style={{ padding: '7px 20px' }}>Invoice No : {bill.billNo}</h5>
                        <h5 style={{ padding: '7px 20px', textAlign: 'center' }} className="bl ">
                            GST NO: 33ABBFM2821M2ZD
                        </h5>
                    </div>
                    <div
                        className="invoice-details bt br bl"
                        style={{ display: 'flex', justifyContent: 'space-between' }}
                    >
                        <div className="empty"></div>
                        <div className="invoice-details-body bl">
                            <div className="invoice bb">
                                <h5
                                    style={{
                                        textAlign: 'center',
                                        padding: '7px 20px',
                                        fontWeight: 'bold'
                                    }}
                                    className="br"
                                >
                                    Invoice Date
                                </h5>
                                <h5
                                    style={{
                                        textAlign: 'center',
                                        padding: '7px 20px',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {epochToMinimalDate(bill.date)}
                                </h5>
                            </div>
                            <div className="invoice bb">
                                <h5
                                    style={{
                                        textAlign: 'center',
                                        padding: '7px 20px',
                                        fontWeight: 'bold'
                                    }}
                                    className="br"
                                >
                                    PAN No
                                </h5>
                                <h5
                                    style={{
                                        textAlign: 'center',
                                        padding: '7px 20px',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    ABBFM2821M
                                </h5>
                            </div>
                            <div className="invoice bb">
                                <h5
                                    style={{
                                        textAlign: 'center',
                                        padding: '7px 20px',
                                        fontWeight: 'bold'
                                    }}
                                    className="br"
                                >
                                    Vendor Code
                                </h5>
                                <h5
                                    style={{
                                        textAlign: 'center',
                                        padding: '7px 20px',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    2101049
                                </h5>
                            </div>
                            <div className="invoice bb">
                                <h5
                                    style={{
                                        textAlign: 'center',
                                        padding: '7px 20px',
                                        fontWeight: 'bold'
                                    }}
                                    className="br"
                                >
                                    Financial Year
                                </h5>
                                <h5
                                    style={{
                                        textAlign: 'center',
                                        padding: '7px 20px',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    FY{financialYear}
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="bl br " style={{ padding: '5px' }}>
                        <h5>To</h5>
                        <br />
                        <h5>SREE JAYA JOTHI CEMENT PRIVATE LTD</h5>
                        <br />
                        <h5>SRINAGAR,YANAKANDLA,BANAGANAPALLI MANDAL</h5>
                        <br />
                        <h5>KURNOOL DISTRICT,ANDHRA PRADESH.</h5>
                        <br />
                        <h5>GSTIN NO : 37AAKCS4185M1ZM</h5>
                        <br />
                        <h5>PAN No : AAKCS4185M</h5>
                        <br />
                        <h5>HSN/SAC - 996791</h5>
                    </div>
                    <table
                        style={{ width: '100%', borderCollapse: 'collapse' }}
                        className="bl br bt bb"
                    >
                        <tr>
                            <td colSpan={5} style={{ padding: '5px', width: '45%' }} className="br">
                                <h5>Whether the tax is payable on reverse charge basis No</h5>
                            </td>
                            <td colSpan={2} style={{ width: '10%' }}></td>
                            <td
                                colSpan={4}
                                style={{
                                    padding: '5px',
                                    width: '45%',
                                    fontSize: 'small',
                                    fontWeight: 'bold'
                                }}
                            >
                                STATE NAME & CODE: ANDRA PRADESH-37
                            </td>
                        </tr>
                    </table>
                    <div className="bl br ">
                        <h5 style={{ padding: '2px' }}>Sir,</h5>
                        <h5 style={{ padding: '2px' }}>
                            SUB: SUBMISSION OF PRIMARY TRANSPORTATION BILL
                        </h5>
                        <h5 style={{ padding: '2px' }}>PRODUCT: BULKER CEMENT</h5>
                    </div>
                    <table
                        style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            fontSize: '13px',
                            fontFamily: 'Times New Roman, Times, serif'
                        }}
                        className="bl br bb bt"
                    >
                        <tr className="bb">
                            <td
                                className="br"
                                style={{
                                    textAlign: 'center',
                                    width: '10%',
                                    fontSize: 'small'
                                }}
                            >
                                <h5>SNo</h5>
                            </td>
                            <td
                                className="br"
                                style={{
                                    textAlign: 'center',
                                    width: '35%',
                                    fontSize: 'small'
                                }}
                            >
                                <h5>CONSIGNEE &apos;S NAME</h5>
                            </td>
                            <td
                                className="br"
                                style={{
                                    textAlign: 'center',
                                    width: '10%',
                                    fontSize: 'small'
                                }}
                            >
                                <h5>DESTINATION</h5>
                            </td>
                            <td className="br" style={{ textAlign: 'center', fontSize: 'small' }}>
                                <h5>(MT)</h5>
                            </td>
                            <td className="br" style={{ textAlign: 'center', fontSize: 'small' }}>
                                <h5>Freight (RS)</h5>
                            </td>
                            <td className="br" style={{ textAlign: 'center', fontSize: 'small' }}>
                                <h5>Total Amount</h5>
                            </td>
                        </tr>
                        {tableRow(total)}
                        <tr style={{ height: '20px' }}>
                            <td className="br"></td>
                            <td className="br"></td>
                            <td className="br"></td>
                            <td className="br"></td>
                            <td className="br"></td>
                            <td className="br"></td>
                        </tr>
                        <tr style={{ height: '20px' }}>
                            <td className="br bt"></td>
                            <td className="br bt"></td>
                            <td className="br bt"></td>
                            <td className="br bt"></td>
                            <td className="br bt"></td>
                            <td className="br bt"></td>
                        </tr>
                        <tr style={{ height: '20px' }}>
                            <td className="br bt"></td>
                            <td className="br bt"></td>
                            <td className="br bt"></td>
                            <td className="br bt"></td>
                            <td className="br bt"></td>
                            <td className="br bt"></td>
                        </tr>
                        <tr style={{ height: '30px' }}>
                            <td
                                colSpan={3}
                                style={{
                                    textAlign: 'center',
                                    width: '50px',
                                    fontSize: 'small'
                                }}
                                className="bt bl br "
                            >
                                <h5>GROSS TOTAL</h5>
                            </td>
                            <td
                                style={{
                                    fontSize: 'small',
                                    textAlign: 'right',
                                    padding: '2px'
                                }}
                                className="bt bl br"
                            >
                                <h5>{total.totalFilledLoad.toFixed(2)}</h5>
                            </td>
                            <td
                                style={{ textAlign: 'center', fontSize: 'small' }}
                                className="bt bl br"
                            ></td>
                            <td
                                style={{
                                    fontSize: 'small',
                                    textAlign: 'right',
                                    padding: '2px'
                                }}
                                className="bt bl br"
                            >
                                <h5>{total.totalAmount.toFixed(2)}</h5>
                            </td>
                        </tr>
                        <tr style={{ height: '20px' }}>
                            <td
                                colSpan={2}
                                rowSpan={2}
                                style={{ textAlign: 'center', width: '50px' }}
                                className="bt "
                            ></td>
                            <td
                                style={{ textAlign: 'center', fontSize: 'small' }}
                                className="bt bl br"
                            >
                                <h5>IGST</h5>
                            </td>
                            <td
                                style={{
                                    fontSize: 'small',
                                    textAlign: 'right',
                                    padding: '2px'
                                }}
                                className="bt br"
                            >
                                <h5>12%</h5>
                            </td>
                            <td style={{ textAlign: 'center' }} className="bt br"></td>
                            <td
                                style={{
                                    fontSize: 'small',
                                    textAlign: 'right',
                                    padding: '2px'
                                }}
                                className="bt "
                            >
                                <h5>{((total.totalAmount * 12) / 100).toFixed(2)}</h5>
                            </td>
                        </tr>
                        <tr style={{ height: '20px' }}>
                            <td
                                className="bl br bt"
                                style={{
                                    textAlign: 'center',
                                    width: '50px',
                                    fontSize: 'small',
                                    padding: '2px'
                                }}
                            >
                                <h5>Round off</h5>
                            </td>
                            <td className="bl br bt" style={{ textAlign: 'center' }}></td>
                            <td className="bl br bt" style={{ textAlign: 'center' }}></td>
                            <td
                                className="bl br bt"
                                style={{
                                    fontSize: 'small',
                                    textAlign: 'right',
                                    padding: '2px'
                                }}
                            >
                                <h5>
                                    {(
                                        Math.round(
                                            (total.totalAmount * 12) / 100 + total.totalAmount
                                        ) -
                                        ((total.totalAmount * 12) / 100 + total.totalAmount)
                                    ).toFixed(2)}
                                </h5>
                            </td>
                        </tr>
                        <tr style={{ height: '20px' }}>
                            <td
                                colSpan={5}
                                style={{
                                    textAlign: 'right',
                                    padding: '5px',
                                    fontSize: 'small'
                                }}
                                className="bt bb br"
                            >
                                <h4>TOTAL AMOUNT</h4>
                            </td>
                            <td
                                style={{
                                    fontSize: 'small',
                                    textAlign: 'right',
                                    padding: '2px'
                                }}
                                className="bt bb"
                            >
                                <h4>
                                    {Math.round(
                                        total.totalAmount * 0.12 + total.totalAmount
                                    ).toFixed(2)}
                                </h4>
                            </td>
                        </tr>
                    </table>
                    <div className="bl br ">
                        <h5 style={{ padding: '2px' }}>
                            Rupees(in words):{' '}
                            {toWords.convert(total.totalAmount * 0.12 + total.totalAmount, {
                                currency: true
                            })}
                        </h5>
                    </div>
                    <div className="bl br bb bt">
                        <h5 style={{ padding: '2px' }}>
                            Certified that the particulars given above are true and Correct
                        </h5>
                    </div>
                    <div className="bl br bb ">
                        <h5 style={{ padding: '2px' }}>
                            Thank you and assuring our best services at all times
                        </h5>
                    </div>
                    <div className="bl br  ">
                        <h5 style={{ padding: '2px' }}>
                            We have taken registration under the CGST Act, 2017 and have exercised
                            the option to pay tax on services of GTA in relation to transport of
                            goods supplied by us during the Financial Year {financialYear} under
                            forward charge: Yes
                        </h5>
                    </div>
                    <table
                        style={{ width: '100%', borderCollapse: 'collapse' }}
                        className="bl br bb bt"
                    >
                        <tr>
                            <th style={{ width: '60%', fontSize: 'small' }} className="bt bb br">
                                Bank Details:-
                            </th>
                            <th style={{ width: '40%' }} className="bt bb"></th>
                        </tr>
                        <tr style={{ padding: '30px', fontSize: 'small' }} className="bl br">
                            <td>
                                <p style={{ padding: '10px 0px 0px 2px' }}>
                                    Bank
                                    Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Indian
                                    Overseas Bank{' '}
                                </p>
                                <p style={{ padding: '5px 0px 0px 2px' }}>
                                    Account Name &nbsp;&nbsp;&nbsp;&nbsp;MAGNUM LOGISTICS
                                </p>
                                <p style={{ padding: '5px 0px 0px 2px' }}>
                                    Account No
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;159433000055555
                                </p>
                                <p style={{ padding: '5px 0px 0px 2px' }}>
                                    Branch &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                                    &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                                    Kollampalayam
                                </p>
                                <p style={{ padding: '5px 0px 0px 2px' }}>
                                    IFSC Code &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    IOBA0001594
                                </p>
                                <br />
                                <br />
                            </td>
                            <td className="bl">
                                <div>
                                    <h2 style={{ textAlign: 'center' }}>For Magnum Logistics</h2>
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <h4 style={{ textAlign: 'center' }}>Authorised Signatory</h4>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </main>
        </section>
        <MahaAnnexure tripDetails={trip} total={total} bill={bill} />
    </>
)

export default MahaInvoice
