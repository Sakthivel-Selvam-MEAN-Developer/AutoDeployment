import { useEffect, useState } from 'react'
import { tripDetailsProps } from '../../list'
import './style.css'
import { getInvoiceDetails } from '../../../../services/invoice'
import { stockToUnloadingProps, tripDetailProps } from '../../interface'
import { epochToMinimalDate } from '../../../../../commonUtils/epochToTime'
import { ToWords } from 'to-words'
import dayjs from 'dayjs'
// @ts-expect-error import image
import signature from '../signature.png'
export interface UltreaTechProps {
    tripId: tripDetailsProps[]
    company: string
}
const UltraTech_APCW: React.FC<UltreaTechProps> = ({ tripId, company }) => {
    console.log(company)
    const [trip, setTrip] = useState([])
    let totalFilledLoad = 0
    let totalAmount = 0
    useEffect(() => {
        const id = tripId.map((trip) => trip.overallTripId)
        getInvoiceDetails(id).then(setTrip)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const financialYear =
        dayjs().month() < 3
            ? `${dayjs().year() - 1}-${dayjs().year()}`
            : `${dayjs().year()}-${dayjs().year() + 1}`
    const toWords = new ToWords({
        localeCode: 'en-IN',
        converterOptions: {
            currency: true,
            ignoreDecimal: false,
            ignoreZeroCurrency: false,
            doNotAddOnly: false,
            currencyOptions: {
                name: 'Rupee',
                plural: 'Rupees',
                symbol: '₹',
                fractionalUnit: {
                    name: 'Paisa',
                    plural: 'Paisa',
                    symbol: ''
                }
            }
        }
    })
    return (
        <main className="main" id="main">
            <div className="header">
                <p>CIN : 0</p>
                <p>TAX INVOICE</p>
                <div className="magnum-address">
                    <h1>MAGNUM LOGISTICS</h1>
                    <p>201 BANGALOW THOTTAM,KADAPANALLUR POST,BHAVANI ERODE,ERODE,638311</p>
                </div>
                <div className="details">
                    <p>PAN : ASNAIIBSB</p>
                    <p>GSTN : ASKJAHSKJHSJKS</p>
                    <p>STATE : TAMILNADU</p>
                    <p>STATE CODE : 33</p>
                </div>
                <p className="tax">WHETHER TAX IS PAYBLE UNDER REVERSE CHARGE MECHANISIM : - NO</p>
            </div>
            <div className="title">
                <p>Transportation Freight Bill</p>
            </div>
            <div className="place-of-supply">
                <p>PLACE OF SUPPLY - Tamil Nadu</p>
                <p>HSN/SAC CODE : 91729</p>
            </div>
            <div className="address">
                <div className="customer">
                    <div>
                        <h4>M/s ULTRATECH CEMENT LIMITED</h4>
                        <h4>Unit:- APCW</h4>
                        <h4>PO:- BHOGASAMUDRAM, Tehsil : - TADIPATRI</h4>
                        <h4>Dist:- ANANTAPUR</h4>
                    </div>
                    <div className="state-details">
                        <h4>State Name:- Andhra Pradesh (new)</h4>
                        <h4>State code:- 37</h4>
                        <h4>GSTN:- 37AAACL6442L1Z9</h4>
                        <h4>PAN NO:- AAACL6442L</h4>
                    </div>
                </div>
                <div className="vendor">
                    <div>
                        <h4>Generation Date:- {dayjs().format('DD-MM-YYYY')} </h4>
                        <h4>Vendor Code:- 0002406621 </h4>
                        <h4>Vendor Name:- MAGNUM LOGISTICS</h4>
                        <h2>Bill No:- MGL23A-267</h2>
                    </div>
                    <div className="flag">
                        <h4>FLAG:- Y </h4>
                        <h4> Bill Date:- {dayjs().format('DD-MM-YYYY')}</h4>
                    </div>
                </div>
            </div>
            <div className="table">
                <table>
                    <tbody>
                        <tr>
                            <th>SR No </th>
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
                        {trip.map((data: tripDetailProps, index: number) => {
                            if (
                                data.stockPointToUnloadingPointTrip !== null &&
                                data.stockPointToUnloadingPointTrip !== undefined
                            ) {
                                totalFilledLoad +=
                                    data.stockPointToUnloadingPointTrip.loadingPointToStockPointTrip
                                        .filledLoad * 2
                                totalAmount +=
                                    data.loadingPointToStockPointTrip.filledLoad *
                                        data.loadingPointToStockPointTrip.freightAmount +
                                    data.loadingPointToStockPointTrip.filledLoad *
                                        data.stockPointToUnloadingPointTrip.freightAmount
                                return loadingToStockTable(data, index)
                            } else if (
                                data.loadingPointToUnloadingPointTrip !== null &&
                                data.loadingPointToUnloadingPointTrip !== undefined
                            ) {
                                totalFilledLoad += data.loadingPointToUnloadingPointTrip.filledLoad
                                totalAmount +=
                                    data.loadingPointToUnloadingPointTrip.filledLoad *
                                    data.loadingPointToUnloadingPointTrip.freightAmount
                                return tableRow(data.loadingPointToUnloadingPointTrip, index)
                            }
                        })}
                        <tr>
                            <td colSpan={8} style={{ textAlign: 'left' }}>
                                <h4>Total</h4>
                            </td>
                            <td>
                                <b>{totalFilledLoad}</b>
                            </td>
                            <td />
                            <td>
                                <b>{totalAmount}</b>
                            </td>
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td>{totalAmount}</td>
                        </tr>
                        <tr>
                            <td colSpan={16} style={{ textAlign: 'left' }}>
                                <h4>IGST 12.0%</h4>
                            </td>
                            <td>{totalAmount * 0.12}</td>
                        </tr>
                        <tr>
                            <td colSpan={16} style={{ textAlign: 'left' }}>
                                <h4>Grand Total</h4>
                            </td>
                            <td>{totalAmount * 0.12 + totalAmount}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="amount-in-words">
                <h4>
                    Amount in words:-{' '}
                    {toWords.convert(totalAmount * 0.12 + totalAmount, { currency: true })}
                </h4>
            </div>
            <div className="pay-GST">
                <h4>Person Liable to Pay GST : - MAGNUM LOGISTIC</h4>
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
                <img src={signature} alt="" />
                <h5>Authorized Signatory</h5>
            </div>
        </main>
    )
}
export default UltraTech_APCW

const tableRow = (row: any, index: number) => {
    return (
        <tr>
            <td>{index + 1}</td>
            <td>6993354494</td>
            <td>763- 8937 5 76 77</td>
            <td>{epochToMinimalDate(row.startDate)}</td>
            <td />
            <td>{row.unloadingPoint ? row.unloadingPoint.name : row.stockPoint.name}</td>
            <td>{row.truck.vehicleNumber}</td>
            <td>5116</td>
            <td>{row.filledLoad}</td>
            <td>{row.freightAmount}</td>
            <td>{row.filledLoad * row.freightAmount}</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
    )
}

const tableRowForStockToUnloading = (row: stockToUnloadingProps, index: number) => {
    return (
        <tr>
            <td>{index + 1}</td>
            <td>6993354494</td>
            <td>763- 8937 5 76 77</td>
            <td>{epochToMinimalDate(row.startDate)}</td>
            <td />
            <td>
                {row.unloadingPoint
                    ? row.unloadingPoint.name
                    : row.loadingPointToStockPointTrip.stockPoint.name}
            </td>
            <td>{row.loadingPointToStockPointTrip.truck.vehicleNumber}</td>
            <td>5116</td>
            <td>{row.loadingPointToStockPointTrip.filledLoad}</td>
            <td>{row.freightAmount}</td>
            <td>{row.loadingPointToStockPointTrip.filledLoad * row.freightAmount}</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
    )
}

const loadingToStockTable = (row: tripDetailProps, index: number) => {
    return (
        <>
            {tableRow(row.loadingPointToStockPointTrip, index)}
            {tableRowForStockToUnloading(row.stockPointToUnloadingPointTrip, index)}
        </>
    )
}
