import { FieldValues, useForm } from 'react-hook-form'
import FormField from './formField'
import { useEffect, useState } from 'react'
import ListAllTripForInvoice from './show'
import { Button } from '@mui/material'
import { getTripDetailsByFilterData, updateInvoiceDetails } from '../../services/invoice'
import {
    billNoContext,
    filterDataProps,
    invoiceFilterData,
    partyNamesContext,
    partyNamesProps
} from './invoiceContext'
import { InvoiceFieldDialog } from './fieldDialog'
import InvoiceDialog from './invoiceDialog'
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
    cementCompanyName: ''
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
    const [activateInvoice, setActivateInvoice] = useState<boolean>(false)
    const [activateFields, setActivateFields] = useState<boolean>(false)
    const [invoiceValues, setInvoiceValues] = useState<invoiceValuesProps>({} as invoiceValuesProps)
    const [filterData, setFilterData] = useState<filterDataProps>(defaultFilterData)
    const [partyNames, setPartyNames] = useState<partyNamesProps[]>([])
    useEffect(() => {
        setTripDetails([])
        setTripId([])
        setActivateInvoice(false)
    }, [filterData?.cementCompanyName])
    const onSubmit = async () => {
        getTripDetails()
    }
    const handleClick = () => setActivateFields(true)

    const getTripDetails = () => {
        if (filterData?.cementCompanyName === '') return
        getTripDetailsByFilterData(filterData).then(setTripDetails)
    }
    const updateInvoice = async () => {
        const data = {
            trip: tripId,
            billNo: invoiceValues.billNo
        }
        await updateInvoiceDetails(data).then(getTripDetails)
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
            <partyNamesContext.Provider value={{ partyNames, setPartyNames }}>
                <ListAllTripForInvoice
                    tripDetails={tripDetails}
                    setTripId={setTripId}
                    setTripDetails={setTripDetails}
                />
                <br />
                <billNoContext.Provider value={{ setInvoiceValues, invoiceValues }}>
                    <InvoiceFieldDialog
                        activateFields={activateFields}
                        setActivateFields={setActivateFields}
                        setActivateInvoice={setActivateInvoice}
                    />
                    {activateInvoice && tripDetails.length !== 0 && (
                        <InvoiceDialog
                            tripId={tripId}
                            setTripId={setTripId}
                            company={filterData?.cementCompanyName}
                            setActivate={setActivateInvoice}
                            updateInvoice={updateInvoice}
                        />
                    )}
                </billNoContext.Provider>
            </partyNamesContext.Provider>
        </invoiceFilterData.Provider>
    )
}
export default InvoiceList
