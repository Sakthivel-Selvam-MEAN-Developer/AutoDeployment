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
    allTransporter: Row[]
    loading: boolean
}
interface Row {
    name: string
    csmName: string
    emailId: string
    contactPersonName: string
    contactPersonNumber: string
    address: string
    hasGst: boolean
    gstNumber: string
    gstPercentage: number
    hasTds: boolean
    transporterType: string
    tdsPercentage: number
    accountHolder: string
    accountNumber: string
    ifsc: string
    accountTypeNumber: number
}

const getTableHead = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Csm Name</TableCell>
                <TableCell align="left">Email Id</TableCell>
                <TableCell align="left">Contact Person Name</TableCell>
                <TableCell align="left">Contact Person Number</TableCell>
                <TableCell align="left">Address</TableCell>
                <TableCell align="left">HasGst</TableCell>
                <TableCell align="left">Gst Number</TableCell>
                <TableCell align="left">Gst Percentage</TableCell>
                <TableCell align="left">Has Tds</TableCell>
                <TableCell align="left">Transporter Type</TableCell>
                <TableCell align="left">Tds Percentage</TableCell>
                <TableCell align="left">AccountHolder</TableCell>
                <TableCell align="left">Account Number</TableCell>
                <TableCell align="left">IFSC</TableCell>
                <TableCell align="left">AccountType Number</TableCell>
            </TableRow>
        </TableHead>
    )
}
function cell(data: Row) {
    const cells = Object.entries(data).map(([key, value]) => {
        if (key == 'createdAt' || key == 'updatedAt' || key == 'id') return
        return subCell(key, value)
    })
    return cells
}
const getTableBody = (allTransporter: Row[]) => {
    return (
        <>
            <TableBody>
                {allTransporter &&
                    allTransporter.map((row, index) => (
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

const tableContainer = (allTransporter: Row[]) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600 }} aria-label="simple table">
                {getTableHead()}
                {getTableBody(allTransporter)}
            </Table>
        </TableContainer>
    )
}

const ListAllTransporter: React.FC<Props> = ({ allTransporter, loading }) => {
    return (
        <>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                tableContainer(allTransporter)
            )}
            <br />
            <br />
        </>
    )
}

export default ListAllTransporter

function subCell(key: string, value: string) {
    return (
        <TableCell key={key} align="left">
            {value ? value : 'NULL'}
        </TableCell>
    )
}
