import { FC, useEffect, useState } from 'react'
import './style.css'
// @ts-expect-error import image
import signature from '../signature.png'
import { InvoiceProps } from '../UltraTech/ultraTech-APCW'
import { getInvoiceDetails } from '../../../../services/invoice'
import { tripDetailProps } from '../../interface'
import { financialYear } from '../financialYear'
import { Box, CircularProgress } from '@mui/material'

const Chettinad_Ariyalur: FC<InvoiceProps> = ({ tripId, lastBillNumber, setLoading, loading }) => {
    console.log(lastBillNumber)

    const [total, setTotal] = useState({ totalAmount: 0, totalFilledLoad: 0 })
    const [trip, setTrip] = useState([])
    useEffect(() => {
        getInvoiceDetails(tripId)
            .then((data) => setTrip({ ...data }))
            .then(() => setLoading(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        trip.length > 0 && setTotal(calculateTotals())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trip])
    const calculateTotals = () => {
        let totalFilledLoad = 0
        let totalAmount = 0
        trip.forEach((trip: tripDetailProps) => {
            if (trip.stockPointToUnloadingPointTrip !== null) {
                totalFilledLoad +=
                    trip.stockPointToUnloadingPointTrip.loadingPointToStockPointTrip.filledLoad * 2
                totalAmount +=
                    trip.loadingPointToStockPointTrip.filledLoad *
                        trip.loadingPointToStockPointTrip.freightAmount +
                    trip.loadingPointToStockPointTrip.filledLoad *
                        trip.stockPointToUnloadingPointTrip.freightAmount
            } else {
                totalFilledLoad += trip.loadingPointToUnloadingPointTrip.filledLoad
                totalAmount +=
                    trip.loadingPointToUnloadingPointTrip.filledLoad *
                    trip.loadingPointToUnloadingPointTrip.freightAmount
            }
        })
        return { totalAmount, totalFilledLoad }
    }
    return (
        <>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <section id="chettinad-ariyalur-section">
                    <main className="chettinad-ariyalur-main bb bt br bl">
                        <div className="df jsp bb">
                            <div style={{ width: '60vw' }}>
                                <h4 className="p-2">GSTIN NO : 33ABBFM2821M2ZD</h4>
                                <p className="p-2">
                                    Tax Is Payable On Reverse Charge : (Yes/No) : No
                                </p>
                                <h4 className="p-2">Vendor Code : 3600428</h4>
                            </div>
                            <div className="bl pr" style={{ width: '40vw' }}>
                                <h4 className="p-2">INVOICE NO : AW/ML/24-24/48</h4>
                                <h4 className="p-2">DATE : 07-02-2024</h4>
                                <h4 className="p-2">PAN No : ABBFM2821M2</h4>
                            </div>
                        </div>
                        <div className="df jsp bb">
                            <div style={{ width: '60vw' }}>
                                <div className="pl pt pb pr bb bg">
                                    <h4 className="ta">Details of Service Receiver(Billed to)</h4>
                                </div>
                                <div className="pl">
                                    <p className="df p-2">
                                        M/s Chettinad Cement Corporation Private Ltd.
                                    </p>
                                    <p className="p-2">Ariyalur Trichy Road, Keelapaluvur (p.o),</p>
                                    <p className="p-2">Ariyalur District - 621707</p>
                                    <p className="p-2">Tamilnadu, India.</p>
                                    <p className="p-2">State Code : 33</p>
                                    <p className="p-2">GSTIN Number : 33AAACC3130A1ZQ</p>
                                </div>
                            </div>
                            <div style={{ width: '40vw' }} className="bl pb other-details">
                                <div
                                    className="pt pb pr bb"
                                    style={{ backgroundColor: '#00000021' }}
                                >
                                    <h4 className="ta">Other Details</h4>
                                </div>
                                <div className="pl details df-fc">
                                    <div className="df p-2">
                                        <p>PO Reference</p>
                                        <p>-</p>
                                    </div>
                                    <div className="df p-2">
                                        <p>PO Date</p>
                                        <p>-</p>
                                    </div>
                                    <div className="df p-2">
                                        <p>Product Transported</p>
                                        <p>Cement</p>
                                    </div>
                                    <div className="df p-2">
                                        <p>Vessel Name</p>
                                        <p>-</p>
                                    </div>
                                    <div className="df p-2">
                                        <p>Mode of Transpot</p>
                                        <p>By Truck</p>
                                    </div>
                                    <div className="df p-2">
                                        <p>Financial Year</p>
                                        <p>{financialYear}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="df bb" style={{ height: '154px' }}>
                            <div style={{ width: '7vw' }} className="br">
                                <div style={{ height: '130px' }}>
                                    <h4 style={{ height: '24px' }} className="df jc ai bb bg">
                                        S.NO
                                    </h4>
                                    <p className="ta">1</p>
                                </div>
                                <p style={{ height: '24px' }} className="bt bg" />
                            </div>
                            <div style={{ width: '24vw' }} className="br">
                                <div style={{ height: '130px' }}>
                                    <h4 style={{ height: '24px' }} className="df jc ai bb bg">
                                        Description of Servics
                                    </h4>
                                    <div>
                                        <p className="pl pt pb">TRANSPORTATION CHARGES</p>
                                        <small className="p-2">Period:</small>
                                        <br />
                                        <small className="p-2">From : 21-01-2024</small>
                                        <br />
                                        <small className="p-2">To : 28-01-2024</small>
                                    </div>
                                </div>
                                <p style={{ height: '24px' }} className="df jc ai bt bg" />
                            </div>
                            <div style={{ width: '9vw' }} className="br">
                                <div style={{ height: '130px' }}>
                                    <h5 style={{ height: '24px' }} className="df jc ai bb bg">
                                        HSN/SAC
                                    </h5>
                                    <p className="ta df jc ai" style={{ height: '50px' }}>
                                        996791
                                    </p>
                                </div>
                                <p style={{ height: '24px' }} className="df jc ai bt bg" />
                            </div>
                            <div style={{ width: '9vw' }} className="br">
                                <div style={{ height: '130px' }}>
                                    <h4 style={{ height: '24px' }} className="df jc ai bb bg">
                                        Qty
                                    </h4>
                                    <p className="ta df jc ai" style={{ height: '50px' }}>
                                        {total.totalFilledLoad}
                                    </p>
                                </div>
                                <p style={{ height: '24px' }} className="df jc ai ta bt bg">
                                    {total.totalFilledLoad}
                                </p>
                            </div>
                            <div style={{ width: '7vw' }} className="br">
                                <div style={{ height: '130px' }}>
                                    <h4 style={{ height: '24px' }} className="df jc ai bb bg">
                                        UOM
                                    </h4>
                                    <p />
                                </div>
                                <p style={{ height: '24px' }} className="df jc ai bt bg" />
                            </div>
                            <div className="df-fc">
                                <div className="df" style={{ height: '145px' }}>
                                    <div style={{ width: '7vw' }} className="br bb">
                                        <h4 style={{ height: '24px' }} className="df jc ai bb bg">
                                            Rate
                                        </h4>
                                        <p className="ta df jc ai" style={{ height: '50px' }}>
                                            1285
                                        </p>
                                    </div>
                                    <div style={{ width: '13vw' }} className="br bb">
                                        <h4 style={{ height: '24px' }} className="df jc ai bb bg">
                                            Total
                                        </h4>
                                        <p className="ta df jc ai" style={{ height: '50px' }}>
                                            9213002.00
                                        </p>
                                    </div>
                                    <div style={{ width: '9vw' }} className="br bb">
                                        <h4 style={{ height: '24px' }} className="df jc ai bb bg">
                                            Discount
                                        </h4>
                                        <p className="ta df jc ai" style={{ height: '50px' }}>
                                            -
                                        </p>
                                    </div>
                                    <div style={{ width: '15vw' }} className="bb">
                                        <h4 style={{ height: '24px' }} className="df jc ai bb bg">
                                            Taxable value
                                        </h4>
                                        <p className="df je ai pr" style={{ height: '50px' }}>
                                            9,29,002.00
                                        </p>
                                    </div>
                                </div>
                                <div className="df jsp bg" style={{ height: '22px' }}>
                                    <p className="df jc ai pl">Total Amount Before Tax</p>
                                    <p className="df jc ai pr">9,29,002.00</p>
                                </div>
                            </div>
                        </div>
                        <div className="df-fc">
                            <div className="df jsp">
                                <div style={{ width: '70vw' }} className="br">
                                    <h5 style={{ height: '24px' }} className="ta p-2 bb bg">
                                        Total Invoice Value (Rupees In Words)
                                    </h5>
                                    <h4 style={{ height: '100px' }} className="df jc ai">
                                        Rupees Ten Lakhs Forty Thousand Four Hundred and Eighty Two
                                        Only
                                    </h4>
                                </div>
                                <div className="df">
                                    <div
                                        className="df-fc br jsp"
                                        style={{ width: '15vw', height: '150px' }}
                                    >
                                        <div className="df jsp gst">
                                            <div>
                                                <h5
                                                    className="ta p-2 bb br bg"
                                                    style={{ height: '24px' }}
                                                >
                                                    GST
                                                </h5>
                                                <p className="ta p-2">SGST</p>
                                                <p className="ta p-2">CGST</p>
                                            </div>
                                            <div>
                                                <h5
                                                    className="ta p-2 bb bg"
                                                    style={{ height: '24px' }}
                                                >
                                                    Rate
                                                </h5>
                                                <p className="ta p-2">6%</p>
                                                <p className="ta p-2">6%</p>
                                            </div>
                                        </div>
                                        <div className="pl">
                                            <h5 className="p-2">Total TAX Amount</h5>
                                            <h5 className="p-2">Round Off</h5>
                                        </div>
                                    </div>
                                    <div
                                        style={{ width: '15vw', height: '150px' }}
                                        className="df-fc jsp"
                                    >
                                        <div>
                                            <p className="te bb bg" style={{ height: '24px' }} />
                                            <p className="te p-2">55,740.12</p>
                                            <p className="te p-2">55,740.12</p>
                                        </div>
                                        <div>
                                            <p className="te p-2">1,11,480.34</p>
                                            <p className="te p-2">0.24</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="df je bt">
                                <h5 className="te p-2 br">Total Amount After TAX</h5>
                                <h4 style={{ width: '15vw' }} className="df je p-2">
                                    10,40,482.00
                                </h4>
                            </div>
                        </div>
                        <div className="bg bt p-2">
                            <p>GST is payable by the service recipitent.</p>
                        </div>
                        <div className="bg bt p-2">
                            <p>Certified that the Particulars given above are true and correct.</p>
                        </div>
                        <div className="bt p-2">
                            <p>
                                We have taken registration under the CGST Act,2017 and have
                                exercised the option to pay tax on services of GTA in relation to
                                transport of Goods supplied by us during the financial year 2023-24
                                .under the forward charge.
                            </p>
                        </div>
                        <div className="df jsp bt">
                            <div style={{ width: '70vw' }} className="br">
                                <h4 className="ta p-2 bb bg">BANK DETAILS</h4>
                                <div style={{ height: '150px' }} className="df-fc jc">
                                    <p className="p-2">Bank Name : Indian Overseas Bank</p>
                                    <p className="p-2">Branch : Kollampalayam</p>
                                    <p className="p-2">Acount No: 159433000055555</p>
                                    <p className="p-2">IFCS Code : IOBA0001594</p>
                                </div>
                            </div>
                            <div style={{ width: '30vw' }}>
                                <h4 className="ta p-2 bb bg">for MAGNUM LOGISTICS</h4>
                                <img
                                    src={signature}
                                    alt="signature"
                                    className="p-2"
                                    style={{ padding: '15px', width: 'inherit' }}
                                />
                                <div>
                                    <h5 className="p-2 ta bg bt bb">Authorised Signatory</h5>
                                    <div className="pb pt pl">
                                        <h5 className="p-2">Name : Sureshkumar V</h5>
                                        <h5 className="p-2">Designation : MANAGER</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </section>
            )}
        </>
    )
}

export default Chettinad_Ariyalur
