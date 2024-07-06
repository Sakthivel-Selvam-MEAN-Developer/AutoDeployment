import { Box, Tab, Tabs } from '@mui/material'
import { tripDetailsProps } from './list'
import { FC, useContext, useState } from 'react'
import { filterDataProps, invoiceFilterData } from './invoiceContext'
import { getTripDetailsByFilterData, updateBillingRate } from '../../../services/invoice'
import { alignRows, columns, tripProp } from './dataGridColumnsAndRows'
import TripsDataGrid from './dataGrid'
import { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid'
import ActionButton, { BillingRateField } from './actionFields'
export interface tripProps {
    tripDetails: tripProp[]
    setTripId: React.Dispatch<React.SetStateAction<tripDetailsProps>>
    setTripDetails: React.Dispatch<React.SetStateAction<tripProp[]>>
}
const ListAllTripForInvoice: FC<tripProps> = ({ tripDetails, setTripId, setTripDetails }) => {
    const { filterData, setFilterData } = useContext(invoiceFilterData)
    const [tripType, setTripType] = useState<string>('')
    const [updated, setUpdated] = useState<number>(0)
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
    const handleUpdate = async (id: number) => {
        await updateBillingRate({ id, billingRate: updated, pageName: filterData.pageName })
    }
    const formattedRow: GridColDef[] = columns.map((column) => ({
        ...column,
        renderCell: (params) => {
            if (column.field === 'action') {
                return <ActionButton handleEdit={() => handleUpdate(params.row.id)} />
            } else if (column.field === 'billingRate') {
                return (
                    <BillingRateField
                        setUpdated={setUpdated}
                        updated={updated}
                        key={params.row.id}
                    />
                )
            }
        }
    }))
    console.log(formattedRow)
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
            <Tabs onChange={handleChange} aria-label="tabs">
                <Tab label="Direct Trip" value="LoadingToUnloading" />
                <Tab label="LoadingToStock Trip" value="LoadingToStock" />
                <Tab label="StockToUnloading Trip" value="StockToUnloading" />
            </Tabs>
        </Box>
    )
}
export default ListAllTripForInvoice
