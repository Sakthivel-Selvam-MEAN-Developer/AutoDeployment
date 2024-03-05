import './style.css'

const Dalmia_Kadappa_Invoice = () => {
    return (
        <section id="dalmia_kadappa_section">
            <main className="dalmia_main">
                <table id="table1" style={{ width: '100%' }} className="border-top">
                    <tbody>
                        <tr style={{ backgroundColor: '#f2f2f2' }}>
                            <th colSpan={6}>INVOICE</th>
                        </tr>
                        <tr>
                            <td>GSTIN :</td>
                            <td>33ABBFM2821M2ZD</td>
                            <td>PAN</td>
                            <td>ABBFM2821M</td>
                            <td>Inv No.</td>
                            <td>DCK/23-24/33</td>
                        </tr>
                        <tr>
                            <td>State :</td>
                            <td>Tamil Nadu</td>
                            <td>State Code</td>
                            <td>33</td>
                            <td>Date</td>
                            <td>02-02-2024</td>
                        </tr>
                        <tr className="border">
                            <td className="border" colSpan={6}>
                                Details of Receiver/ Billed to:
                            </td>
                        </tr>
                        <tr className="border">
                            <td className="border" colSpan={6}>
                                Name : M/s. Dalmia Cement(Bharat) Limited
                            </td>
                        </tr>
                        <tr className="border">
                            <td className="border" colSpan={6}>
                                Address : Chinnakomerla Village Jammalmadugu, Kadappa District,
                                Andra Pradesh - 516434
                            </td>
                        </tr>
                        <tr className="border">
                            <td colSpan={6} className="border">
                                GSTIN : 37AADCA9414C1ZY
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table className="table2" style={{ width: '100%' }}>
                    <tbody>
                        <tr className="border tc">
                            <td className="border tl">State : Andhra Pradesh</td>
                            <td>State Code</td>
                            <td>37</td>
                            <td>PAN</td>
                            <td colSpan={2}>AADCA9414C</td>
                        </tr>
                        <tr className="tc">
                            <td className="p-5">Name of Product/Service</td>
                            <td className="p-5">To (Place)</td>
                            <td className="p-5">SAC</td>
                            <td className="p-5">Qty in MT</td>
                            <td className="p-5">Rate/MT</td>
                            <td className="p-5">Amount</td>
                        </tr>
                        <tr className="border">
                            <td className="border">Being Transport Charges</td>
                            <td className="border" />
                            <td className="border tc">996791</td>
                            <td className="border" />
                            <td className="border" />
                            <td className="border" />
                        </tr>
                        <tr className="border">
                            <td className="border">Material: Cement</td>
                            <td className="border tc">CUD-AVATHI_E2E</td>
                            <td className="border" />
                            <td className="border tc">196.20</td>
                            <td className="border tc">1044.00</td>
                            <td className="border tr">2,04,832.80</td>
                        </tr>
                        <tr className="border">
                            <td className="border">Period From: 26-01-2024</td>
                            <td className="border" />
                            <td className="border" />
                            <td className="border" />
                            <td className="border" />
                            <td className="border" />
                        </tr>
                        <tr className="border">
                            <td className="border">Period From: 31-01-2024</td>
                            <td className="border" />
                            <td className="border" />
                            <td className="border" />
                            <td className="border" />
                            <td className="border" />
                        </tr>
                        <tr className="border">
                            <td className="border tc">(Detailed As per Annexure Enclosed)</td>
                            <td className="border" />
                            <td className="border" />
                            <td className="border" />
                            <td className="border" />
                            <td className="border" />
                        </tr>
                        <tr>
                            <td colSpan={2} className="tc">
                                Total
                            </td>
                            <td />
                            <td className="tc">196.20</td>
                            <td />
                            <td className="tr">2,04,832.80</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>Total Invoice Amount in Words:</td>
                            <td colSpan={3}>Total Amount Before Tax</td>
                            <td className="tr">2,04,832.80</td>
                        </tr>
                        <tr>
                            <td colSpan={2} rowSpan={3} className="tc">
                                Rupees Two Lakhs Twenty Nine Thousand Four Hundred And Thirteen Only
                            </td>
                            <td colSpan={2}>Add : CGST</td>
                            <td />
                            <td>-</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>Add : SGST</td>
                            <td />
                            <td>-</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>Add : IGST</td>
                            <td>12.0%</td>
                            <td className="tr">24,579.94</td>
                        </tr>
                        <tr>
                            <td colSpan={2} rowSpan={3} className="tc">
                                Certified that the particulars given above are true and correct.
                            </td>
                            <td colSpan={3}>Tax Amount : IGST @12%</td>
                            <td className="tr">24,579.94</td>
                        </tr>
                        <tr>
                            <td colSpan={3}>Round off</td>
                            <td className="tr">0.26</td>
                        </tr>
                        <tr>
                            <td colSpan={3}>Total Amount After Tax</td>
                            <td className="tr">2,29,413.00</td>
                        </tr>
                        <tr>
                            <td colSpan={6}>
                                We have taken registration under the CGST Act,2017 and have
                                exercised the option to pay tax on services of GTA in relation to
                                transport of Goods supplied by us during the financial year 2023-24
                                under the forward charge.
                            </td>
                        </tr>
                        <tr className="border">
                            <td
                                className="border"
                                colSpan={2}
                                style={{ textDecoration: 'underline' }}
                            >
                                Bank Details:
                            </td>
                            <td rowSpan={5} colSpan={4} />
                        </tr>
                        <tr className="border">
                            <td className="border" colSpan={2}>
                                Bank Name: Indian Overseas Bank
                            </td>
                        </tr>
                        <tr className="border">
                            <td className="border" colSpan={2}>
                                Branch : Kollampalayam
                            </td>
                        </tr>
                        <tr className="border">
                            <td className="border" colSpan={2}>
                                A/C No: 159433000055555
                            </td>
                        </tr>
                        <tr className="border">
                            <td className="border" colSpan={2}>
                                IFSC code : 10BA0001594
                            </td>
                        </tr>
                    </tbody>
                </table>
            </main>
        </section>
    )
}

export default Dalmia_Kadappa_Invoice
