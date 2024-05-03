import { FieldValues, useForm } from 'react-hook-form'
import FormField from './formField'
import { useState } from 'react'
import ListAllTripForInvoice from './show'
import dayjs from 'dayjs'
import { Button } from '@mui/material'
import InvoiceDialog from './invoiceDialog'
import { getTripDetailsByFilterData, updateInvoiceDetails } from '../../services/invoice'
import { getLastBillNumber } from '../../services/billNumber'
import { filterDataProps, invoiceFilterData } from './invoiceContext'
import { Nullable } from '../../../types'
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

const InvoiceList: React.FC = () => {
    const { handleSubmit, control } = useForm<FieldValues>()
    const [tripDetails, setTripDetails] = useState<tripDetails[]>([])
    const [cementCompany, setCementCompany] = useState<cementCompanyProps[]>([])
    const [tripId, setTripId] = useState<tripDetailsProps[]>([])
    const [activate, setActivate] = useState<boolean>(false)
    const [lastBillNumber, setLastBillNumber] = useState<string>('')
    const [filterData, setFilterData] = useState<Nullable<filterDataProps>>({
        pageName: 'LoadingToUnloading',
        startDate: 0,
        endDate: 0,
        cementCompanyName: ''
    })

    const onSubmit = async () => {
        getTripDetails()
        await generateBillNumber().then(setLastBillNumber)
    }
    const handleClick = () => setActivate(true)

    const generateBillNumber = async () => {
        return await getLastBillNumber().then((billNo) => {
            const financialYear =
                dayjs().month() < 3
                    ? `${String(dayjs().year() - 1).slice(-2)}`
                    : `${String(dayjs().year()).slice(-2)}`
            return `MGL${financialYear}A-${parseInt(billNo.lastBillNo.split('-')[1]) + 1}`
        })
    }
    const getTripDetails = () => {
        if (filterData?.cementCompanyName === '') return
        getTripDetailsByFilterData(filterData).then(setTripDetails)
    }
    const updateInvoice = async () => {
        const data = {
            trip: tripId,
            billNo: lastBillNumber
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
                <ListAllTripForInvoice
                    tripDetails={tripDetails}
                    setTripId={setTripId}
                    tripId={tripId}
                    setTripDetails={setTripDetails}
                />
                <br />
                {activate && (
                    <InvoiceDialog
                        tripId={tripId}
                        company={filterData?.cementCompanyName}
                        setActivate={setActivate}
                        updateInvoice={updateInvoice}
                        lastBillNumber={lastBillNumber}
                    />
                )}
            </form>
        </invoiceFilterData.Provider>
    )
}
export default InvoiceList
