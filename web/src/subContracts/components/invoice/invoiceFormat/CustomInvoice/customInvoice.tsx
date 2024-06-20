import { useContext, useEffect, useState } from 'react'
import { tripDetailsProps } from '../../list'
import './style.css'
import { getInvoiceDetails } from '../../../../services/invoice'
import { LoadingToStockPointProps, StockToUnloadingPointProps } from '../../interface'
import { epochToMinimalDate } from '../../../../../commonUtils/epochToTime'
import dayjs from 'dayjs'
import { InvoiceProp as tripProps } from '../../interface'
import { toWords } from '../numberToWords'
import { financialYear } from '../financialYear'
import { Box, CircularProgress } from '@mui/material'
import { Nullable } from '../../../../../types'
import { billNoContext, partyNamesContext, partyNamesProps } from '../../invoiceContext'
import { AddressDetails } from './CompanyAddress'
import { Company } from '../../companyConfig'

export interface InvoiceProps {
    tripId: tripDetailsProps[]
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    loading: boolean
    address: AddressDetails
}
export interface UltraTechProps {
    tripId: tripDetailsProps[]
    setTripId: React.Dispatch<React.SetStateAction<tripDetailsProps[]>>
    company: Nullable<Company>
    setActivate: React.Dispatch<React.SetStateAction<boolean>>
    updateInvoice: () => void
}
const CustomInvoice: React.FC<InvoiceProps> = ({ tripId, setLoading, loading, address }) => {
    const [trip, setTrip] = useState<tripProps>()
    const { invoiceValues } = useContext(billNoContext)
    const { partyNames } = useContext(partyNamesContext)
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
                            <p>PAN : ABBFM2821M</p>
                            <p>GSTN : 33ABBFM2821M2ZD</p>
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
                    <div className="place-of-supply"></div>
                    <div className="address">
                        <div className="customer">
                            <div dangerouslySetInnerHTML={{ __html: address.address }} />
                        </div>
                        <div className="vendor">
                            <div>
                                <h4>Generation Date:- {dayjs().format('DD-MM-YYYY')}</h4>
                                <h4>Vendor Name:- MAGNUM LOGISTICS</h4>
                                <h2>Bill No:- {invoiceValues.billNo}</h2>
                            </div>
                            <div className="flag">
                                <h4>Bill Date:- {epochToMinimalDate(invoiceValues.date)}</h4>
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
                                {trip &&
                                    trip?.loadingPointToUnloadingPointTrip.map(
                                        (loadingToUnloading, index) => {
                                            totalAmount +=
                                                loadingToUnloading.freightAmount *
                                                loadingToUnloading.filledLoad
                                            totalFilledLoad += loadingToUnloading.filledLoad
                                            return tableRow(loadingToUnloading, index, partyNames)
                                        }
                                    )}
                                {trip &&
                                    trip?.loadingPointToStockPointTrip.map(
                                        (loadingToStock, index) => {
                                            totalAmount +=
                                                loadingToStock.freightAmount *
                                                loadingToStock.filledLoad
                                            totalFilledLoad += loadingToStock.filledLoad
                                            return tableRow(loadingToStock, index, partyNames)
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
                                                index,
                                                partyNames
                                            )
                                        }
                                    )}
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
                        <div style={{ padding: '50px' }}></div>
                        <h5>Authorized Signatory</h5>
                    </div>
                </main>
            )}
        </>
    )
}

export default CustomInvoice

const tableRow = (row: LoadingToStockPointProps, index: number, partyNames: partyNamesProps[]) => {
    const name = partyNames.filter((trip) => trip.invoiceNumber === row.invoiceNumber)
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{row.invoiceNumber}</td>
            <td>{row.lrNumber}</td>
            <td>{epochToMinimalDate(row.startDate)}</td>
            <td>{name[0].partyName}</td>
            <td>{row.unloadingPoint ? row.unloadingPoint.name : row.stockPoint.name}</td>
            <td>{row.truck.vehicleNumber}</td>
            <td>5116</td>
            <td>{row.filledLoad.toFixed(2)}</td>
            <td>{row.freightAmount.toFixed(2)}</td>
            <td>{(row.filledLoad * row.freightAmount).toFixed(2)}</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
    )
}

const tableRowForStockToUnloading = (
    row: StockToUnloadingPointProps,
    index: number,
    partyNames: partyNamesProps[]
) => {
    const name = partyNames.filter((trip) => trip.invoiceNumber === row.invoiceNumber)
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{row.invoiceNumber}</td>
            <td>{row.lrNumber}</td>
            <td>{epochToMinimalDate(row.startDate)}</td>
            <td>{name[0].partyName}</td>
            <td>{row.unloadingPoint.name}</td>
            <td>{row.loadingPointToStockPointTrip.truck.vehicleNumber}</td>
            <td>5116</td>
            <td>{row.loadingPointToStockPointTrip.filledLoad.toFixed(2)}</td>
            <td>{row.freightAmount.toFixed(2)}</td>
            <td>{(row.loadingPointToStockPointTrip.filledLoad * row.freightAmount).toFixed(2)}</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
    )
}
