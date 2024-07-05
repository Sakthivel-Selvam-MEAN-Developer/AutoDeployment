import React, { FC } from 'react'
import { InvoiceProp, LoadingTripProps, StockToUnloadingPointProps, totalProps } from '../type.tsx'
import { epochToMinimalDate } from '../epochToNormal.ts'

interface AnnexureProps {
    trip: InvoiceProp['trips']
    total: totalProps
    bill: { billNo: string; date: number }
}

const tableRow = (row: LoadingTripProps, index: number) => (
    <tr>
        <td>{index + 1}</td>
        <td>{epochToMinimalDate(row.startDate)}</td>
        <td>{row.invoiceNumber}</td>
        <td>{row.partyName}</td>
        <td>{row.unloadingPoint ? row.unloadingPoint.name : row.stockPoint?.name}</td>
        <td>{row.truck.vehicleNumber}</td>
        <td>{row.filledLoad.toFixed(2)}</td>
        <td>22</td>
        <td>{row.freightAmount.toFixed(2)}</td>
        <td>{(row.filledLoad * row.freightAmount).toFixed(2)}</td>
    </tr>
)
type tableRowForStockToUnloadingProps = (
    row: StockToUnloadingPointProps,
    index: number
) => React.ReactNode
const tableRowForStockToUnloading: tableRowForStockToUnloadingProps = (row, index) => (
    <tr>
        <td>{index + 1}</td>
        <td>{epochToMinimalDate(row.startDate)}</td>
        <td>{row.invoiceNumber}</td>
        <td>{row.partyName}</td>
        <td>{row.unloadingPoint.name}</td>
        <td>{row.loadingPointToStockPointTrip.truck.vehicleNumber}</td>
        <td>{row.loadingPointToStockPointTrip.filledLoad.toFixed(2)}</td>
        <td>22</td>
        <td>{row.freightAmount.toFixed(2)}</td>
        <td>{(row.loadingPointToStockPointTrip.filledLoad * row.freightAmount).toFixed(2)}</td>
    </tr>
)

const ChettinadAriyalurAnnexure: FC<AnnexureProps> = ({ trip, total, bill }) => (
    <section style={{ padding: '20px' }} id="annexure">
        <style
            dangerouslySetInnerHTML={{
                __html: "\n.chettinad-main *,\n.chettinad-ariyalur-main *,\n.chettinad_annexure_main * {\n    color: #000;\n    padding: 0;\n    margin: 0;\n    box-sizing: border-box;\n    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode',\n        Geneva, Verdana, sans-serif;\n}\n#chettinad-karikali-section,\n#chettinad-ariyalur-section {\n    padding: 100px 50px !important;\n}\n.chettinad-section {\n    font-weight: 600;\n    padding: 40px;\n}\n.chettinad-main div {\n    width: 100%;\n}\n.chettinad-main .head {\n    text-align: center;\n    background-color: #80808063;\n}\n.chettinad-main .date > *,\n.chettinad-main .date div > * {\n    flex: 1;\n}\n.chettinad-main .date {\n    width: 300px;\n}\n.chettinad-main .billing-address {\n    justify-content: space-between;\n}\n.chettinad-main .amount > * {\n    flex: 1 !important;\n}\n.chettinad-ariyalur-main .details div > *,\n.chettinad-ariyalur-main .gst > * {\n    flex: 1;\n}\n\n/* Chettinad Annexure Styles */\n#chettinad_annexure_main {\n    padding: 50px 20px !important;\n}\n.chettinad_annexure_main * {\n    padding: 0;\n    margin: 0;\n}\n\n.chettinad_annexure_main .header {\n    display: flex;\n    align-items: center;\n    flex-direction: column;\n}\n\n.chettinad_annexure_main .header .magnum-address {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    margin: 10px 0 !important;\n    padding: 20px !important;\n}\n\n.chettinad_annexure_main .header .magnum-address * {\n    padding: 5px;\n}\n\n.chettinad_annexure_main .margin {\n    padding: 5px;\n    display: flex;\n    justify-content: end;\n}\n\n.chettinad_annexure_main .margin > *,\n.chettinad_annexure_main .margin .magnum-details .list > *,\n.chettinad_annexure_main .footer .total > * {\n    flex: 1;\n}\n\n.chettinad_annexure_main .margin .company-address * {\n    padding: 5px;\n}\n\n.chettinad_annexure_main .margin .magnum-details * {\n    display: flex;\n    align-items: center;\n}\n\n.chettinad_annexure_main .margin .magnum-details {\n    display: flex;\n    align-items: end;\n    flex-direction: column;\n}\n\n.chettinad_annexure_main .margin .magnum-details .list {\n    padding: 5px;\n    justify-content: space-between;\n    width: 400px;\n}\n\n.chettinad_annexure_main td,\n.chettinad_annexure_main th {\n    padding: 5px !important;\n    text-align: center;\n}\n\n.chettinad_annexure_main table,\n.chettinad_annexure_main th,\n.chettinad_annexure_main td {\n    border-collapse: collapse;\n    border: 1px solid black;\n}\n.chettinad_annexure_main table {\n    width: 100%;\n    margin: 40px 0 !important;\n}\n\n.chettinad_annexure_main .footer {\n    display: flex;\n    justify-content: space-between;\n}\n\n.chettinad_annexure_main .footer * {\n    padding-bottom: 8px;\n}\n\n.chettinad_annexure_main .footer .total {\n    display: flex;\n    justify-content: space-between;\n}\n\n.chettinad_annexure_main .footer .info {\n    display: flex;\n    flex-direction: column;\n}\n\n.chettinad_annexure_main .footer .sign {\n    display: flex;\n    align-items: end;\n}\n\n/* Common Styles */\n\n.df-fc {\n    display: flex;\n    flex-direction: column;\n}\n.df {\n    display: flex;\n}\n.bl {\n    border-left: 2px solid black;\n}\n.br {\n    border-right: 2px solid black;\n}\n.bt {\n    border-top: 2px solid black;\n}\n.bb {\n    border-bottom: 2px solid black;\n}\n.pt {\n    padding-top: 5px;\n}\n.pb {\n    padding-bottom: 5px;\n}\n.pl {\n    padding-left: 5px;\n}\n.pr {\n    padding-right: 5px;\n}\n.p-5 {\n    padding: 5px;\n}\n.p-2 {\n    padding: 2px;\n}\n.ai {\n    align-items: center;\n}\n.ae {\n    align-items: end;\n}\n.ta {\n    text-align: center;\n}\n.jc {\n    justify-content: center;\n}\n.jsp {\n    justify-content: space-between;\n}\n.jsa {\n    justify-content: space-around;\n}\n.te {\n    text-align: end;\n}\n.je {\n    justify-content: end;\n}\n.bg {\n    background-color: #00000021;\n}\n"
            }}
        />
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
                    <p>Keelapaluvur,Ariyalur Dist-621707</p>
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
                            <th>SHIP TO PARTY</th>
                            <th>DESTINATION</th>
                            <th>TRUCK NO</th>
                            <th>Inv Qty</th>
                            <th>W.NO</th>
                            <th>RATE/TON</th>
                            <th>FREIGHT</th>
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
                        <tr>
                            <td colSpan={6}>
                                <h4>Total</h4>
                            </td>
                            <td>
                                <h4>{total.totalFilledLoad.toFixed(2)}</h4>
                            </td>
                            <td />
                            <td />
                            <td>
                                <h4>{Math.round(total.totalAmount).toFixed(2)}</h4>
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

export default ChettinadAriyalurAnnexure
