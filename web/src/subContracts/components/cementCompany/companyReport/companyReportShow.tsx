import React from 'react'
import { Box, CircularProgress } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import EditNoteIcon from '@mui/icons-material/EditNote'
import Button from '@mui/material/Button'

interface Props {
    allCompany: Rows[]
    loading: boolean
    handleEdit: (row: Rows) => void
}
export interface Rows {
    id: number
    name: string
    gstNo: string
    address: string
    emailId: string
    contactPersonName: string
    contactPersonNumber: string
}
const columns = (handleEdit: (row: Rows) => void): GridColDef[] => [
    { field: 'index', headerName: '#', width: 70 },
    { field: 'name', headerName: 'Name', width: 320 },
    { field: 'gstNo', headerName: 'GstNo', width: 250 },
    { field: 'address', headerName: 'Address', width: 250 },
    { field: 'emailId', headerName: 'Email Id', width: 250 },
    { field: 'contactPersonName', headerName: 'Contact Person Name', width: 200 },
    { field: 'contactPersonNumber', headerName: 'Contact Person Number', width: 200 },
    {
        field: 'action',
        headerName: 'Actions',
        width: 100,
        renderCell: (params) => (
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    handleEdit(params.row as Rows)
                }}
            >
                <EditNoteIcon />
            </Button>
        )
    }
]
export const CircularLoader = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
        </Box>
    )
}
const TableCompany: React.FC<Props> = ({ allCompany, loading, handleEdit }) => {
    const rowsWithId = allCompany.map((row, index) => ({
        ...row,
        index: index + 1,
        id: row.id
    }))
    return (
        <Box sx={{ height: 500, width: '95%' }}>
            {loading ? (
                <CircularLoader />
            ) : (
                <DataGrid rows={rowsWithId} columns={columns(handleEdit)} hideFooter/>
            )}
        </Box>
    )
}
const ListAllCompany: React.FC<Props> = ({ allCompany, loading, handleEdit }) => {
    return (
        <>
            <TableCompany allCompany={allCompany} loading={loading} handleEdit={handleEdit} />
            <br />
            <br />
        </>
    )
}
export default ListAllCompany
