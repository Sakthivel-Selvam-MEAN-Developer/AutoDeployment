import { FC, useEffect, useState } from 'react'
// @ts-expect-error import image
import signature from '../signature.png'
import './style.css'
import { InvoiceProps } from '../UltraTech/ultraTech-APCW'
import dayjs from 'dayjs'
import { getInvoiceDetails } from '../../../../services/invoice'
import { InvoiceProp } from '../../interface'
import { toWords } from '../numberToWords'
import { financialYear } from '../financialYear'
import ChettinadAnnexure from './chettinadAnnexure'
import { Box, CircularProgress } from '@mui/material'
import { epochToMinimalDate } from '../../../../../commonUtils/epochToTime'
import calculateTotals from '../calculateTotal'

const Chettinad_Karikkali: FC<InvoiceProps> = ({ tripId, lastBillNumber, setLoading, loading }) => {
    const [total, setTotal] = useState({
        totalAmount: 0,
        totalFilledLoad: 0,
        numberOfTrips: 0,
        fromDate: 0,
        endDate: 0,
        shortageQuantity: 0
    })
    const [trip, setTrip] = useState<InvoiceProp>({} as InvoiceProp)
    useEffect(() => {
        getInvoiceDetails(tripId)
            .then((data) => setTrip({ ...data }))
            .then(() => setLoading(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        if (trip !== null) setTotal(calculateTotals(trip))
    }, [trip])

    return (
        <>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <section
                        className="chettinad-section"
                        id="chettinad-karikali-section"
                        style={{ padding: '20px' }}
                    >
                        <main className="chettinad-main bt bb bl br df-fc">
                            <div className="head bb pt pb">
                                <h1>TAX INVOICE</h1>
                            </div>
                            <div className="transportation df-fc bb">
                                <div className="pan df jc">
                                    <div className="df-fc">
                                        <h2 className="ta bb br p-2">TRANSPORTATION BILL</h2>
                                        <p className="p-5 bb br">PAN.NO : ABBFM2821M</p>
                                    </div>
                                    <div className="date df-fc jsp">
                                        <div className="df jsp bb">
                                            <p className="p-5 br">Bill No</p>
                                            <p className="p-5">{lastBillNumber}</p>
                                        </div>
                                        <div className="df jsp bb">
                                            <p className="p-5 br">Date</p>
                                            <p className="p-5">{dayjs().format('DD/MM/YYYY')}</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="p-5 bb">GSTIN : 33ABBFM2821M2ZD</p>
                                </div>
                                <div>
                                    <p className="p-5">Tax is payable on reverse charges : NO</p>
                                </div>
                            </div>
                            <div className="df">
                                <div className="billing-address bb br df-fc">
                                    <div className="bb">
                                        <h3 className="ta p-2">BILLING ADDRESS</h3>
                                    </div>
                                    <div>
                                        <div className="p-5">
                                            <h4 className="p-2">
                                                M/s . Chettinad Cement Corporation Private Ltd
                                            </h4>
                                            <p className="p-2">Rani Meyyammai nagar, Karikkali,</p>
                                            <p className="p-2">Vedasandur.TK, Dindigul.DT-624703</p>
                                            <p className="p-2">Tamilnadu (state code: 33)</p>
                                        </div>
                                        <div>
                                            <h3 className="pl pb">
                                                GSTIN: 33AAACC3130A1ZQ, PAN :AAACC3130A
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="shipping-details bb">
                                    <div className="bb">
                                        <h3 className="ta p-2">Shipping details</h3>
                                    </div>
                                    <div className="df-fc ai p-5">
                                        <div className="df jc p-2">
                                            <h3 style={{ textDecoration: 'underline' }}>
                                                Commodity
                                            </h3>
                                            <span>&nbsp;:&nbsp;</span>
                                            <p>Cement</p>
                                        </div>
                                        <div className="df ai jc p-2">
                                            <h2 style={{ textDecoration: 'underline' }}>
                                                Vendor Code
                                            </h2>
                                            <span>&nbsp;:&nbsp;</span>
                                            <h2>3600428</h2>
                                        </div>
                                        <h4 className="p-2" style={{ textDecoration: 'underline' }}>
                                            Area of Transport
                                        </h4>
                                        <p className="p-2">Karnataka</p>
                                    </div>
                                    <div className="pb bt pt">
                                        <p className="ta">(Details enclosed)</p>
                                    </div>
                                </div>
                            </div>
                            <div className="amount df bb">
                                <div className="description-of-service">
                                    <div className="df bb br">
                                        <h3 style={{ width: '100px' }} className="ta br">
                                            S.NO
                                        </h3>
                                        <h3 className="ta" style={{ width: '100%' }}>
                                            Description of service
                                        </h3>
                                    </div>
                                    <div className="df br" style={{ height: '100px' }}>
                                        <p style={{ width: '100px' }} className="ta br pt pb">
                                            1
                                        </p>
                                        <div className="df-fc pt pb jsp">
                                            <div>
                                                <h4 className="ta p-2">
                                                    Transportation charges for DEPOTS
                                                </h4>
                                                <p className="ta p-2">
                                                    ({epochToMinimalDate(total.fromDate)} to{' '}
                                                    {epochToMinimalDate(total.endDate)})
                                                </p>
                                            </div>
                                            <div style={{ height: '24px' }}>
                                                <h3 className="ta p-2 bt">
                                                    Total Amount Before Tax
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="df">
                                    <div className="df-fc jsp br">
                                        <div>
                                            <h3 className="ta bb">SAC</h3>
                                            <p className="ta pt">996791</p>
                                        </div>
                                        <p style={{ height: '29px' }} className="pb bt" />
                                    </div>
                                    <div className="df-fc jsp br">
                                        <div>
                                            <h3 className="ta bb">Qty</h3>
                                            <p className="ta pt">{total.totalFilledLoad}</p>
                                        </div>
                                        <h3 style={{ height: '29px' }} className="ta p-2 bt">
                                            {total.totalFilledLoad}
                                        </h3>
                                    </div>
                                    <div className="df-fc jsp br">
                                        <div>
                                            <h3 className="ta bb">UOM</h3>
                                            <p className="ta pt">MTS</p>
                                        </div>
                                        <p style={{ height: '29px' }} className="p-2 bt" />
                                    </div>
                                    <div className="df-fc jsp">
                                        <div>
                                            <h3 className="ta bb" style={{ width: '200px' }}>
                                                Taxable Value
                                            </h3>
                                            <p className="te pt pr">{total.totalAmount}</p>
                                        </div>
                                        <h3
                                            style={{ height: '29px', width: '200px' }}
                                            className="te p-2 bt"
                                        >
                                            {total.totalAmount}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <div className="df">
                                <div />
                                <div className="df-fc bl">
                                    <div className="df jsp bb">
                                        <p className="p-2">Add : CGST</p>
                                        <p className="p-2">6%</p>
                                        <p style={{ width: '202px' }} className="te p-2 bl">
                                            {total.totalAmount * (6 / 100)}
                                        </p>
                                    </div>
                                    <div className="df jsp bb">
                                        <p className="p-2">Add : SGST</p>
                                        <p className="p-2">6%</p>
                                        <p style={{ width: '202px' }} className="te p-2 bl">
                                            {total.totalAmount * (6 / 100)}
                                        </p>
                                    </div>
                                    <div className="df jsp bb">
                                        <p className="p-2">Add : IGST</p>
                                        <p className="p-2">12%</p>
                                        <p style={{ width: '202px' }} className="te p-2 bl" />
                                    </div>
                                    <div className="df jsp bb">
                                        <p className="p-2">Total Tax Amount : GST</p>
                                        <p style={{ width: '202px' }} className="te p-2 bl">
                                            {total.totalAmount * (6 / 100) * 2}
                                        </p>
                                    </div>
                                    <div className="df jsp bb">
                                        <p className="p-2">Round Off</p>
                                        <p style={{ width: '202px' }} className="te p-2 bl">
                                            {(
                                                Math.round(
                                                    total.totalAmount * (6 / 100) * 2 +
                                                        total.totalAmount
                                                ) -
                                                (total.totalAmount * (6 / 100) * 2 +
                                                    total.totalAmount)
                                            ).toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="df jsp">
                                        <h4 className="p-2">Total Amount After Tax</h4>
                                        <h3 style={{ width: '202px' }} className="te p-2 bl">
                                            {Math.round(
                                                total.totalAmount * (6 / 100) * 2 +
                                                    total.totalAmount
                                            ).toFixed(2)}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <div className="bt pt pb pl pr">
                                <h4>
                                    Total invoice value ( in words) :
                                    {toWords.convert(
                                        Math.round(
                                            total.totalAmount * (6 / 100) * 2 + total.totalAmount
                                        ),
                                        {
                                            currency: true
                                        }
                                    )}
                                </h4>
                            </div>
                            <div className="bt pt pb pl pr">
                                <p>
                                    We have taken registration under the CGST Act,2017 and have
                                    exercised the option to pay tax on services of GTA in relation
                                    to transport of Goods supplied by us during the financial year{' '}
                                    {financialYear} under the forward charge.
                                </p>
                            </div>
                            <div className="bt pt pb pl pr">
                                <p>
                                    Certified that the particulars given above are true and correct.
                                </p>
                            </div>
                            <div className="df bt">
                                <div className="br">
                                    <h4 className="bb p-2 ta">
                                        Kindly pass the above bill and credit the
                                    </h4>
                                    <div className="pt pb pr pl">
                                        <h4 className="pb">BANK DETAILS</h4>
                                        <h4 className="p-2">Bank Name : Indian Overseas Bank</h4>
                                        <h4 className="p-2">Branch : Kollampalayam</h4>
                                        <h4 className="p-2">Acount No: 159433000055555</h4>
                                        <h4 className="p-2">IFCS Code : IOBA0001594</h4>
                                    </div>
                                </div>
                                <div className="df-fc jsp ai">
                                    <h3 className="ta p-2">For Magnum Logistics</h3>
                                    <img
                                        src={signature}
                                        alt="signature"
                                        style={{ width: '300px' }}
                                    />
                                    <h4 className="ta pb">Authorised Signatory</h4>
                                </div>
                            </div>
                        </main>
                    </section>
                    <hr style={{ margin: '0 20px' }} />
                    <ChettinadAnnexure
                        tripDetails={trip}
                        lastBillNumber={lastBillNumber}
                        total={total}
                    />
                </>
            )}
        </>
    )
}

export default Chettinad_Karikkali
