import Table from '@mui/material/Table'
import React from 'react'
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
import { getAllUnloadingPoint } from '../../services/unloadingPoint.ts'

export interface AllStockProps {
    filledLoad: number
    freightAmount: number
    id: number
    invoiceNumber: string
    loadingPoint: { name: string; cementCompanyId: number }
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
    allStockTrips: AllStockProps[]
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>
    update: boolean
}
const tableCellData = [
    '#',
    'Vehicle Number',
    'Start Date',
    'Transporter',
    'Loading Point',
    'Stock Point',
    'Freight Amount',
    'Total Freight Amount'
]

const tableRow = (
    <TableRow>
        {tableCellData.map((data, index) => (
            <TableCell key={index} align="left">
                {data}
            </TableCell>
        ))}
    </TableRow>
)
const getTableHead = () => {
    return <TableHead>{tableRow}</TableHead>
}

const ShowTypography = (index: number, row: AllStockProps) => {
    return (
        <>
            <Typography style={{ fontSize: '15px', width: '3.5vw', padding: '3px 0' }}>
                {index + 1}
            </Typography>
            <Typography sx={{ fontSize: '15px', width: '12vw', padding: '3px 10px' }}>
                {row.truck.vehicleNumber}
            </Typography>
            <Typography sx={{ fontSize: '15px', width: '9.5vw', padding: '3px 10px' }}>
                {epochToMinimalDate(row.startDate)}
            </Typography>
            <Typography sx={{ fontSize: '15px', width: '17vw', padding: '3px 10px' }}>
                {row.truck.transporter.name}
            </Typography>
            <Typography sx={{ fontSize: '15px', width: '11.7vw', padding: '3px 10px' }}>
                {row.loadingPoint.name}
            </Typography>
            <Typography sx={{ fontSize: '15px', width: '12.5vw', padding: '3px 10px' }}>
                {row.stockPoint.name}
            </Typography>
            <Typography sx={{ fontSize: '15px', width: '12vw', padding: '3px 10px' }}>
                {row.freightAmount}
            </Typography>
            <Typography sx={{ fontSize: '15px', width: '10vw', padding: '3px 10px' }}>
                {row.totalFreightAmount}
            </Typography>
        </>
    )
}
const GetAllStockTripsAsAAccordion = (
    allStockTrips: AllStockProps[],
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>,
    update: boolean
) => {
    const [expanded, setExpanded] = useState<number | false>(false)
    const [unloadingPointList, setUnloadingPointList] = useState([])
    const handleAccordionExpand =
        (index: number, cementCompanyId: number) =>
        (_event: React.SyntheticEvent, isExpanded: boolean) => {
            isExpanded && getAllUnloadingPoint(cementCompanyId).then(setUnloadingPointList)
            setExpanded(isExpanded ? index : false)
        }
    return (
        <>
            {allStockTrips &&
                allStockTrips.map((row: AllStockProps, index: number) => (
                    <Accordion
                        key={row.id}
                        expanded={expanded === index}
                        onChange={handleAccordionExpand(index, row.loadingPoint.cementCompanyId)}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                            sx={{ borderBottom: '1px solid grey' }}
                        >
                            {ShowTypography(index, row)}
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{ display: 'flex', borderBottom: '1px solid grey', flex: '1' }}
                        >
                            <StockToUnloadingTrip
                                row={row}
                                setUpdate={setUpdate}
                                update={update}
                                unloadingPointList={unloadingPointList}
                                setExpanded={setExpanded}
                            />
                        </AccordionDetails>
                    </Accordion>
                ))}
        </>
    )
}
const tableContainer = () => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600 }} aria-label="simple table">
                {getTableHead()}
            </Table>
        </TableContainer>
    )
}

const ListAllTrip: React.FC<Props> = ({ allStockTrips, setUpdate, update }) => {
    return (
        <>
            {tableContainer()}
            {GetAllStockTripsAsAAccordion(allStockTrips, setUpdate, update)}
        </>
    )
}

export default ListAllTrip
