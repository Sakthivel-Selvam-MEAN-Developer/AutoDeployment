import { FC } from 'react'
import './style.css'
import { AnnexureProps, StockToUnloadingPointProps, rowProps } from '../../interface'
import dayjs from 'dayjs'
import { toWords } from '../numberToWords'

const DalmiaAnnexure: FC<AnnexureProps> = ({ tripDetails, lastBillNumber, total }) => {
    return (
        <section id="dalmia_annexure_section">
            <div className="dalmia_annexure_main">
                <div className="dalmia-head df">
                    <div>
                        <table style={{ textAlign: 'left', marginBottom: '50px', width: '300px' }}>
                            <tbody>
                                <tr>
                                    <th>FROM</th>
                                </tr>
                                <tr>
                                    <th>MAGNUM LOGISTICS</th>
                                </tr>
                                <tr style={{ height: '100px' }}>
                                    <td>NA</td>
                                </tr>
                                <tr>
                                    <td>PAN NO:-</td>
                                </tr>
                                <tr>
                                    <td>GSTIN:- 33ABBFM2821M2ZD</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <table style={{ textAlign: 'left', width: '350px' }}>
                            <tbody>
                                <tr>
                                    <th>TO</th>
                                </tr>
                                <tr>
                                    <th>DCBL FACTORY-DALMIAPURAM</th>
                                </tr>
                                <tr style={{ height: '70px' }}>
                                    <td>TAMILNADU</td>
                                </tr>
                            </tbody>
                        </table>
                        <p>
                            <b>Bill Sequence: I000-0000126586</b>
                        </p>
                    </div>
                </div>
                <div style={{ clear: 'left', textAlign: 'left' }}>
                    <table style={{ width: '320px' }}>
                        <tbody>
                            <tr>
                                <th>Bill No: {lastBillNumber}</th>
                            </tr>
                            <tr>
                                <th>Bill Date: {dayjs().format('DD-MM-YYYY')}</th>
                            </tr>
                            <tr>
                                <th>For Dist. Channel: STOCK TRANSFER</th>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <th>WO Number: </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <br />
                <br />
                <div>
                    <b>
                        BEING TRANSPORTATION CHARGES OF CEMENT FROM DCBL FACTORY-DALMIAPURAM TO
                        DIFFERENT DESTINATIONS
                    </b>
                    <table style={{ width: '100%', marginTop: '20px' }}>
                        <tbody>
                            <tr>
                                <th>S.NO</th>
                                <th>BILL DATE</th>
                                <th>DO NO</th>
                                <th>SHIPPMENT NO</th>
                                <th>DESTINATION</th>
                                <th>TRUCK NO</th>
                                <th>QUANTITY</th>
                                <th>RATE</th>
                                <th>AMOUNT</th>
                                <th>SHORTAGE (KG)</th>
                                <th>REMARKS</th>
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
                            <tr style={{ fontWeight: 'bold' }}>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="tc">TOTAL VALUE</td>
                                <td className="tc">{total.totalFilledLoad}</td>
                                <td></td>
                                <td className="tc">{total.totalAmount}</td>
                                <td className="tc">{total.shortageQuantity}</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="footer df " style={{ alignItems: 'end' }}>
                    <div>
                        <p>No. Of Challans : {total.numberOfTrips}</p>
                        <p>
                            Rupees in Word :<b>&nbsp;{toWords.convert(total.totalAmount)}</b>
                        </p>
                        <p>
                            <b>GST will be paid by MAGNUM LOGISTICS</b>
                        </p>
                        <p>
                            <b>GSTIN : 33ABBFM2821M2ZD</b>
                        </p>
                        <p>
                            Whether Tax payment on Reverse Charge Basis : <span>No</span>
                        </p>
                    </div>
                    <p style={{ marginLeft: '20px' }}>
                        <b>FOR MAGNUM LOGISTICS</b>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default DalmiaAnnexure

const tableRow = (row: rowProps, index: number) => {
    return (
        <tr>
            <td className="tc">{index + 1}</td>
            <td className="tc">{dayjs().format('DD/MM/YYYY')}</td>
            <td></td>
            <td></td>
            <td className="tc">
                {row.loadingPoint.name} -
                {row.unloadingPoint ? row.unloadingPoint.name : row.stockPoint.name}
            </td>
            <td className="tc">{row.truck.vehicleNumber}</td>
            <td className="tc">{row.filledLoad}</td>
            <td className="tc">{row.freightAmount}</td>
            <td className="tc">{(row.filledLoad * row.freightAmount).toFixed(2)}</td>
            <td className="tc">{row.overallTrip[0].shortageQuantity[0].shortageQuantity}</td>
            <td></td>
        </tr>
    )
}

const tableRowForStockToUnloading = (row: StockToUnloadingPointProps, index: number) => {
    return (
        <tr>
            <td className="tc">{index + 1}</td>
            <td className="tc">{dayjs().format('DD/MM/YYYY')}</td>
            <td></td>
            <td></td>
            <td className="tc">
                {row.loadingPointToStockPointTrip.stockPoint.name} - {row.unloadingPoint.name}
            </td>
            <td className="tc">{row.loadingPointToStockPointTrip.truck.vehicleNumber}</td>
            <td className="tc">{row.loadingPointToStockPointTrip.filledLoad}</td>
            <td className="tc">{row.freightAmount}</td>
            <td className="tc">
                {(row.loadingPointToStockPointTrip.filledLoad * row.freightAmount).toFixed(2)}
            </td>
            <td className="tc">{row.overallTrip[0].shortageQuantity[0].shortageQuantity}</td>
            <td></td>
        </tr>
    )
}
