import { useEffect, useState } from 'react'
import { tripDetailsProps } from '../../list'
import './style.css'
import { getInvoiceDetails } from '../../../../services/invoice'
import { LoadingToStockPointProps, StockToUnloadingPointProps } from '../../interface'
import { epochToMinimalDate } from '../../../../../commonUtils/epochToTime'
import dayjs from 'dayjs'
import { InvoiceProp as tripProps } from '../../interface'
import signature from '../signature.png'
import { toWords } from '../numberToWords'
import { financialYear } from '../financialYear'
import { Box, CircularProgress } from '@mui/material'
import { Nullable } from '../../../../../types'
export interface InvoiceProps {
    tripId: tripDetailsProps[]
    lastBillNumber: string
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    loading: boolean
}
export interface UltraTechProps {
    tripId: tripDetailsProps[]
    company: Nullable<string>
    setActivate: React.Dispatch<React.SetStateAction<boolean>>
    updateInvoice: () => void
    lastBillNumber: string
}
const UltraTechAPCW: React.FC<InvoiceProps> = ({ tripId, lastBillNumber, setLoading, loading }) => {
    const [trip, setTrip] = useState<tripProps>()
    let totalFilledLoad = 0
    let totalAmount = 0
    useEffect(() => {
        getInvoiceDetails(tripId)
            .then((data) => setTrip({ ...data }))
            .then(() => setLoading(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <main className="main" id="ultratech_main">
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
                        <p className="tax">
                            WHETHER TAX IS PAYBLE UNDER REVERSE CHARGE MECHANISIM : - NO
                        </p>
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
                                <h2>Bill No:- {lastBillNumber}</h2>
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
                                {trip &&
                                    trip?.loadingPointToUnloadingPointTrip.map(
                                        (loadingToUnloading, index) => {
                                            totalAmount +=
                                                loadingToUnloading.freightAmount *
                                                loadingToUnloading.filledLoad
                                            totalFilledLoad += loadingToUnloading.filledLoad
                                            return tableRow(loadingToUnloading, index)
                                        }
                                    )}
                                {trip &&
                                    trip?.loadingPointToStockPointTrip.map(
                                        (loadingToStock, index) => {
                                            totalAmount +=
                                                loadingToStock.freightAmount *
                                                loadingToStock.filledLoad
                                            totalFilledLoad += loadingToStock.filledLoad
                                            return tableRow(loadingToStock, index)
                                        }
                                    )}
                                {trip &&
                                    trip?.stockPointToUnloadingPointTrip.map(
                                        (stockToUnloading, index) => {
                                            totalAmount +=
                                                stockToUnloading.freightAmount *
                                                stockToUnloading.loadingPointToStockPointTrip
                                                    .filledLoad
                                            totalFilledLoad +=
                                                stockToUnloading.loadingPointToStockPointTrip
                                                    .filledLoad
                                            return tableRowForStockToUnloading(
                                                stockToUnloading,
                                                index
                                            )
                                        }
                                    )}
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
                                    <td>
                                        <b>{totalAmount}</b>
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
                            We hereby declare that though our aggregate turnover in any preceding
                            financial year from 2017-18 onwards is more than the aggregate turnover
                            notified under sub-rule (4) of rule 48, we are not required to prepare
                            an invoice in terms of the provisions of the said sub-rule.
                        </h4>
                        <br />
                        <h4>
                            Declaration:- I/we have taken registration under the CGST Act, 2017 and
                            have exercised the option to pay tax on services of GTA in relation to
                            transport of goods supplied by us during the Financial Year{' '}
                            {financialYear} under forward charge.
                        </h4>
                    </div>
                    <div className="digital-signature">
                        <div style={{ display: 'flex', alignItems: 'baseline' }}>
                            <h5 style={{ marginRight: '5px' }}>For</h5>
                            <h4>MAGNUM LOGISTICS</h4>
                        </div>
                        <img src={signature} alt="signature" />
                        <h5>Authorized Signatory</h5>
                    </div>
                </main>
            )}
        </>
    )
}
export default UltraTechAPCW

const tableRow = (row: LoadingToStockPointProps, index: number) => {
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

const tableRowForStockToUnloading = (row: StockToUnloadingPointProps, index: number) => {
    return (
        <tr>
            <td>{index + 1}</td>
            <td>6993354494</td>
            <td>763- 8937 5 76 77</td>
            <td>{epochToMinimalDate(row.startDate)}</td>
            <td />
            <td>{row.unloadingPoint.name}</td>
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
