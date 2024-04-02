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
    allCompany: Row[]
    loading: boolean
}
interface Row {
    name: string
    advanceType: number
    gstNo: string
    address: string
    emailId: string
    contactPersonName: string
    contactPersonNumber: string
}

const getTableHead = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">advanceType</TableCell>
                <TableCell align="left">gstNo</TableCell>
                <TableCell align="left">address</TableCell>
                <TableCell align="left">emailId</TableCell>
                <TableCell align="left">contactPersonName</TableCell>
                <TableCell align="left">contactPersonNumber</TableCell>
            </TableRow>
        </TableHead>
    )
}
function cell(data: Row) {
    const cells = Object.entries(data).map(([key, value]) => {
        if (key == 'createdAt' || key == 'updatedAt' || key == 'id') return
        return (
            <TableCell key={key} align="left">
                {value}
            </TableCell>
        )
    })
    return cells
}
const getTableBody = (allCompany: Row[]) => {
    return (
        <>
            <TableBody>
                {allCompany &&
                    allCompany.map((row, index) => (
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

const tableContainer = (allCompany: Row[]) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600 }} aria-label="simple table">
                {getTableHead()}
                {getTableBody(allCompany)}
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
const TableCompany: React.FC<Props> = ({ allCompany, loading }) => {
    return <>{loading ? <CircularLoader /> : tableContainer(allCompany)}</>
}
const ListAllCompany: React.FC<Props> = ({ allCompany, loading }) => {
    return (
        <>
            <TableCompany allCompany={allCompany} loading={loading} />
            <br />
            <br />
        </>
    )
}

export default ListAllCompany
