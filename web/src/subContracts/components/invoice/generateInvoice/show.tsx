import Table from '@mui/material/Table'
import Paper from '@mui/material/Paper'
import { getTableHead } from './table'
import {
    Box,
    Button,
    Tab,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Tabs,
    TextField
} from '@mui/material'
import { tripDetails, tripDetailsProps } from './list'
import { FC, useContext, useState } from 'react'
import { epochToMinimalDate } from '../../../../commonUtils/epochToTime'
import { filterDataProps, invoiceFilterData } from './invoiceContext'
import { getTripDetailsByFilterData, updateBillingRate } from '../../../services/invoice'
import { SelectedTableContainer } from './selectedTripsTable'
import {
    InvoicePartyNameFieldProps,
    TableBodyProps,
    tableProps,
    TableRowContainerProps
} from './showTypes'
export interface tripProps {
    tripDetails: tripDetails[]
    setTripId: React.Dispatch<React.SetStateAction<tripDetailsProps[]>>
    setTripDetails: React.Dispatch<React.SetStateAction<tripDetails[]>>
}
const ListAllTripForInvoice: FC<tripProps> = ({ tripDetails, setTripId, setTripDetails }) => {
    const { filterData, setFilterData } = useContext(invoiceFilterData)
    const handleChange = async (_event: React.SyntheticEvent, newValue: string) => {
        if (filterData.cementCompany.name === '') return
        setTripDetails([])
        setTripId([])
        await getTripDetailsByFilterData({ ...filterData, pageName: newValue }).then(setTripDetails)
        setFilterData((prevData: filterDataProps) => {
            return { ...prevData, pageName: newValue }
        })
    }
    return (
        <>
            <Box sx={{ width: '100%' }}>
                <InvoiceTabs handleChange={handleChange} />
            </Box>
            <InvoiceContainer
                tripDetails={tripDetails}
                setTripId={setTripId}
                setTripDetails={setTripDetails}
            />
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
const TableRowContainer: FC<TableRowContainerProps> = ({
    row,
    setTripId,
    tripDetails,
    setSelectedTrip,
    setTripDetails
}) => {
    const { filterData } = useContext(invoiceFilterData)
    const handleClick = (obj: tripDetailsProps) => {
        const selectedTrip = tripDetails.filter((trip) => {
            return trip.id === obj.tripId
        })
        setTripId((prev) => [...prev, obj])
        setSelectedTrip((prev) => [...prev, ...selectedTrip])
        setTripDetails((prev) => {
            const data = prev.filter((trip) => {
                return trip.id !== obj.tripId
            })
            return [...data]
        })
    }
    return (
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell sx={{ textAlign: 'left' }}>{epochToMinimalDate(row.startDate)}</TableCell>
            <TableCell sx={{ textAlign: 'left' }}>{row.invoiceNumber}</TableCell>
            <TableCell sx={{ textAlign: 'left' }}>{row.truck.vehicleNumber}</TableCell>
            <TableCell sx={{ textAlign: 'left' }}>
                {filterData.pageName !== 'StockToUnloading'
                    ? row.loadingPoint.name
                    : row.loadingPointToStockPointTrip.stockPoint.name}
            </TableCell>
            <TableCell sx={{ textAlign: 'left' }}>
                {filterData.pageName === 'LoadingToStock'
                    ? row.stockPoint.name
                    : row.unloadingPoint.name}
            </TableCell>
            <TableCell sx={{ textAlign: 'left' }}>{row.filledLoad}</TableCell>
            <TableCell sx={{ textAlign: 'left' }}>{row.freightAmount}</TableCell>
            <TableCell sx={{ textAlign: 'left' }}>{row.totalFreightAmount}</TableCell>
            <BillingInput handleClick={handleClick} row={row} pageName={filterData.pageName} />
        </TableRow>
    )
}
const BillingInput: FC<InvoicePartyNameFieldProps> = ({ row, handleClick, pageName }) => {
    const [billingRate, setBillingRate] = useState(0)
    return (
        <>
            <TableCell sx={{ textAlign: 'left' }}>
                <TextField
                    label="Enter BillingRate"
                    value={billingRate}
                    type="number"
                    onChange={(e) => setBillingRate(parseFloat(e.target.value))}
                />
            </TableCell>
            <AddButton handleClick={handleClick} row={row} page={pageName} billRate={billingRate} />
        </>
    )
}
interface AddButtonProps {
    billRate: number
    handleClick: (obj: tripDetailsProps) => void
    page: string
    row: {
        id: number
        invoiceNumber: string
    }
}
const AddButton: FC<AddButtonProps> = ({ billRate, row, handleClick, page }) => {
    const buttonClick = async () => {
        if (billRate === 0) return
        const obj = {
            tripId: row.id,
            tripName: page
        }
        await updateBillingRate({ id: row.id, billingRate: billRate, pageName: page })
        handleClick(obj)
    }
    return (
        <TableCell sx={{ textAlign: 'left' }}>
            <Button onClick={buttonClick}> Add </Button>
        </TableCell>
    )
}
const InvoiceContainer: FC<tableProps> = ({ tripDetails, setTripId, setTripDetails }) => {
    const [selectedTrip, setSelectedTrip] = useState<tripDetails[]>([])
    return (
        <>
            <SelectedTableContainer selectedTrip={selectedTrip} setSelectedTrip={setSelectedTrip} />
            <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
                <Table component={Paper} sx={{ marginTop: '30px', minWidth: 500 }}>
                    {getTableHead()}
                    <TableContainers
                        setSelectedTrip={setSelectedTrip}
                        tripDetails={tripDetails}
                        setTripId={setTripId}
                        setTripDetails={setTripDetails}
                    />
                </Table>
            </TableContainer>
        </>
    )
}
const TableContainers: FC<TableBodyProps> = ({
    tripDetails,
    setTripId,
    setTripDetails,
    setSelectedTrip
}) => {
    return (
        <TableBody>
            {tripDetails.length !== 0 &&
                tripDetails.map((row: tripDetails) => (
                    <TableRowContainer
                        key={row.id}
                        row={row}
                        tripDetails={tripDetails}
                        setSelectedTrip={setSelectedTrip}
                        setTripId={setTripId}
                        setTripDetails={setTripDetails}
                    />
                ))}
        </TableBody>
    )
}
