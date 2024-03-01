const ChettinadAnnexure = () => {
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
                            <div>CCKW/23-24/93</div>
                        </div>
                        <div className="list">
                            <div>
                                <div>DATE</div>
                                <div>:</div>
                            </div>
                            <div>07-02-2024</div>
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
                            <tr>
                                <td>1</td>
                                <td>20-01-2024</td>
                                <td>KW20175903</td>
                                <td>Chettinad Cement</td>
                                <td>Chandapura TDP</td>
                                <td>KA01AJ2855</td>
                                <td>39.750</td>
                                <td>1,300.00</td>
                                <td>51,675.00</td>
                            </tr>
                            <tr>
                                <td colSpan={6}>
                                    <h4>Total</h4>
                                </td>
                                <td>
                                    <h4>862.35</h4>
                                </td>
                                <td />
                                <td>
                                    <h4>11,21,005.0</h4>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="footer">
                    <div className="details">
                        <div className="total">
                            <p>No of Challans :</p>
                            <p>22</p>
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
