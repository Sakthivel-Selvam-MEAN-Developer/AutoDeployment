import { FC, useContext, useEffect, useState } from 'react'
import './style.css'
import { InvoiceProps } from '../UltraTech/ultraTech-APCW'
import { getInvoiceDetails } from '../../../../services/invoice'
import { InvoiceProp, totalProps } from '../../interface'
import { Box, CircularProgress } from '@mui/material'
import { toWords } from '../numberToWords'
import calculateTotals from '../calculateTotal'
import MahaAnnexure from './mahaAnnexure'
import { billNoContext } from '../../invoiceContext'
import { financialYear } from '../financialYear'
import { epochToMinimalDate } from '../../../../../commonUtils/epochToTime'

const MahaInvoice: FC<InvoiceProps> = ({ tripId, setLoading, loading }) => {
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
            .then((data) => setTrip({ ...data }))
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
                    <section id="maha-section" style={{ padding: '20px' }}>
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
                                    <h5 style={{ padding: '7px 20px' }}>
                                        Invoice No : {invoiceValues.billNo}
                                    </h5>
                                    <h5
                                        style={{ padding: '7px 20px', textAlign: 'center' }}
                                        className="bl "
                                    >
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
                                                {epochToMinimalDate(invoiceValues.date)}
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
                                        <td
                                            colSpan={5}
                                            style={{ padding: '5px', width: '45%' }}
                                            className="br"
                                        >
                                            <h5>
                                                Whether the tax is payable on reverse charge basis
                                                No
                                            </h5>
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
                                        <td
                                            className="br"
                                            style={{ textAlign: 'center', fontSize: 'small' }}
                                        >
                                            <h5>(MT)</h5>
                                        </td>
                                        <td
                                            className="br"
                                            style={{ textAlign: 'center', fontSize: 'small' }}
                                        >
                                            <h5>Freight (RS)</h5>
                                        </td>
                                        <td
                                            className="br"
                                            style={{ textAlign: 'center', fontSize: 'small' }}
                                        >
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
                                        <td
                                            className="bl br bt"
                                            style={{ textAlign: 'center' }}
                                        ></td>
                                        <td
                                            className="bl br bt"
                                            style={{ textAlign: 'center' }}
                                        ></td>
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
                                                    (total.totalAmount * 12) / 100 +
                                                    total.totalAmount -
                                                    ((total.totalAmount * 12) / 100 +
                                                        total.totalAmount)
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
                                                {(
                                                    total.totalAmount * 0.12 +
                                                    total.totalAmount
                                                ).toFixed(2)}
                                            </h4>
                                        </td>
                                    </tr>
                                </table>
                                <div className="bl br ">
                                    <h5 style={{ padding: '2px' }}>
                                        Rupees(in words):{' '}
                                        {toWords.convert(
                                            total.totalAmount * 0.12 + total.totalAmount,
                                            { currency: true }
                                        )}
                                    </h5>
                                </div>
                                <div className="bl br bb bt">
                                    <h5 style={{ padding: '2px' }}>
                                        Certified that the particulars given above are true and
                                        Correct
                                    </h5>
                                </div>
                                <div className="bl br bb ">
                                    <h5 style={{ padding: '2px' }}>
                                        Thank you and assuring our best services at all times
                                    </h5>
                                </div>
                                <div className="bl br  ">
                                    <h5 style={{ padding: '2px' }}>
                                        We have taken registration under the CGST Act, 2017 and have
                                        exercised the option to pay tax on services of GTA in
                                        relation to transport of goods supplied by us during the
                                        Financial Year {financialYear} under forward charge: Yes
                                    </h5>
                                </div>
                                <table
                                    style={{ width: '100%', borderCollapse: 'collapse' }}
                                    className="bl br bb bt"
                                >
                                    <tr>
                                        <th
                                            style={{ width: '60%', fontSize: 'small' }}
                                            className="bt bb br"
                                        >
                                            Bank Details:-
                                        </th>
                                        <th style={{ width: '40%' }} className="bt bb"></th>
                                    </tr>
                                    <tr
                                        style={{ padding: '30px', fontSize: 'small' }}
                                        className="bl br"
                                    >
                                        <td>
                                            <p style={{ padding: '10px 0px 0px 2px' }}>
                                                Bank
                                                Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Indian
                                                Overseas Bank{' '}
                                            </p>
                                            <p style={{ padding: '5px 0px 0px 2px' }}>
                                                Account Name &nbsp;&nbsp;&nbsp;&nbsp;MAGNUM
                                                LOGISTICS
                                            </p>
                                            <p style={{ padding: '5px 0px 0px 2px' }}>
                                                Account No
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;159433000055555
                                            </p>
                                            <p style={{ padding: '5px 0px 0px 2px' }}>
                                                Branch
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Kollampalayam
                                            </p>
                                            <p style={{ padding: '5px 0px 0px 2px' }}>
                                                IFSC Code
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                IOBA0001594
                                            </p>
                                            <br />
                                            <br />
                                        </td>
                                        <td className="bl">
                                            <div>
                                                <h2 style={{ textAlign: 'center' }}>
                                                    For Magnum Logistics
                                                </h2>
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <h4 style={{ textAlign: 'center' }}>
                                                    Authorised Signatory
                                                </h4>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </main>
                    </section>
                </>
            )}
            <hr />
            <MahaAnnexure tripDetails={trip} total={total} />
        </>
    )
}

export default MahaInvoice
const tableRow = (total: totalProps) => {
    return (
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
}
