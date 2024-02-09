import Table from '@mui/material/Table'
import React from 'react'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { epochToMinimalDate } from '../../../commonUtils/epochToTime'
import { Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material'
import { useState } from 'react'

import StockToUnloadingTrip from './stockToUnloadingTrip.tsx'

interface AllStockProps {
    filledLoad: number
    freightAmount: number
    id: number
    invoiceNumber: string
    loadingPoint: { name: string }
    loadingPointId: number
    margin: number
    startDate: number
    stockPoint: { name: string }
    stockPointId: number
    totalFreightAmount: number
    totalTransporterAmount: number
    transporterAmount: number
    tripStatus: boolean
    truck: { vehicleNumber: string; transporter: { name: string } }
    truckId: number
    wantFuel: boolean
}

interface Props {
    allTrips: Row[]
    allStockTrips: AllStockProps[]
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>
    update: boolean
}
interface Row {
    freightAmount: number
    transporterAmount: number
    totalFreightAmount: number
    totalTransporterAmount: number
    transporterBalance: number
    truck: {
        vehicleNumber: string
        transporter: {
            name: string
        }
    }
    endDate: number
    invoiceNumber: string
    loadingPoint: {
        name: string
    }
    unloadingPoint: {
        name: string
    }
    filledLoad: string
    startDate: number
}

const getTableHead = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="left">Vehicle Number</TableCell>
                <TableCell align="left">Start Date</TableCell>
                <TableCell align="left">Transporter</TableCell>
                <TableCell align="left">Loading Point</TableCell>
                <TableCell align="left">Unloading Point</TableCell>
                <TableCell align="left">Freight Amount</TableCell>
                <TableCell align="left">Total Freight Amount</TableCell>
            </TableRow>
        </TableHead>
    )
}

const getTableBody = (allTrips: Row[]) => {
    return (
        <>
            <TableBody>
                {allTrips.map((row, index) => (
                    <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell> {index + 1} </TableCell>
                        <TableCell align="left">{row.truck.vehicleNumber}</TableCell>
                        <TableCell align="left">{epochToMinimalDate(row.startDate)}</TableCell>
                        <TableCell align="left">{row.truck.transporter.name}</TableCell>
                        <TableCell align="left">{row.loadingPoint.name}</TableCell>
                        <TableCell align="left">{row.unloadingPoint.name}</TableCell>
                        <TableCell align="left">{row.freightAmount}</TableCell>
                        <TableCell align="left">{row.totalFreightAmount}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </>
    )
}

const style = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    color: '#000000bd'
}
const ShowTypography = (index: number, row: AllStockProps) => {
    return (
        <div style={style}>
            <Typography style={{ fontSize: '15px' }}>{index + 1}</Typography>
            <Typography sx={{ fontSize: '15px' }}>{row.truck.vehicleNumber}</Typography>
            <Typography sx={{ fontSize: '15px' }}>{epochToMinimalDate(row.startDate)}</Typography>
            <Typography sx={{ fontSize: '15px' }}>{row.truck.transporter.name}</Typography>
            <Typography sx={{ fontSize: '15px' }}>{row.loadingPoint.name}</Typography>
            <Typography sx={{ fontSize: '15px' }}>{row.stockPoint.name}</Typography>
            <Typography sx={{ fontSize: '15px' }}>{row.freightAmount}</Typography>
            <Typography sx={{ padding: '0px 5% 0 0', fontSize: '15px' }}>
                {row.totalFreightAmount}
            </Typography>
        </div>
    )
}
const handleAccordionExpand =
    (index: number, setExpanded: React.Dispatch<React.SetStateAction<number | false>>) =>
    (_event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? index : false)
    }
const GetAllStockTripsAsAAccordion = (
    allStockTrips: AllStockProps[],
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>,
    update: boolean
) => {
    const [expanded, setExpanded] = useState<number | false>(false)
    return (
        <>
            {allStockTrips.map((row: AllStockProps, index: number) => (
                <Accordion
                    key={index}
                    expanded={expanded === index}
                    onChange={handleAccordionExpand(index, setExpanded)}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        sx={{ borderBottom: '1px solid grey' }}
                    >
                        {ShowTypography(index, row)}
                    </AccordionSummary>
                    <AccordionDetails sx={{ display: 'flex', borderBottom: '1px solid grey' }}>
                        <StockToUnloadingTrip row={row} setUpdate={setUpdate} update={update} />
                    </AccordionDetails>
                </Accordion>
            ))}
        </>
    )
}

const ListAllTrip: React.FC<Props> = ({ allTrips, allStockTrips, setUpdate, update }) => {
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                    {getTableHead()}
                    {getTableBody(allTrips)}
                </Table>
            </TableContainer>
            <br />
            <br />
            {GetAllStockTripsAsAAccordion(allStockTrips, setUpdate, update)}
        </>
    )
}

export default ListAllTrip
