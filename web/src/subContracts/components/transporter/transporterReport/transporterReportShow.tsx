import Table from '@mui/material/Table'
import React from 'react'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { CircularLoader } from '../../cementCompany/companyReport/companyReportShow'

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

const cellNames = [
    'Name',
    'Csm Name',
    'Email Id',
    'Contact Person Name',
    'Contact Person Number',
    'Address',
    'HasGst',
    'Gst Number',
    'Gst Percentage',
    'Has Tds',
    'Transporter Type',
    'Tds Percentage',
    'AccountHolder',
    'Account Number',
    'IFSC',
    'AccountType Number'
]

const tableRow = (
    <TableRow>
        <TableCell>#</TableCell>
        {cellNames.map((name) => (
            <TableCell align="left">{name}</TableCell>
        ))}
    </TableRow>
)
const getTableHead = () => {
    return <TableHead>{tableRow}</TableHead>
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
            {loading ? <CircularLoader /> : tableContainer(allTransporter)}
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
