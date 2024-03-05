import './style.css'

const Dalmia_Annexure = () => {
    return (
        <section id="dalmia_annexure_section">
            <div className="dalmia_annexure_main">
                <div className="dalmia-head df">
                    <div>
                        <table style={{ textAlign: 'left', marginBottom: '50px', width: '300px' }}>
                            <tbody>
                                <tr>
                                    <th>FROM</th>
                                </tr>
                                <tr>
                                    <th>MAGNUM LOGISTICS</th>
                                </tr>
                                <tr style={{ height: '100px' }}>
                                    <td>NA</td>
                                </tr>
                                <tr>
                                    <td>PAN NO:-</td>
                                </tr>
                                <tr>
                                    <td>GSTIN:- 33ABBFM2821M2ZD</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <table style={{ textAlign: 'left', width: '350px' }}>
                            <tbody>
                                <tr>
                                    <th>TO</th>
                                </tr>
                                <tr>
                                    <th>DCBL FACTORY-DALMIAPURAM</th>
                                </tr>
                                <tr style={{ height: '70px' }}>
                                    <td>TAMILNADU</td>
                                </tr>
                            </tbody>
                        </table>
                        <p>
                            {' '}
                            <b>Bill Sequence: I000-0000126586</b>
                        </p>
                    </div>
                </div>
                <div style={{ clear: 'left', textAlign: 'left' }}>
                    <table style={{ width: '300px' }}>
                        <tbody>
                            <tr>
                                <th>Bill No: DCD/23-24/52</th>
                            </tr>
                            <tr>
                                <th>Bill Date: 07/02/2024</th>
                            </tr>
                            <tr>
                                <th>For Dist. Channel: STOCK TRANSF</th>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <th>WO Number: </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <br />
                <br />
                <div>
                    <b>
                        BEING TRANSPORTATION CHARGES OF CEMENT FROM DCBL FACTORY-DALMIAPURAM TO
                        DIFFERENT DESTINATIONS
                    </b>
                    <table style={{ width: '100%', marginTop: '20px' }}>
                        <tbody>
                            <tr>
                                <th>S.NO</th>
                                <th>BILL DATE</th>
                                <th>DO NO</th>
                                <th>SHIPPMENT NO</th>
                                <th>DESTINATION</th>
                                <th>TRUCK NO</th>
                                <th>QUANTITY</th>
                                <th>RATE</th>
                                <th>AMOUNT</th>
                                <th>SHORTAGE (KG)</th>
                                <th>REMARKS</th>
                            </tr>
                            <tr>
                                <td style={{ textAlign: 'center' }}>1</td>
                                <td>04-02-2024</td>
                                <td>8124824344</td>
                                <td>5212096676</td>
                                <td>DPM-ATTIBELE_E2E</td>
                                <td>TN88J3466</td>
                                <td>40.24</td>
                                <td>1176.00</td>
                                <td>47322.24</td>
                                <td>0</td>
                                <td />
                            </tr>
                            <tr style={{ fontWeight: 'bold' }}>
                                <td />
                                <td />
                                <td />
                                <td />
                                <td>TOTAL VALUE:</td>
                                <td />
                                <td>80.62</td>
                                <td />
                                <td>94809.12</td>
                                <td>0</td>
                                <td />
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="footer df " style={{ alignItems: 'end' }}>
                    <div>
                        <p>No. Of Challans : 2</p>
                        <p>
                            Rupees in Word :
                            <b> Ninety Four Thousand Eight Hundred Nine And Twelve Paise Only</b>
                        </p>
                        <p>
                            <b>GST will be paid by MAGNUM LOGISTICS</b>
                        </p>
                        <p>
                            <b>GSTIN : 33ABBFM2821M2ZD</b>
                        </p>
                        <p>
                            Whether Tax payment on Reverse Charge Basis : <span>No</span>
                        </p>
                    </div>
                    <p style={{ marginLeft: '20px' }}>
                        <b>FOR MAGNUM LOGISTICS</b>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Dalmia_Annexure
