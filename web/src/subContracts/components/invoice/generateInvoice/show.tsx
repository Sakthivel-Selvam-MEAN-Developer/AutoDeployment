import { Box, Tab, Tabs } from '@mui/material'
import { FC, useContext, useState } from 'react'
import { filterDataProps, invoiceFilterData } from './invoiceContext'
import { getTripDetailsByFilterData, updateBillingRate } from '../../../services/invoice'
import { alignRows, columns, tripProp } from './dataGridColumnsAndRows'
import TripsDataGrid from './dataGrid'
import { GridColDef } from '@mui/x-data-grid'
import ActionButton, { BillingRateField } from './actionFields'
export interface tripProps {
    tripDetails: tripProp[]
    // setTripId: React.Dispatch<React.SetStateAction<tripDetailsProps>>
    setTripDetails: React.Dispatch<React.SetStateAction<tripProp[]>>
    setDisabled: React.Dispatch<React.SetStateAction<Set<number>>>
    disabled: Set<number>
}
const ListAllTripForInvoice: FC<tripProps> = ({
    tripDetails,
    setTripDetails,
    setDisabled,
    disabled
}) => {
    const { filterData, setFilterData } = useContext(invoiceFilterData)
    // const [tripType, setTripType] = useState<string>('')
    const [billingRates, setBillingRates] = useState<{ [key: number]: number }>({})
    // const [disabled, setDisabled] = useState<Set<number>>(new Set())

    const handleChange = async (_event: React.SyntheticEvent, newValue: string) => {
        setDisabled(new Set())
        setBillingRates({})
        // setTripType(newValue)
        if (filterData.cementCompany.name === '') return
        setTripDetails([])
        await getTripDetailsByFilterData({ ...filterData, pageName: newValue }).then(setTripDetails)
        setFilterData((prevData: filterDataProps) => {
            return { ...prevData, pageName: newValue }
        })
    }
    // const handleSelection = (params: GridRowSelectionModel) => {
    //     setTripId({ tripId: params, tripName: tripType })
    // }
    const getFreight = (id: number) => {
        return tripDetails.find((trip) => trip.id === id)?.freightAmount
    }
    const handleUpdate = async (id: number) => {
        const freightAmount = getFreight(id)
        await updateBillingRate({
            id,
            billingRate: billingRates[id] || freightAmount,
            pageName: filterData.pageName
        }).then(() => setDisabled((prev) => new Set(prev).add(id)))
    }
    const handleBillingRateChange = (id: number, newRate: number) => {
        setBillingRates((prevRates) => ({ ...prevRates, [id]: newRate }))
    }
    const formattedRow: GridColDef[] = columns.map((column) => ({
        ...column,
        renderCell: (params) => {
            const isDiabled = disabled.has(params.row.id)
            if (column.field === 'action') {
                return (
                    <ActionButton
                        handleEdit={() => handleUpdate(params.row.id)}
                        disabled={isDiabled}
                    />
                )
            } else if (column.field === 'billingRate') {
                return (
                    <BillingRateField
                        key={params.row.id}
                        value={params.row.freightAmount}
                        onRateChange={(newRate: number) =>
                            handleBillingRateChange(params.row.id, newRate)
                        }
                        disabled={isDiabled}
                    />
                )
            }
        }
    }))

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <InvoiceTabs handleChange={handleChange} />
            </Box>
            {tripDetails.length ? (
                <TripsDataGrid
                    row={alignRows(tripDetails)}
                    column={formattedRow}
                    // handleSelection={handleSelection}
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
