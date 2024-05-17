import { FC, useContext } from 'react'
import { AnnexureProps, StockToUnloadingPointProps, rowProps } from '../../interface'
import { epochToMinimalDate } from '../../../../../commonUtils/epochToTime'
import { billNoContext } from '../../invoiceContext'

const ChettinadAnnexure: FC<AnnexureProps> = ({ tripDetails, total }) => {
    const { invoiceValues } = useContext(billNoContext)
    return (
        <section style={{ padding: '20px' }} id="chettinad_annexure_main">
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
                            <div>{invoiceValues.billNo}</div>
                        </div>
                        <div className="list">
                            <div>
                                <div>DATE</div>
                                <div>:</div>
                            </div>
                            <div>{epochToMinimalDate(invoiceValues.date)}</div>
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
                                <td colSpan={6}>
                                    <h4>Total</h4>
                                </td>
                                <td>
                                    <h4>{total.totalFilledLoad}</h4>
                                </td>
                                <td />
                                <td>
                                    <h4>{total.totalAmount}</h4>
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

const tableRow = (row: rowProps, index: number) => {
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{epochToMinimalDate(row.startDate)}</td>
            <td>{row.invoiceNumber}</td>
            <td>{row.partyName}</td>
            <td>{row.unloadingPoint ? row.unloadingPoint.name : row.stockPoint.name}</td>
            <td>{row.truck.vehicleNumber}</td>
            <td>{row.filledLoad}</td>
            <td>{row.freightAmount}</td>
            <td>{(row.filledLoad * row.freightAmount).toFixed(2)}</td>
        </tr>
    )
}

const tableRowForStockToUnloading = (row: StockToUnloadingPointProps, index: number) => {
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{epochToMinimalDate(row.startDate)}</td>
            <td>{row.invoiceNumber}</td>
            <td>{row.partyName}</td>
            <td>{row.unloadingPoint.name}</td>
            <td>{row.loadingPointToStockPointTrip.truck.vehicleNumber}</td>
            <td>{row.loadingPointToStockPointTrip.filledLoad}</td>
            <td>{row.freightAmount}</td>
            <td>{(row.loadingPointToStockPointTrip.filledLoad * row.freightAmount).toFixed(2)}</td>
        </tr>
    )
}
