import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import EditNoteIcon from '@mui/icons-material/EditNote'
import { CircularLoader } from '../../cementCompany/companyReport/companyReportShow'

interface Props {
    allTransporter: Row[]
    loading: boolean
    handleEdit: (row: Row) => void
}
export interface Row {
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
    'GST Number',
    'GST Percentage',
    'Has Tds',
    'Transporter Type',
    'Tds Percentage',
    'AccountHolder',
    'Account Number',
    'BranchName',
    'IFSC',
    'AccountType Number',
    'Actions'
]
const tableRow = (
    <TableRow>
        <TableCell>#</TableCell>
        {cellNames.map((name, index) => (
            <TableCell key={index} align="center" style={{ fontWeight: 'bold' }}>
                {name}
            </TableCell>
        ))}
    </TableRow>
)
const getTableHead = () => {
    return <TableHead>{tableRow}</TableHead>
}
function cell(data: Row) {
    const cells = Object.entries(data).map(([key, value]) => {
        if (key === 'createdAt' || key === 'updatedAt' || key === 'id') return null
        return subCell(key, value)
    })
    return cells
}
const style = { '&:last-child td, &:last-child th': { border: 0 } }
const getTableBody = (allTransporter: Row[], handleEdit: (row: Row) => void) => {
    return (
        <TableBody>
            {allTransporter &&
                allTransporter.map((row, index) => tableBodyRow(index, row, handleEdit))}
        </TableBody>
    )
}
const tableContainer = (allTransporter: Row[], handleEdit: (row: Row) => void) => {
    return (
        <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
            <Table stickyHeader sx={{ minWidth: 600 }} aria-label="sticky table">
                {getTableHead()}
                {getTableBody(allTransporter, handleEdit)}
            </Table>
        </TableContainer>
    )
}
const ListAllTransporter: React.FC<Props> = ({ allTransporter, loading, handleEdit }) => {
    return (
        <>
            {loading ? <CircularLoader /> : tableContainer(allTransporter, handleEdit)}
            <br />
            <br />
        </>
    )
}

export default ListAllTransporter

function tableBodyRow(index: number, row: Row, handleEdit: (row: Row) => void) {
    return (
        <TableRow key={index} sx={style}>
            <TableCell>{index + 1}</TableCell>
            {cell(row)}
            <TableCell align="center">
                <Button onClick={() => handleEdit(row)} variant="contained" color="primary">
                    <EditNoteIcon />
                </Button>
            </TableCell>
        </TableRow>
    )
}

function subCell(key: string, value: string) {
    return (
        <TableCell key={key} align="left">
            {value ? value : 'NULL'}
        </TableCell>
    )
}
