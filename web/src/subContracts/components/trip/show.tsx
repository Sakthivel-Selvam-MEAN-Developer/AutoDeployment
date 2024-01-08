import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
// import AutoComplete from '../../../form/AutoComplete'
import { epochToMinimalDate } from '../../../commonUtils/epochToTime'
import {
    Accordion,
    AccordionSummary,
    Typography,
    AccordionDetails,
    Button,
    TextField
} from '@mui/material'
import { useState } from 'react'
import React from 'react'

interface Props {
    allTrips: Row[]
    allStockTrips: any[]
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

function getTableHead() {
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

function getTableBody(allTrips: Row[]) {
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

const GetAllStockTripsAsAAccordion = (allStockTrips: any) => {
    const [invoiceNumber, setInvoiceNumber] = useState('')
    const [freightAmount, setFreightAmount] = useState('')
    const [expanded, setExpanded] = useState<number | false>(false)

    const style = { width: '100%', padding: '10px 10px 0px' }

    const handleOnClick = () => {
        console.log(freightAmount, invoiceNumber)
    }

    const handleAccordionExpand =
        (index: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
            setFreightAmount('')
            setInvoiceNumber('')
            setExpanded(isExpanded ? index : false)
        }

    return (
        <>
            {allStockTrips.map((row: any, index: number) => (
                <Accordion
                    key={index}
                    expanded={expanded === index}
                    onChange={handleAccordionExpand(index)}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        sx={{ borderBottom: '1px solid grey' }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '100%',
                                color: '#000000bd'
                            }}
                        >
                            <Typography style={{ fontSize: '15px' }}>{index + 1}</Typography>
                            <Typography sx={{ fontSize: '15px' }}>
                                {row.truck.vehicleNumber}
                            </Typography>
                            <Typography sx={{ fontSize: '15px' }}>
                                {epochToMinimalDate(row.startDate)}
                            </Typography>
                            <Typography sx={{ fontSize: '15px' }}>
                                {row.truck.transporter.name}
                            </Typography>
                            <Typography sx={{ fontSize: '15px' }}>
                                {row.loadingPoint.name}
                            </Typography>
                            <Typography sx={{ fontSize: '15px' }}>{row.stockPoint.name}</Typography>
                            <Typography sx={{ fontSize: '15px' }}>{row.freightAmount}</Typography>
                            <Typography sx={{ padding: '0px 5% 0 0', fontSize: '15px' }}>
                                {row.totalFreightAmount}
                            </Typography>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails sx={{ display: 'flex', borderBottom: '1px solid grey' }}>
                        <TextField
                            sx={style}
                            label="Invoice Number"
                            variant="outlined"
                            onChange={(e) => setInvoiceNumber(e.target.value)}
                            value={invoiceNumber}
                        />
                        {/* <AutoComplete
                                control={control}
                                fieldName="unloadingPoint"
                                label="Unloading Point"
                                data-testid={'select'}                          
                            /> */}
                        <TextField
                            sx={style}
                            label="Fright Amount"
                            variant="outlined"
                            onChange={(e) => setFreightAmount(e.target.value)}
                            value={freightAmount}
                        />
                        <Button
                            sx={style}
                            disabled={invoiceNumber == '' || freightAmount == ''}
                            onClick={handleOnClick}
                        >
                            Create Trip
                        </Button>
                    </AccordionDetails>
                </Accordion>
            ))}
        </>
    )
}

const ListAllTrip: React.FC<Props> = ({ allTrips, allStockTrips }) => {
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                    {getTableHead()}
                    {getTableBody(allTrips)}
                </Table>
            </TableContainer>
            {GetAllStockTripsAsAAccordion(allStockTrips)}
        </>
    )
}

export default ListAllTrip
