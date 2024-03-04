import { FC } from 'react'
import dayjs from 'dayjs'
import {
    AnnexureProps,
    InvoiceProps,
    LoadingToStockPointProps,
    LoadingToUnloadingPointProps,
    StockToUnloadingPointProps
} from '../../interface'

// const getFreightAmount = (trip: InvoiceProps) => {
//     return trip.loadingPointToStockPointTrip !== null ? trip.stockPointToUnloadingPointTrip.freightAmount : trip.loadingPointToUnloadingPointTrip.freightAmount
// }
const ChettinadAnnexure: FC<AnnexureProps> = ({ tripDetails, lastBillNumber, total }) => {
    console.log(tripDetails)
    return (
        <section style={{ padding: '20px' }} id="main_2">
            <main className="chettinad_main">
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
                            <div>{lastBillNumber}</div>
                        </div>
                        <div className="list">
                            <div>
                                <div>DATE</div>
                                <div>:</div>
                            </div>
                            <div>{dayjs().format('DD-MM-YYYY')}</div>
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
                            {tripDetails.map((trip: InvoiceProps, index: number) => {
                                if (
                                    trip.stockPointToUnloadingPointTrip !== null &&
                                    trip.stockPointToUnloadingPointTrip !== undefined
                                )
                                    return loadingToStockTable(trip, index)
                                else if (
                                    trip.loadingPointToUnloadingPointTrip !== null &&
                                    trip.loadingPointToUnloadingPointTrip !== undefined
                                )
                                    return loadingToUnloadingTable(
                                        trip.loadingPointToUnloadingPointTrip,
                                        index
                                    )
                            })}
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
                            <p>{tripDetails.length}</p>
                        </div>
                        <div className="info">
                            <p>GST will be paid by Magnum Logistics</p>
                            <p>GSTIN:33ABBFM2821M2ZD</p>
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

const loadingToUnloadingTable = (
    trip: LoadingToUnloadingPointProps | LoadingToStockPointProps,
    index: number
) => {
    console.log(index)

    return (
        <tr>
            <td>1</td>
            <td>{trip.startDate}</td>
            <td>KW20175903</td>
            <td>Chettinad Cement</td>
            <td>Chandapura TDP</td>
            <td>{trip.truck.vehicleNumber}</td>
            <td>39.750</td>
            <td>n</td>
            <td>51,675.00</td>
        </tr>
    )
}

const tableRowForStockToUnloading = (stockTrip: StockToUnloadingPointProps, index: number) => {
    console.log(stockTrip, index)

    return (
        <tr>
            <td>1</td>
            <td>20-01-2024</td>
            <td>KW20175903</td>
            <td>Chettinad Cement</td>
            <td>Chandapura TDP</td>
            <td>KA01AJ2855</td>
            <td>39.750</td>
            <td>n</td>
            <td>51,675.00</td>
        </tr>
    )
}

const loadingToStockTable = (trip: InvoiceProps, index: number) => {
    return (
        <>
            {loadingToUnloadingTable(trip.loadingPointToStockPointTrip, index)}
            {tableRowForStockToUnloading(trip.stockPointToUnloadingPointTrip, index)}
        </>
    )
}
