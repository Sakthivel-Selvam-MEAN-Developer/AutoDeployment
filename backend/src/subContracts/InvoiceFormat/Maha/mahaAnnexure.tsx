import React, { FC } from 'react'
import './style.css'
import { InvoiceProp, LoadingTripProps, StockToUnloadingPointProps, totalProps } from '../type.tsx'
import { epochToMinimalDate } from '../epochToNormal.ts'

interface MahaAnnexure {
    tripDetails: InvoiceProp['trips']
    total: totalProps
    bill: { billNo: string; date: number }
}
const tableRow = (row: LoadingTripProps, index: number) => (
    <tr>
        <td style={{ textAlign: 'center' }}>{index + 1}</td>
        <td style={{ textAlign: 'center' }}>{row.invoiceNumber}</td>
        <td style={{ textAlign: 'center' }}>{epochToMinimalDate(row.startDate)}</td>
        <td style={{ textAlign: 'center' }}>{row.truck.vehicleNumber}</td>
        <td style={{ textAlign: 'center' }}>{row.partyName}</td>
        <td style={{ textAlign: 'center' }}>
            {row.unloadingPoint ? row.unloadingPoint.name : row.stockPoint?.name}
        </td>
        <td style={{ textAlign: 'right' }}>{row.filledLoad.toFixed(2)}</td>
        <td style={{ textAlign: 'right' }}>{row.freightAmount.toFixed(2)}</td>
        <td style={{ textAlign: 'right' }}>{(row.filledLoad * row.freightAmount).toFixed(2)}</td>
        <td style={{ textAlign: 'right' }}>
            {row.overallTrip[0].shortageQuantity.length > 0
                ? (row.overallTrip[0].shortageQuantity[0].shortageQuantity / 1000).toFixed(2)
                : '-'}
        </td>
        <td style={{ textAlign: 'right' }}>{(row.filledLoad * row.freightAmount).toFixed(2)}</td>
    </tr>
)

type StockToUnloadingProps = (row: StockToUnloadingPointProps, index: number) => JSX.Element
const tableRowForStockToUnloading: StockToUnloadingProps = (row, index) => (
    <tr>
        <td style={{ textAlign: 'center' }}>{index + 1}</td>
        <td style={{ textAlign: 'center' }}>{row.invoiceNumber}</td>
        <td style={{ textAlign: 'center' }}>{epochToMinimalDate(row.startDate)}</td>
        <td style={{ textAlign: 'center' }}>
            {row.loadingPointToStockPointTrip.truck.vehicleNumber}
        </td>
        <td style={{ textAlign: 'center' }}>{row.partyName}</td>
        <td style={{ textAlign: 'center' }}>{row.unloadingPoint.name}</td>
        <td style={{ textAlign: 'right' }}>
            {row.loadingPointToStockPointTrip.filledLoad.toFixed(2)}
        </td>
        <td style={{ textAlign: 'right' }}>{row.freightAmount.toFixed(2)}</td>
        <td style={{ textAlign: 'right' }}>
            {(row.loadingPointToStockPointTrip.filledLoad * row.freightAmount).toFixed(2)}
        </td>
        <td style={{ textAlign: 'right' }}>
            {(row.overallTrip[0].shortageQuantity[0].shortageQuantity / 1000).toFixed(2)}
        </td>
        <td style={{ textAlign: 'right' }}>
            {(row.loadingPointToStockPointTrip.filledLoad * row.freightAmount).toFixed(2)}
        </td>
    </tr>
)

const MahaAnnexure: FC<MahaAnnexure> = ({ tripDetails, total, bill }) => (
    <section style={{ padding: '20px' }} id="annexure">
        <style
            dangerouslySetInnerHTML={{
                __html: ".Maha_annexure_main {color:black;}\n.Maha-main {\n    margin: 0;\n    padding: 0;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    /* min-height: 100vh; */\n}\n\n.container {\n    /* margin: 20px; */\n    padding: 20px;\n    width: 100%;\n}\n\n.transport_info {\n    margin-bottom: 20px;\n    display: inline-block;\n}\n\n.Address_info {\n    margin-bottom: 20px;\n    display: inline-block;\n\n    left: 20px;\n}\n\n.invoice_details {\n    font-weight: 600;\n    margin-bottom: 20px;\n    display: inline-block;\n\n    left: 30px;\n}\n\n.invoice_details_2 {\n    width: 100%;\n}\n\n.invoice_details_2 p {\n    text-align: center;\n}\n\n.Maha_annexure_main > table,\n.Maha_annexure_main > th {\n    border: 1px solid black;\n    padding: 10px;\n}\n.invoice_details_2 table,\n.invoice_details table,\n.invoice_details_2 th,\n.invoice_details th,\n.invoice_details_2 td,\n.invoice_details td {\n    border: 1px solid black;\n    padding: 4px;\n    border-collapse: collapse;\n}\n.invoice_details_2 table th {\n    background-color: rgba(128, 128, 128, 0.318);\n}\n\n.Maha_annexure_main > th > td {\n    text-align: center;\n}\n\n.GST_details {\n    font-weight: 600;\n}\n\n.Magum {\n    font-size: 20px;\n}\n\n.container * {\n    margin: 0;\n    padding: 0;\n}\n\n.header > * {\n    flex: 1;\n}\n\n.invoice-details > * {\n    flex: 1;\n}\n\n.invoice-details-body {\n    display: flex;\n    flex-direction: column;\n}\n\n.invoice-details-body .invoice {\n    display: flex;\n    justify-content: space-evenly;\n}\n\n.invoice-details-body .invoice > * {\n    flex: 1;\n}\n\n.bb {\n    border-bottom: 2px solid black;\n}\n\n.bt {\n    border-top: 2px solid black;\n}\n\n.br {\n    border-right: 2px solid black;\n}\n\n.bl {\n    border-left: 2px solid black;\n}\n#Maha_annexure_main {\n    font-family: 'Times New Roman', Times, serif !important;\n}\n\n"
            }}
        />
        <main className="Maha_annexure_main">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h2 style={{ borderBottom: '2px solid black' }}>ANNEXURE</h2>
            </div>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="transport_info">
                        <p>
                            <b>Transporter Name:</b>
                        </p>
                        <p>
                            <b>MAGNUM LOGISTICS</b>
                        </p>
                        <p>
                            30/A, Attayampalayam,Anthetti Thottam, <br />
                            Gangapuram,GST NO: 33ABBFM2821M2ZD,
                            <br />
                            PAN No:ABBFM2821M
                        </p>
                        <p>Erode(Dt), Tamilnadu-638 102, Ph: 8220018402</p>
                        <p>Email Id : magnumlogistics.erd@gmail.com</p>
                    </div>

                    <div className="Address_info">
                        <p>
                            <b>To</b>
                        </p>
                        <b>SREE JAYA JOTHI CEMENT PRIVATE LTD</b>
                        <br />
                        <p>SRINAGAR,YANAKANDLA,BANAGANAPALLI MANDAL</p>
                        <p>KURNOOL DISTRICT,ANDHRA PRADESH.</p>
                        <p>GSTIN NO : 37AAKCS4185M1ZM</p>
                        <p>PAN NO:AAKCS4185M</p>
                    </div>

                    <div className="invoice_details">
                        <table>
                            <tr>
                                <td>Invoice No</td>
                                <td>{bill.billNo}</td>
                            </tr>
                            <tr>
                                <td>Invoice Date</td>
                                <td>{epochToMinimalDate(bill.date)}</td>
                            </tr>
                            <tr>
                                <td>PAN No</td>
                                <td>ABBFM2821M</td>
                            </tr>
                            <tr>
                                <td>Vendor Code</td>
                                <td>2101049</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <br />
                <br />
                <br />
                <div className="invoice_details_2">
                    <p>
                        <b>
                            Period From {epochToMinimalDate(total.fromDate)} To{' '}
                            {epochToMinimalDate(total.endDate)}
                        </b>
                    </p>
                    <table
                        style={{
                            width: '100% ',
                            borderCollapse: 'collapse',
                            fontSize: '13.5px'
                        }}
                    >
                        <tr>
                            <th>SL NO</th>
                            <th>INVOICE NO</th>
                            <th>DATE</th>
                            <th>TRUCK NO</th>
                            <th>CONSIGNEE&apos;S NAME</th>
                            <th>DESTINATION</th>
                            <th>QTY</th>
                            <th>FREIGHT RATE</th>
                            <th>FREIGHT AMOUNT</th>
                            <th>Shortage</th>
                            <th>TOTAL AMOUNT</th>
                        </tr>
                        {tripDetails.loadingPointToUnloadingPointTrip &&
                            tripDetails.loadingPointToUnloadingPointTrip.map(
                                (loadingToUnloading, index) => tableRow(loadingToUnloading, index)
                            )}
                        {tripDetails.loadingPointToStockPointTrip &&
                            tripDetails.loadingPointToStockPointTrip.map((loadingToStock, index) =>
                                tableRow(loadingToStock, index)
                            )}
                        {tripDetails.stockPointToUnloadingPointTrip &&
                            tripDetails.stockPointToUnloadingPointTrip.map(
                                (stockToUnloading, index) =>
                                    tableRowForStockToUnloading(stockToUnloading, index)
                            )}
                        <tr>
                            <td colSpan={6} style={{ textAlign: 'right' }}>
                                <b>GROSS TOTAL AMOUNT</b>
                            </td>
                            <td style={{ textAlign: 'right' }}>
                                {' '}
                                <b>{total.totalFilledLoad.toFixed(2)}</b>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td style={{ textAlign: 'right' }}>
                                <b>{total.totalAmount.toFixed(2)}</b>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={10} style={{ textAlign: 'right' }}>
                                <b>IGST 12%</b>
                            </td>
                            <td style={{ textAlign: 'right' }}>
                                <b>{((total.totalAmount * 12) / 100).toFixed(2)}</b>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={10} style={{ textAlign: 'right' }}>
                                <b>ROUND OFF</b>
                            </td>
                            <td style={{ textAlign: 'right' }}>
                                <b>
                                    {(
                                        Math.round(
                                            (total.totalAmount * 12) / 100 + total.totalAmount
                                        ) -
                                        ((total.totalAmount * 12) / 100 + total.totalAmount)
                                    ).toFixed(2)}
                                </b>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={10} style={{ textAlign: 'right' }}>
                                <b>Total Amount</b>
                            </td>
                            <td style={{ textAlign: 'right' }}>
                                <b>
                                    {Math.round(
                                        (total.totalAmount * 12) / 100 + total.totalAmount
                                    ).toFixed(2)}
                                </b>
                            </td>
                        </tr>
                    </table>
                </div>
                <div className="GST_details">
                    <p>No of Challans : {total.numberOfTrips}</p>
                    <br />
                    <p>GST will be paid by Magnum Logistics</p>
                    <p>GSTIN : 33ABBFM2821M2ZD</p>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p>Whether Tax Payment On Reverse charge Basis : NO</p>
                        <div className="Magum">
                            <b>For Magnum Logistics</b>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </section>
)

export default MahaAnnexure
