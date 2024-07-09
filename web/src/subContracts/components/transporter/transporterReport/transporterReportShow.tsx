import React, { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
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
    createdAt?: string
    updatedAt?: string
    id?: string
}
const cellNames = [
    'Name',
    'CSM Name',
    'Email Id',
    'Contact Person Name',
    'Contact Person Number',
    'Address',
    'GST',
    'GST Number',
    'GST Percentage',
    'TDS',
    'Transporter Type',
    'TDS Percentage',
    'AccountHolder',
    'Account Number',
    'BranchName',
    'IFSC',
    'AccountType',
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
    const cells = Object.entries(data)
        .filter(([key]) => key !== 'createdAt' && key !== 'updatedAt' && key !== 'id')
        .map(([key, value]) => {
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
const ListAllTransporter: React.FC<Props> = ({ allTransporter, loading }) => {
    const [open, setOpen] = useState(false)
    const [selectedRow, setSelectedRow] = useState<Row | null>(null)
    const handleEdit = (row: Row) => {
        setSelectedRow(row)
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
        setSelectedRow(null)
    }
    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    const formatKey = (key: string) => {
        return key
            .split(/(?=[A-Z])/)
            .map(capitalizeFirstLetter)
            .join(' ')
    }
    return (
        <>
            {loading ? <CircularLoader /> : tableContainer(allTransporter, handleEdit)}
            <br />
            <br />
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>Edit Transporter Details</DialogTitle>
                <DialogContent>
                    {selectedRow && (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableBody>
                                    {Object.entries(selectedRow)
                                        .filter(
                                            ([key]) =>
                                                key !== 'createdAt' &&
                                                key !== 'updatedAt' &&
                                                key !== 'id'
                                        )
                                        .map(([key, value]) => (
                                            <TableRow key={key}>
                                                <TableCell style={{ fontWeight: 'bold' }}>
                                                    {formatKey(key)}
                                                </TableCell>
                                                <TableCell>{value ? value : 'NULL'}</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                    <Button onClick={() => console.log('Save Changes')} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
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
                <Button variant="contained" color="primary" onClick={() => handleEdit(row)}>
                    <ModeEditIcon />
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
