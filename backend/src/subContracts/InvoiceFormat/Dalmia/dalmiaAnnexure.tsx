import React, { FC } from 'react'
import './style.css'
import dayjs from 'dayjs'
import { toWords } from '../numberToWords.ts'
import { LoadingTripProps, StockToUnloadingPointProps } from '../type.tsx'
import { epochToMinimalDate } from '../epochToNormal.ts'
import { dalmiaProps } from './dalmiaKadapa.tsx'

const tableRow = (row: LoadingTripProps, index: number) => (
    <tr>
        <td className="tc">{index + 1}</td>
        <td className="tc">{dayjs().format('DD/MM/YYYY')}</td>
        <td></td>
        <td>{row.lrNumber}</td>
        <td className="tc">
            {row.loadingPoint.name} -
            {row.unloadingPoint ? row.unloadingPoint.name : row.stockPoint?.name}
        </td>
        <td className="tc">{row.truck.vehicleNumber}</td>
        <td className="tc">{row.filledLoad.toFixed(2)}</td>
        <td className="tc">{row.freightAmount.toFixed(2)}</td>
        <td className="tc">{(row.filledLoad * row.freightAmount).toFixed(2)}</td>
        <td className="tc">
            {row.overallTrip[0].shortageQuantity.length > 0
                ? row.overallTrip[0].shortageQuantity[0].shortageQuantity.toFixed(2)
                : 0}
        </td>
        <td></td>
    </tr>
)

const tableRowForStockToUnloading = (row: StockToUnloadingPointProps, index: number) => (
    <tr>
        <td className="tc">{index + 1}</td>
        <td className="tc">{dayjs().format('DD/MM/YYYY')}</td>
        <td></td>
        <td>{row.lrNumber}</td>
        <td className="tc">
            {row.loadingPointToStockPointTrip.stockPoint.name} - {row.unloadingPoint.name}
        </td>
        <td className="tc">{row.loadingPointToStockPointTrip.truck.vehicleNumber}</td>
        <td className="tc">{row.loadingPointToStockPointTrip.filledLoad.toFixed(2)}</td>
        <td className="tc">{row.freightAmount.toFixed(2)}</td>
        <td className="tc">
            {(row.loadingPointToStockPointTrip.filledLoad * row.freightAmount).toFixed(2)}
        </td>
        <td className="tc">
            {row.overallTrip[0].shortageQuantity.length > 0
                ? row.overallTrip[0].shortageQuantity[0].shortageQuantity.toFixed(2)
                : 0}
        </td>
        <td></td>
    </tr>
)

const DalmiaAnnexure: FC<dalmiaProps> = ({ trip, bill, total }) => (
    <section id="annexure">
        <style
            dangerouslySetInnerHTML={{
                __html: "\n.dalmia_kadappa_main,\n.dalmia_annexure_main,\n.dalmia_dalmiapuram_main {\n    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode',\n        Geneva, Verdana, sans-serif;\n    color: black;\n}\n\n.dalmia_annexure_main table,\n.dalmia_annexure_main th,\n.dalmia_annexure_main td,\n.dalmia_dalmiapuram_main table,\n.dalmia_dalmiapuram_main th,\n.dalmia_dalmiapuram_main td,\n.dalmia_kadappa_main table,\n.dalmia_kadappa_main th,\n.dalmia_kadappa_main td {\n    border: 2px solid black;\n    border-collapse: collapse;\n}\n\n#dalmia_dalmiapuram_section,\n#dalmia_kadappa_section,\n#dalmia_annexure_section {\n    padding: 100px 50px !important;\n}\n\n.dalmia-head > * {\n    flex: 1;\n}\n\n.df {\n    display: flex;\n}\n\n.border {\n    border: none !important;\n    border-left: 2px solid black !important;\n    border-right: 2px solid black !important;\n}\n\n.border-top {\n    border: none !important;\n    border-left: 2px solid black !important;\n    border-right: 2px solid black !important;\n    border-top: 2px solid black !important;\n}\n\n.border-bottom {\n    border: none !important;\n    border-left: 2px solid black !important;\n    border-right: 2px solid black !important;\n    border-bottom: 2px solid black !important;\n}\n\n.dalmia_annexure_main .bg,\n.dalmia_kadappa_main .bg,\n.dalmia_dalmiapuram_main .bg {\n    background-color: #bfbfbf;\n}\n\n.p-15 {\n    padding: 15px 0 !important;\n}\n.tc {\n    text-align: center;\n}\n\n.tr {\n    text-align: right;\n}\n\ntd,\nth {\n    padding: 3px;\n}\n\n.tc {\n    text-align: center;\n}\n\n.tl {\n    text-align: left;\n}\n\n.tr {\n    text-align: right;\n}\n\n"
            }}
        />
        <div className="dalmia_annexure_main" style={{ padding: '20px', margin: '20px' }}>
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
                            <th>Bill No: {bill.billNo}</th>
                        </tr>
                        <tr>
                            <th>Bill Date: {epochToMinimalDate(bill.date)}</th>
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
                        {trip.loadingPointToUnloadingPointTrip &&
                            trip.loadingPointToUnloadingPointTrip.map((loadingToUnloading, index) =>
                                tableRow(loadingToUnloading, index)
                            )}
                        {trip.loadingPointToStockPointTrip &&
                            trip.loadingPointToStockPointTrip.map((loadingToStock, index) =>
                                tableRow(loadingToStock, index)
                            )}
                        {trip.stockPointToUnloadingPointTrip &&
                            trip.stockPointToUnloadingPointTrip.map((stockToUnloading, index) =>
                                tableRowForStockToUnloading(stockToUnloading, index)
                            )}
                        <tr style={{ fontWeight: 'bold' }}>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className="tc">TOTAL VALUE</td>
                            <td className="tc">{total.totalFilledLoad.toFixed(2)}</td>
                            <td></td>
                            <td className="tc">{total.totalAmount.toFixed(2)}</td>
                            <td className="tc">{total.shortageQuantity.toFixed(2)}</td>
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

export default DalmiaAnnexure
