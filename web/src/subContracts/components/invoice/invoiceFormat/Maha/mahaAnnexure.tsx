import { FC, useContext } from 'react'
import { InvoiceProp, rowProps, StockToUnloadingPointProps, totalProps } from '../../interface'
import './style.css'
import { epochToMinimalDate } from '../../../../../commonUtils/epochToTime'
import { billNoContext } from '../../invoiceContext'
interface MahaAnnexure {
    tripDetails: InvoiceProp
    total: totalProps
}

const MahaAnnexure: FC<MahaAnnexure> = ({ tripDetails, total }) => {
    const { invoiceValues } = useContext(billNoContext)
    return (
        <section style={{ padding: '20px' }} id="Maha_annexure_section">
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
                                    <td>{invoiceValues.billNo}</td>
                                </tr>
                                <tr>
                                    <td>Invoice Date</td>
                                    <td>{epochToMinimalDate(invoiceValues.date)}</td>
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
                            {Object.keys(tripDetails).length !== 0 &&
                                tripDetails.loadingPointToUnloadingPointTrip.map(
                                    (loadingToUnloading, index) => {
                                        return tableRow(loadingToUnloading, index)
                                    }
                                )}
                            {Object.keys(tripDetails).length !== 0 &&
                                tripDetails.loadingPointToStockPointTrip.map(
                                    (loadingToStock, index) => {
                                        return tableRow(loadingToStock, index)
                                    }
                                )}
                            {Object.keys(tripDetails).length !== 0 &&
                                tripDetails.stockPointToUnloadingPointTrip.map(
                                    (stockToUnloading, index) => {
                                        return tableRowForStockToUnloading(stockToUnloading, index)
                                    }
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
                                            (total.totalAmount * 12) / 100 +
                                            total.totalAmount -
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
                                        {(
                                            (total.totalAmount * 12) / 100 +
                                            total.totalAmount
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
}

export default MahaAnnexure
const tableRow = (row: rowProps, index: number) => {
    return (
        <tr>
            <td style={{ textAlign: 'center' }}>{index + 1}</td>
            <td style={{ textAlign: 'center' }}>{row.invoiceNumber}</td>
            <td style={{ textAlign: 'center' }}>{epochToMinimalDate(row.startDate)}</td>
            <td style={{ textAlign: 'center' }}>{row.truck.vehicleNumber}</td>
            <td style={{ textAlign: 'center' }}>{row.partyName}</td>
            <td style={{ textAlign: 'center' }}>
                {row.unloadingPoint ? row.unloadingPoint.name : row.stockPoint.name}
            </td>
            <td style={{ textAlign: 'right' }}>{row.filledLoad.toFixed(2)}</td>
            <td style={{ textAlign: 'right' }}>{row.freightAmount.toFixed(2)}</td>
            <td style={{ textAlign: 'right' }}>
                {(row.filledLoad * row.freightAmount).toFixed(2)}
            </td>
            <td style={{ textAlign: 'right' }}>
                {row.overallTrip[0].shortageQuantity.length > 0
                    ? (row.overallTrip[0].shortageQuantity[0].shortageQuantity / 1000).toFixed(2)
                    : '-'}
            </td>
            <td style={{ textAlign: 'right' }}>
                {(row.filledLoad * row.freightAmount).toFixed(2)}
            </td>
        </tr>
    )
}

const tableRowForStockToUnloading = (row: StockToUnloadingPointProps, index: number) => {
    return (
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
}
