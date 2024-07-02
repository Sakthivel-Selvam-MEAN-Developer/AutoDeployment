import { FieldValues, useForm } from 'react-hook-form'
import FormField from './formField'
import { useEffect, useState } from 'react'
import ListAllTripForInvoice from './show'
import { Button } from '@mui/material'
import { getTripDetailsByFilterData, updateInvoiceDetails } from '../../../services/invoice'
import { billNoContext, filterDataProps, invoiceFilterData } from './invoiceContext'
import { InvoiceFieldDialog } from './fieldDialog'
import html2pdf from 'html2pdf.js'
import dayjs from 'dayjs'
export interface dateProps {
    $d: number
}
export interface cementCompanyProps {
    address: string
    contactPersonName: string
    contactPersonNumber: string
    emailId: string
    gstNo: string
    id: number
    name: string
}
export interface tripDetailsProps {
    tripId: number
    tripName: string
}
export interface tripDetails {
    id: number
    startDate: number
    filledLoad: number
    truck: {
        vehicleNumber: string
    }
    loadingPoint: {
        name: string
    }
    stockPoint: {
        name: string
    }
    unloadingPoint: {
        name: string
    }
    invoiceNumber: string
    freightAmount: number
    totalFreightAmount: number
    loadingPointToStockPointTrip: { stockPoint: { name: string } }
}
const defaultFilterData = {
    pageName: 'LoadingToUnloading',
    startDate: 0,
    endDate: 0,
    cementCompany: { name: '', id: 0 }
}
export interface invoiceValuesProps {
    billNo: string
    date: number
}
const InvoiceList: React.FC = () => {
    const { handleSubmit, control } = useForm<FieldValues>()
    const [tripDetails, setTripDetails] = useState<tripDetails[]>([])
    const [cementCompany, setCementCompany] = useState<cementCompanyProps[]>([])
    const [tripId, setTripId] = useState<tripDetailsProps[]>([])
    const [activateFields, setActivateFields] = useState<boolean>(false)
    const [invoiceValues, setInvoiceValues] = useState<invoiceValuesProps>({} as invoiceValuesProps)
    const [filterData, setFilterData] = useState<filterDataProps>(defaultFilterData)
    // const [pdfBytes, setPdfBytes] = useState()
    // const [load, setLoad] = useState(false)
    useEffect(() => {
        setTripDetails([])
        setTripId([])
    }, [filterData?.cementCompany])
    const onSubmit = async () => await getTripDetails()
    const handleClick = () => setActivateFields(true)
    const getTripDetails = async () => {
        if (filterData?.cementCompany.name === '') return
        await getTripDetailsByFilterData(filterData).then(setTripDetails)
    }
    const updateInvoice = async () => {
        const data = {
            trip: tripId,
            bill: invoiceValues,
            cementCompany: filterData?.cementCompany
        }
        await updateInvoiceDetails(data).then(async (data: string) => await downloadPDF(data))
    }
    const downloadPDF = async (data: string) => {
        // const doc = new jsPDF();
        // doc.save(data); // Load the PDF data

        // // Get the processed PDF data as a base64 string
        // const base64Data = doc.output('datauristring');
        // setPdfBytes(base64Data);
        // setPdfBytes(data)
        // setLoad(true)

        const tempContainer = document.createElement('div')
        tempContainer.innerHTML = data
        const invoiceElement = tempContainer.querySelector('#invoice')
        const annexureElement = tempContainer.querySelector('#annexure')
        const pdfContainer = document.createElement('div')

        if (invoiceElement) {
            const invoicePage = document.createElement('div')
            invoicePage.appendChild(invoiceElement.cloneNode(true))
            pdfContainer.appendChild(invoicePage)
        }

        if (annexureElement) {
            const annexurePage = document.createElement('div')
            annexurePage.style.pageBreakBefore = 'always'
            annexurePage.appendChild(annexureElement.cloneNode(true))
            pdfContainer.appendChild(annexurePage)
        }

        const options = {
            filename: `Invoice_${filterData.cementCompany.name}_${dayjs().format(
                'DD_MM_YYYY'
            )}.pdf`,
            margin: 0.2,
            image: { type: 'png', quality: 1 },
            html2canvas: { scale: 1 },
            jsPDF: { unit: 'px', format: [1500, 1200], orientation: 'portrait' }
        }

        html2pdf().set(options).from(pdfContainer).save()
    }
    return (
        <invoiceFilterData.Provider value={{ filterData, setFilterData }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap'
                    }}
                >
                    <FormField
                        control={control}
                        cementCompany={cementCompany}
                        setCementCompany={setCementCompany}
                    />
                    <Button
                        color="secondary"
                        variant="contained"
                        type="button"
                        style={{ margin: '10px' }}
                        onClick={handleClick}
                        disabled={tripId.length === 0}
                    >
                        Generate Invoice
                    </Button>
                </div>
            </form>
            <ListAllTripForInvoice
                tripDetails={tripDetails}
                setTripId={setTripId}
                setTripDetails={setTripDetails}
            />
            <br />
            {/* {pdfBytes && (
                <object
                    data={pdfBytes}
                    type="application/pdf"
                    width="100%"
                    height="400px"
                >
                    <p>This browser does not support inline PDFs. Please download the file.</p>
                </object>
            )} */}
            <billNoContext.Provider value={{ setInvoiceValues, invoiceValues }}>
                <InvoiceFieldDialog
                    activateFields={activateFields}
                    setActivateFields={setActivateFields}
                    updateInvoice={updateInvoice}
                />
            </billNoContext.Provider>
        </invoiceFilterData.Provider>
    )
}
export default InvoiceList
