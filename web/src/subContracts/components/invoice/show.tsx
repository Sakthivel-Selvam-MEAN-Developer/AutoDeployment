import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import { getTableHead } from './table'
import { Box, Checkbox, Tab, TableBody, TableCell, TableRow, Tabs } from '@mui/material'
import { tripDetails, tripDetailsProps } from './list'
import { FC, useContext } from 'react'
import { epochToMinimalDate } from '../../../commonUtils/epochToTime'
import { filterDataProps, invoiceFilterData } from './invoiceContext'
import { getTripDetailsByFilterData } from '../../services/invoice'
interface tripProps {
    tripDetails: tripDetails[]
    setTripId: React.Dispatch<React.SetStateAction<tripDetailsProps[]>>
    tripId: tripDetailsProps[]
    setTripDetails: React.Dispatch<React.SetStateAction<tripDetails[]>>
}

const ListAllTripForInvoice: FC<tripProps> = ({
    tripDetails,
    setTripId,
    tripId,
    setTripDetails
}) => {
    const { filterData, setFilterData } = useContext(invoiceFilterData)
    const handleChange = async (_event: React.SyntheticEvent, newValue: string) => {
        if (filterData.cementCompanyName === '') return
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
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Direct Trip" value="LoadingToUnloading" />
                        <Tab label="LoadingToStock Trip" value="LoadingToStock" />
                        <Tab label="StockToUnloading Trip" value="StockToUnloading" />
                    </Tabs>
                </Box>
            </Box>
            <InvoiceTableContainer
                tripDetails={tripDetails}
                setTripId={setTripId}
                tripId={tripId}
            />
        </>
    )
}
export default ListAllTripForInvoice
interface TableRowContainerProps {
    index: number
    tripId: tripDetailsProps[]
    setTripId: React.Dispatch<React.SetStateAction<tripDetailsProps[]>>
    row: tripDetails
}

const TableRowContainer: FC<TableRowContainerProps> = ({ index, row, tripId, setTripId }) => {
    const { filterData } = useContext(invoiceFilterData)
    const handleClick = (obj: tripDetailsProps) => {
        if (
            tripId.find(
                (detail: tripDetailsProps) =>
                    detail.tripId === obj.tripId && detail.tripName === obj.tripName
            )
        )
            setTripId(
                tripId.filter(
                    (detail: tripDetailsProps) =>
                        !(detail.tripId === obj.tripId && detail.tripName === obj.tripName)
                )
            )
        else setTripId((prev: tripDetailsProps[]) => [...prev, obj])
    }
    return (
        <>
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell sx={{ textAlign: 'left' }}>
                    <Checkbox
                        onClick={() => {
                            const obj = {
                                tripId: row.id,
                                tripName: filterData.pageName
                            }
                            handleClick(obj)
                        }}
                    />
                </TableCell>
                <TableCell sx={{ textAlign: 'left' }}>
                    {epochToMinimalDate(row.startDate)}
                </TableCell>
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
                <TableCell sx={{ textAlign: 'left' }}>{row.freightAmount}</TableCell>
                <TableCell sx={{ textAlign: 'left' }}>{row.totalFreightAmount}</TableCell>
            </TableRow>
        </>
    )
}
interface InvoiceTableContainerProps {
    tripDetails: tripDetails[]
    tripId: tripDetailsProps[]
    setTripId: React.Dispatch<React.SetStateAction<tripDetailsProps[]>>
}
const InvoiceTableContainer: FC<InvoiceTableContainerProps> = ({
    tripDetails,
    tripId,
    setTripId
}) => {
    return (
        <TableContainer component={Paper} sx={{ marginTop: '30px' }}>
            <Table sx={{ minWidth: 600 }} aria-label="simple table">
                {getTableHead()}
                <TableBodyContainer
                    tripDetails={tripDetails}
                    tripId={tripId}
                    setTripId={setTripId}
                />
            </Table>
        </TableContainer>
    )
}
const TableBodyContainer: FC<InvoiceTableContainerProps> = ({ tripDetails, tripId, setTripId }) => {
    let count = 0
    return (
        <>
            <TableBody>
                {tripDetails.length !== 0 &&
                    tripDetails.map((row: tripDetails) => {
                        return (
                            <TableRowContainer
                                key={++count}
                                index={++count}
                                row={row}
                                setTripId={setTripId}
                                tripId={tripId}
                            />
                        )
                    })}
            </TableBody>
        </>
    )
}
