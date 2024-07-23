import './style.css'
import dayjs from 'dayjs'
import React from 'react'
import { InvoiceProp, LoadingTripProps, StockToUnloadingPointProps } from '../type.tsx'
import { financialYear } from '../financialYear.ts'
import { epochToMinimalDate } from '../epochToNormal.ts'
import { toWords } from '../numberToWords.ts'
import { cutomInvoiceDetails } from '../customInvoiceAddress.ts'
import { checkBillingRate } from '../calculateTotal.tsx'
export interface AddressDetails {
    address: string
}
export interface InvoiceProps {
    address: AddressDetails | undefined
    trip: InvoiceProp['trips']
    bill: { billNo: string; date: number }
}
const tableRow = (row: LoadingTripProps, index: number) => {
    const billingRate = checkBillingRate(row.billingRate)
    console.log(
        row.loadingPoint.cementCompany.quantityType === 'Loading Quantity'
            ? row.filledLoad
            : row.overallTrip[0].shortageQuantity[0].unloadedQuantity
    )
    return (
        <tr key={row.invoiceNumber}>
            <td>{index + 1}</td>
            <td>{row.invoiceNumber}</td>
            <td>{row.lrNumber}</td>
            <td>{epochToMinimalDate(row.startDate)}</td>
            <td>{row.partyName}</td>
            <td>{row.unloadingPoint ? row.unloadingPoint.name : row.stockPoint?.name}</td>
            <td>{row.overallTrip[0]?.truck?.vehicleNumber}</td>
            <td>5116</td>
            <td>
                {(row.loadingPoint.cementCompany.quantityType === 'Loading Quantity'
                    ? row.filledLoad
                    : row.overallTrip[0].shortageQuantity[0].unloadedQuantity / 1000
                ).toFixed(2)}
            </td>
            <td>{billingRate.toFixed(2)}</td>
            <td>
                {(row.loadingPoint.cementCompany.quantityType === 'Loading Quantity'
                    ? row.filledLoad
                    : (row.overallTrip[0].shortageQuantity[0].unloadedQuantity / 1000) * billingRate
                ).toFixed(2)}
            </td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
    )
}

const tableRowForStockToUnloading = (row: StockToUnloadingPointProps, index: number) => {
    const billingRate = checkBillingRate(row.billingRate)
    return (
        <tr key={row.invoiceNumber}>
            <td>{index + 1}</td>
            <td>{row.invoiceNumber}</td>
            <td>{row.lrNumber}</td>
            <td>{epochToMinimalDate(row.startDate)}</td>
            <td>{row.partyName}</td>
            <td>{row.unloadingPoint.name}</td>
            <td>{row.overallTrip[0].truck.vehicleNumber}</td>
            <td>5116</td>
            <td>{row.loadingPointToStockPointTrip.filledLoad.toFixed(2)}</td>
            <td>{checkBillingRate(row.billingRate).toFixed(2)}</td>
            <td>{(row.loadingPointToStockPointTrip.filledLoad * billingRate).toFixed(2)}</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
    )
}

const CustomInvoice: React.FC<InvoiceProps> = ({ trip, bill }) => {
    let totalFilledLoad = 0
    let totalAmount = 0
    const billAddress = cutomInvoiceDetails(trip)
    return (
        <main className="main" id="invoice">
            <style
                dangerouslySetInnerHTML={{
                    __html: '\n.main * {\npadding: 0;\nmargin: 0;\nbox-sizing: border-box;\ncolor:black;}\n.main {\ncolor: black !important;\nmargin: 20px 30px;\npadding: 50px;\ndisplay: flex;\nflex-direction: column;\njustify-content: center;\n}\n\n.header {\ndisplay: flex;\nalign-items: center;\nflex-direction: column;\n}\n\n.header .magnum-address {\ndisplay: flex;\nflex-direction: column;\nalign-items: center;\nmargin: 10px 0 !important;\n}\n\n.header .details {\ndisplay: flex;\nmargin: 10px 0 !important;\n}\n\n.header .details p {\nmargin: 0 10px !important;\n}\n\n.header .tax {\nmargin: 10px 0 !important;\n}\n\n.title {\ndisplay: flex;\njustify-content: center;\n}\n\n.place-of-supply {\nmargin: 50px 0 !important;\ndisplay: flex;\njustify-content: space-between;\n}\n\n.address {\ndisplay: flex;\njustify-content: space-between;\n}\n\n.address .customer .state-details {\nmargin - top: 20px !important;\n}\n\n.address .vendor .flag {\nmargin - top: 20px !important;\n}\n\n.main td,\n.main th {\npadding: 5px !important;\ntext-align: center;\n}\n\n.main table,\n.main th,\n.main td {\nborder-collapse: collapse;\nborder: 1px solid black;\n}\n.main table {\nmargin: 40px 0 !important;\n}\n.table {\ndisplay: flex;\njustify-content: center;\nfont-size: 14px;\n}\n\n.pay-GST {\nmargin: 20px 0 !important;\n}\n\n.digital-signature {\nmargin - top: 30px !important;\ndisplay: flex;\njustify-content: end;\nflex-direction: column;\nalign-items: end;\n}\n\n'
                }}
            />
            <div className="header">
                <p>CIN : 0</p>
                <p>TAX INVOICE</p>
                <div className="magnum-address">
                    <h1>MAGNUM LOGISTICS</h1>
                    <p>201 BANGALOW THOTTAM,KADAPANALLUR POST,BHAVANI ERODE,ERODE,638311</p>
                </div>
                <div className="details">
                    <p>PAN : ABBFM2821M</p>
                    <p>GSTN : 33ABBFM2821M2ZD</p>
                    <p>STATE : TAMILNADU</p>
                    <p>STATE CODE : 33</p>
                </div>
                <p className="tax">WHETHER TAX IS PAYBLE UNDER REVERSE CHARGE MECHANISIM : - NO</p>
            </div>
            <div className="title">
                <p>Transportation Freight Bill</p>
            </div>
            <div className="place-of-supply"></div>
            <div className="address">
                <div dangerouslySetInnerHTML={{ __html: billAddress }} />
                <div className="vendor">
                    <div>
                        <h4>Generation Date:- {dayjs().format('DD-MM-YYYY')}</h4>
                        <h4>Vendor Name:- MAGNUM LOGISTICS</h4>
                        <h2>Bill No:- {bill.billNo}</h2>
                    </div>
                    <div className="flag">
                        <h4>Bill Date:- {epochToMinimalDate(bill.date)}</h4>
                    </div>
                </div>
            </div>
            <div className="table">
                <table>
                    <tbody>
                        <tr>
                            <th>SR No</th>
                            <th>DI no</th>
                            <th>LR No</th>
                            <th>Disp Date</th>
                            <th>Sold to Party</th>
                            <th>Destination</th>
                            <th>Truck No</th>
                            <th>Special Process Indicator</th>
                            <th>Qty</th>
                            <th>Rate</th>
                            <th>Freight Amount</th>
                            <th>Dedicated Freight</th>
                            <th>SAP Lead</th>
                            <th>Actual GPS Land</th>
                            <th>Difference</th>
                            <th>PTPK</th>
                            <th>Final Freight</th>
                        </tr>
                        {trip.loadingPointToUnloadingPointTrip &&
                            trip.loadingPointToUnloadingPointTrip.map(
                                (loadingToUnloading, index) => {
                                    const billingRate = checkBillingRate(
                                        loadingToUnloading.billingRate
                                    )
                                    totalAmount +=
                                        billingRate *
                                        (loadingToUnloading.loadingPoint.cementCompany
                                            .quantityType === 'Loading Quantity'
                                            ? loadingToUnloading.filledLoad
                                            : loadingToUnloading.overallTrip[0].shortageQuantity[0]
                                                  .unloadedQuantity / 1000)
                                    totalFilledLoad +=
                                        loadingToUnloading.loadingPoint.cementCompany
                                            .quantityType === 'Loading Quantity'
                                            ? loadingToUnloading.filledLoad
                                            : loadingToUnloading.overallTrip[0].shortageQuantity[0]
                                                  .unloadedQuantity / 1000
                                    return tableRow(loadingToUnloading, index)
                                }
                            )}
                        {trip.loadingPointToStockPointTrip &&
                            trip.loadingPointToStockPointTrip.map((loadingToStock, index) => {
                                const billingRate = checkBillingRate(loadingToStock.billingRate)
                                totalAmount +=
                                    billingRate *
                                    (loadingToStock.loadingPoint.cementCompany.quantityType ===
                                    'Loading Quantity'
                                        ? loadingToStock.filledLoad
                                        : loadingToStock.overallTrip[0].shortageQuantity[0]
                                              .unloadedQuantity / 1000)
                                totalFilledLoad +=
                                    loadingToStock.loadingPoint.cementCompany.quantityType ===
                                    'Loading Quantity'
                                        ? loadingToStock.filledLoad
                                        : loadingToStock.overallTrip[0].shortageQuantity[0]
                                              .unloadedQuantity / 1000
                                return tableRow(loadingToStock, index)
                            })}
                        {trip.stockPointToUnloadingPointTrip &&
                            trip.stockPointToUnloadingPointTrip.map((stockToUnloading, index) => {
                                const billingRate = checkBillingRate(stockToUnloading.billingRate)
                                totalAmount +=
                                    billingRate *
                                    (stockToUnloading.loadingPointToStockPointTrip.stockPoint
                                        .cementCompany.quantityType === 'Loading Quantity'
                                        ? stockToUnloading.loadingPointToStockPointTrip.filledLoad
                                        : stockToUnloading.overallTrip[0].shortageQuantity[0]
                                              .unloadedQuantity / 1000)
                                totalFilledLoad +=
                                    stockToUnloading.loadingPointToStockPointTrip.stockPoint
                                        .cementCompany.quantityType === 'Loading Quantity'
                                        ? stockToUnloading.loadingPointToStockPointTrip.filledLoad
                                        : stockToUnloading.overallTrip[0].shortageQuantity[0]
                                              .unloadedQuantity / 1000
                                return tableRowForStockToUnloading(stockToUnloading, index)
                            })}
                        <tr>
                            <td colSpan={8} style={{ textAlign: 'left' }}>
                                <h4>Total</h4>
                            </td>
                            <td>
                                <b>{totalFilledLoad.toFixed(2)}</b>
                            </td>
                            <td />
                            <td>
                                <b>{totalAmount.toFixed(2)}</b>
                            </td>
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td>
                                <b>{totalAmount.toFixed(2)}</b>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={16} style={{ textAlign: 'left' }}>
                                <h4>IGST 12.0%</h4>
                            </td>
                            <td>
                                <b>{(totalAmount * 0.12).toFixed(2)}</b>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={16} style={{ textAlign: 'left' }}>
                                <h4>Grand Total</h4>
                            </td>
                            <td>
                                <b>{(totalAmount * 0.12 + totalAmount).toFixed(2)}</b>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="amount-in-words">
                <h4>
                    Amount in words:-
                    {toWords.convert(totalAmount * 0.12 + totalAmount, { currency: true })}
                </h4>
            </div>
            <div className="pay-GST">
                <h4>Person Liable to Pay GST : - MAGNUM LOGISTICS</h4>
            </div>
            <div className="declaration">
                <h4>
                    We hereby declare that though our aggregate turnover in any preceding financial
                    year from 2017-18 onwards is more than the aggregate turnover notified under
                    sub-rule (4) of rule 48, we are not required to prepare an invoice in terms of
                    the provisions of the said sub-rule.
                </h4>
                <br />
                <h4>
                    Declaration:- I/we have taken registration under the CGST Act, 2017 and have
                    exercised the option to pay tax on services of GTA in relation to transport of
                    goods supplied by us during the Financial Year {financialYear} under forward
                    charge.
                </h4>
            </div>
            <div className="digital-signature">
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                    <h5 style={{ marginRight: '5px' }}>For</h5>
                    <h4>MAGNUM LOGISTICS</h4>
                </div>
                <div style={{ padding: '50px' }}></div>
                <h5>Authorized Signatory</h5>
            </div>
        </main>
    )
}

export default CustomInvoice
