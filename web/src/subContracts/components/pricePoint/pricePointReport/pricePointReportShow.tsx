import Table from '@mui/material/Table'
import React from 'react'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Box, CircularProgress } from '@mui/material'

interface Props {
    allPricePoint: picePointProps[]
    loading: boolean
}
interface picePointProps {
    freightAmount: number
    transporterAmount: number
    transporterPercentage: number
    payGeneratingDuration: number
    loadingPoint: locationProps
    unloadingPoint: locationProps
    stockPoint: locationProps
}
interface locationProps {
    name: string
    cementCompany: companyProps
}
interface companyProps {
    name: string
}
const cellNames = [
    'Company Name',
    'Loading Point',
    'Unloading Point',
    'Stock Point',
    'freightAmount',
    'transporterPercentage',
    'transporterAmount',
    'payGeneratingDuration'
]
const cells = (cell: string, index: number) => {
    return (
        <TableCell key={index} align="center">
            {cell}
        </TableCell>
    )
}
const tableRow = (
    <TableRow>
        <TableCell>#</TableCell>
        {cellNames.map((name, index) => cells(name, index))}
    </TableRow>
)

const getTableHead = () => {
    return <TableHead>{tableRow}</TableHead>
}
function cell(pricePoint: picePointProps) {
    return (
        <>
            <TableCell align="left">
                {pricePoint.unloadingPoint !== null
                    ? pricePoint.unloadingPoint.cementCompany.name
                    : pricePoint.loadingPoint.cementCompany.name}
            </TableCell>
            <TableCell align="left">
                {pricePoint.loadingPoint !== null ? pricePoint.loadingPoint.name : 'Null'}
            </TableCell>
            <TableCell align="left">
                {pricePoint.unloadingPoint !== null ? pricePoint.unloadingPoint.name : 'Null'}
            </TableCell>
            <TableCell align="left">
                {pricePoint.stockPoint !== null ? pricePoint.stockPoint.name : 'Null'}
            </TableCell>
            <TableCell align="left">{pricePoint.freightAmount}</TableCell>
            <TableCell align="left">{pricePoint.transporterPercentage}</TableCell>
            <TableCell align="left">{pricePoint.transporterAmount}</TableCell>
            <TableCell align="left">{pricePoint.payGeneratingDuration}</TableCell>
        </>
    )
}
const getTableBody = (allPricePoint: picePointProps[]) => {
    return (
        <>
            <TableBody>
                {allPricePoint &&
                    allPricePoint.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell> {index + 1} </TableCell>
                            {cell(row)}
                        </TableRow>
                    ))}
            </TableBody>
        </>
    )
}

const tableContainer = (allPricePoint: picePointProps[]) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600 }} aria-label="simple table">
                {getTableHead()}
                {getTableBody(allPricePoint)}
            </Table>
        </TableContainer>
    )
}
export const CircularLoader = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
        </Box>
    )
}
const TablePricePoint: React.FC<Props> = ({ allPricePoint: allPricePoint, loading }) => {
    return <>{loading ? <CircularLoader /> : tableContainer(allPricePoint)}</>
}
const ListAllPricePoint: React.FC<Props> = ({ allPricePoint: allCompany, loading }) => {
    return (
        <>
            <TablePricePoint allPricePoint={allCompany} loading={loading} />
            <br />
            <br />
        </>
    )
}

export default ListAllPricePoint
