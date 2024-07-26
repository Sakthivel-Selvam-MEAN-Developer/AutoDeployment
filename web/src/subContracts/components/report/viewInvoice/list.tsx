import React, { useEffect } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useState } from 'react'
import { Typography } from '@mui/material'
import InvoiceTable from './table'
import { gridProp } from './showTypes'
import { cementCompanyProps } from './tableList'
import { filterDataProps, invoiceFilterData } from './invoiceContext'
import { getCompanyInvoice } from '../../../services/viewInvoice'
import { submitEvent } from './displayInvoice'
const defaultFilterData = {
    pageName: 'LoadingToUnloading',
    startDate: 0,
    endDate: 0,
    cementCompany: { name: '', id: 0 },
    pageNumber: 1,
    received: undefined,
    GSTReceived: undefined
}
const viewInvoiceHeading = (
    <Typography sx={{ fontWeight: 'bold', marginBottom: '10px' }}>Invoice Report</Typography>
)
const ViewList: React.FC = () => {
    const [display, setDisplay] = useState<gridProp['display']>({} as gridProp['display'])
    const { handleSubmit, control } = useForm<FieldValues>()
    const [cementCompany, setCementCompany] = useState<cementCompanyProps[]>([])
    const [filterData, setFilterData] = useState<filterDataProps>(defaultFilterData)
    const onSubmit = async () => await getCompanyInvoice({ ...filterData }).then(setDisplay)
    useEffect(() => {
        onSubmit()
    }, [filterData.pageNumber])
    return (
        <>
            {viewInvoiceHeading}
            <invoiceFilterData.Provider value={{ filterData, setFilterData }}>
                {submitEvent(handleSubmit, onSubmit, control, cementCompany, setCementCompany)}
            </invoiceFilterData.Provider>
            <InvoiceTable display={display} setFilterData={setFilterData} filterData={filterData} />
        </>
    )
}
export default ViewList
