import React from 'react'
import { FC } from 'react'
import { epochToMinimalDate } from '../epochToNormal'
import { AnnexureProps, LoadingTripProps, StockToUnloadingPointProps } from '../type'
import { checkBillingRate } from '../calculateTotal'

const tableRow = (row: LoadingTripProps, index: number) => {
    const billingRate = checkBillingRate(row.billingRate)
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{epochToMinimalDate(row.startDate)}</td>
            <td>{row.invoiceNumber}</td>
            <td>{row.partyName}</td>
            <td>{row.unloadingPoint ? row.unloadingPoint.name : row.stockPoint?.name}</td>
            <td>{row.overallTrip[0].truck?.vehicleNumber}</td>
            <td>{row.filledLoad.toFixed(2)}</td>
            <td>{billingRate.toFixed(2)}</td>
            <td>{(row.filledLoad * billingRate).toFixed(2)}</td>
        </tr>
    )
}

const tableRowForStockToUnloading = (row: StockToUnloadingPointProps, index: number) => {
    const billingRate = checkBillingRate(row.billingRate)
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{epochToMinimalDate(row.startDate)}</td>
            <td>{row.invoiceNumber}</td>
            <td>{row.partyName}</td>
            <td>{row.unloadingPoint.name}</td>
            <td>{row.overallTrip[0].truck?.vehicleNumber}</td>
            <td>{row.loadingPointToStockPointTrip.filledLoad.toFixed(2)}</td>
            <td>{billingRate.toFixed(2)}</td>
            <td>{(row.loadingPointToStockPointTrip.filledLoad * billingRate).toFixed(2)}</td>
        </tr>
    )
}

const ChettinadAnnexure: FC<AnnexureProps> = ({ trip, total, bill }) => {
    return (
        <section style={{ padding: '20px' }} id="annexure">
            <main className="chettinad_annexure_main">
                <div className="header">
                    <div className="magnum-address">
                        <h2>MAGNUM LOGISTICS</h2>
                        <p>30/A, Attayampalayam, Anthetti Thottam, Gangapuram</p>
                        <p>Erode(Dt), Tamilnadu-638 102, Ph: 8220018402</p>
                        <p>Email Id : magnumlogistics.erd@gmail.com</p>
                    </div>
                </div>
                <div className="margin">
                    <div className="company-address">
                        <h4>TO</h4>
                        <p>Chettinad Cement Corpn Ltd.,</p>
                        <p>Rani Meyyammai Nagar,Karikkali,</p>
                        <p>Vedasandur.TK, Dindigul.DT-62470</p>
                        <p>Karikkali.</p>
                    </div>
                    <div className="magnum-details">
                        <div className="list">
                            <div>
                                <div>BILL NO</div>
                                <div>:</div>
                            </div>
                            <div>{bill.billNo}</div>
                        </div>
                        <div className="list">
                            <div>
                                <div>DATE</div>
                                <div>:</div>
                            </div>
                            <div>{epochToMinimalDate(bill.date)}</div>
                        </div>
                        <div className="list">
                            <div>
                                <div>PAN No</div>
                                <div>:</div>
                            </div>
                            <div>ABBFM2821M2</div>
                        </div>
                        <div className="list">
                            <div>
                                <div>GST No</div>
                                <div>:</div>
                            </div>
                            <div>33ABBFM2821M2ZD</div>
                        </div>
                        <div className="list">
                            <div>
                                <div>Vendor Code</div>
                                <div>:</div>
                            </div>
                            <div>3600428</div>
                        </div>
                    </div>
                </div>
                <div className="table">
                    <table>
                        <tbody>
                            <tr>
                                <th>S.NO</th>
                                <th>DATE</th>
                                <th>INVOICE NO</th>
                                <th>PARTY NAME</th>
                                <th>DESTINATION</th>
                                <th>TRUCK NO</th>
                                <th>Inv Qty</th>
                                <th>RATE/TON</th>
                                <th>FREIGHT</th>
                            </tr>
                            {trip.loadingPointToUnloadingPointTrip &&
                                trip.loadingPointToUnloadingPointTrip.map(
                                    (loadingToUnloading, index) => {
                                        return tableRow(loadingToUnloading, index)
                                    }
                                )}
                            {trip.loadingPointToStockPointTrip &&
                                trip.loadingPointToStockPointTrip.map((loadingToStock, index) => {
                                    return tableRow(loadingToStock, index)
                                })}
                            {trip.stockPointToUnloadingPointTrip &&
                                trip.stockPointToUnloadingPointTrip.map(
                                    (stockToUnloading, index) => {
                                        return tableRowForStockToUnloading(stockToUnloading, index)
                                    }
                                )}
                            <tr>
                                <td colSpan={6}>
                                    <h4>Total</h4>
                                </td>
                                <td>
                                    <h4>{total.totalFilledLoad.toFixed(2)}</h4>
                                </td>
                                <td />
                                <td>
                                    <h4>{total.totalAmount.toFixed(2)}</h4>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="footer">
                    <div className="details">
                        <div className="total">
                            <p>No of Challans :</p>
                            <p>{total.numberOfTrips}</p>
                        </div>
                        <div className="info">
                            <p>GST will be paid by Magnum Logistics</p>
                            <p>GSTIN : 33ABBFM2821M2ZD</p>
                        </div>
                        <div>
                            <p>Whether Tax Payment On Reverse charge Basis : NO</p>
                        </div>
                    </div>
                    <div className="sign">
                        <p>For Magnum Logistics</p>
                    </div>
                </div>
            </main>
        </section>
    )
}

export default ChettinadAnnexure
