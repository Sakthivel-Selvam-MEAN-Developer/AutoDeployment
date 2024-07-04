import { Box, Tab, Tabs } from '@mui/material'
import { tripDetailsProps } from './list'
import { FC, useContext, useState } from 'react'
import { filterDataProps, invoiceFilterData } from './invoiceContext'
import { getTripDetailsByFilterData } from '../../../services/invoice'
import { alignRows, columns, tripProp } from './dataGridColumnsAndRows'
import TripsDataGrid from './dataGrid'
import { GridRowSelectionModel } from '@mui/x-data-grid'
export interface tripProps {
    tripDetails: tripProp[]
    setTripId: React.Dispatch<React.SetStateAction<tripDetailsProps>>
    setTripDetails: React.Dispatch<React.SetStateAction<tripProp[]>>
}
const ListAllTripForInvoice: FC<tripProps> = ({ tripDetails, setTripId, setTripDetails }) => {
    const { filterData, setFilterData } = useContext(invoiceFilterData)
    const [tripType, setTripType] = useState<string>('')
    const handleChange = async (_event: React.SyntheticEvent, newValue: string) => {
        setTripType(newValue)
        if (filterData.cementCompany.name === '') return
        setTripDetails([])
        setTripId({ tripId: [], tripName: '' })
        await getTripDetailsByFilterData({ ...filterData, pageName: newValue }).then(setTripDetails)
        setFilterData((prevData: filterDataProps) => {
            return { ...prevData, pageName: newValue }
        })
    }
    const handleSelection = (params: GridRowSelectionModel) => {
        setTripId({ tripId: params, tripName: tripType })
    }
    return (
        <>
            <Box sx={{ width: '100%' }}>
                <InvoiceTabs handleChange={handleChange} />
            </Box>
            {tripDetails.length ? (
                <TripsDataGrid
                    row={alignRows(tripDetails)}
                    column={columns}
                    handleSelection={handleSelection}
                />
            ) : (
                <p>No Trips to Generate Invoice ..!</p>
            )}
        </>
    )
}
interface InvoiceTabs {
    handleChange: (_event: React.SyntheticEvent, newValue: string) => Promise<void>
}
const InvoiceTabs: FC<InvoiceTabs> = ({ handleChange }) => {
    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Direct Trip" value="LoadingToUnloading" />
                <Tab label="LoadingToStock Trip" value="LoadingToStock" />
                <Tab label="StockToUnloading Trip" value="StockToUnloading" />
            </Tabs>
        </Box>
    )
}
export default ListAllTripForInvoice
