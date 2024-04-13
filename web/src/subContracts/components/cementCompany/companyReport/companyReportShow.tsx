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
const cellNames = [
    'Name',
    'advanceType',
    'gstNo',
    'address',
    'emailId',
    'contactPersonName',
    'contactPersonNumber'
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
function cell(data: Row) {
    return Object.entries(data).map(([key, value]) => {
        if (key == 'createdAt' || key == 'updatedAt' || key == 'id') return
        return (
            <TableCell key={key} align="left">
                {value}
            </TableCell>
        )
    })
}
const style = { '&:last-child td, &:last-child th': { border: 0 } }
const getTableBody = (allCompany: Row[]) => {
    return (
        <TableBody>
            {allCompany && allCompany.map((row, index) => tableBodyRow(index, row))}
        </TableBody>
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
function tableBodyRow(index: number, row: Row) {
    return (
        <TableRow key={index} sx={style}>
            <TableCell> {index + 1} </TableCell>
            {cell(row)}
        </TableRow>
    )
}
