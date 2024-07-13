import React from 'react'
import { Box, CircularProgress } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
interface Props {
    allCompany: Row[]
    loading: boolean
}
interface Row {
    name: string
    gstNo: string
    address: string
    emailId: string
    contactPersonName: string
    contactPersonNumber: string
}
const columns: GridColDef[] = [
    { field: 'id', headerName: '#', width: 50 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'gstNo', headerName: 'GstNo', width: 150 },
    { field: 'address', headerName: 'Address', width: 200 },
    { field: 'emailId', headerName: 'Email Id', width: 200 },
    { field: 'contactPersonName', headerName: 'Contact Person Name', width: 200 },
    { field: 'contactPersonNumber', headerName: 'Contact Person Number', width: 200 }
]
export const CircularLoader = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
        </Box>
    )
}
const TableCompany: React.FC<Props> = ({ allCompany, loading }) => {
    const rowsWithId = allCompany.map((row, index) => ({
        ...row,
        id: index + 1
    }))
    return (
        <Box sx={{ height: 500, width: '100%' }}>
            {loading ? <CircularLoader /> : <DataGrid rows={rowsWithId} columns={columns} />}
        </Box>
    )
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
