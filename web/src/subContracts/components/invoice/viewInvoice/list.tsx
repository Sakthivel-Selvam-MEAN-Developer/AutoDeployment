import React from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useState } from 'react'
import { Typography } from '@mui/material'
import InvoiceTable from './table'
import { display } from './showTypes'
import { cementCompanyProps } from './tableList'
import { filterDataProps, invoiceFilterData } from './invoiceContext'
import { getCompanyInvoice } from '../../../services/viewInvoice'
import { submitEvent } from './displayInvoice'
const defaultFilterData = {
    pageName: 'LoadingToUnloading',
    startDate: 0,
    endDate: 0,
    cementCompany: { name: '', id: 0 }
}
const viewInvoiceHeading = (
    <Typography sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
        View Generated Invoice
    </Typography>
)
const ViewList: React.FC = () => {
    const [display, setDisplay] = useState<display[]>([])
    const { handleSubmit, control } = useForm<FieldValues>()
    const [cementCompany, setCementCompany] = useState<cementCompanyProps[]>([])
    const [filterData, setFilterData] = useState<filterDataProps>(defaultFilterData)
    const onSubmit = async () => await getTripDetails()
    const getTripDetails = getTrip(filterData, setDisplay)
    return (
        <>
            {viewInvoiceHeading}
            <invoiceFilterData.Provider value={{ filterData, setFilterData }}>
                {submitEvent(handleSubmit, onSubmit, control, cementCompany, setCementCompany)}
            </invoiceFilterData.Provider>
            <InvoiceTable display={display} />
        </>
    )
}
export default ViewList
function getTrip(
    filterData: filterDataProps,
    setDisplay: React.Dispatch<React.SetStateAction<display[]>>
) {
    return async () => {
        if (filterData?.cementCompany.name === '') return
        await getCompanyInvoice({ ...filterData }).then(setDisplay)
    }
}
