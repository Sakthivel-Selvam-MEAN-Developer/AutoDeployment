import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Button from '@mui/material/Button'
import EditNoteIcon from '@mui/icons-material/EditNote'
import { CircularLoader } from '../../cementCompany/companyReport/companyReportShow'
import dayjs from 'dayjs'
interface Props {
    allEmployee: Row[]
    loading: boolean
    handleEdit: (row: Row) => void
}
export interface Row {
    id: number
    corporateId: string
    joiningDate: number
    name: string
    mailId: string
    contactNumber: string
    department: string
    designation: string
    address: string
    dateOfBirth: number
    aadharNumber: string
    panNumber: string
    bloodGroup: string
    accountName: string
    accountNumber: string
    ifscCode: string
    branch: string
    accountType: string
    loginAccess: boolean
}
const columns = (handleEdit: (row: Row) => void): GridColDef[] => [
    { field: 'index', headerName: '#', width: 40 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'mailId', headerName: 'Email Id', width: 150 },
    { field: 'contactNumber', headerName: 'Contact Number', width: 150 },
    { field: 'corporateId', headerName: 'Employee Code', width: 150 },
    { field: 'department', headerName: 'Department', width: 150 },
    { field: 'designation', headerName: 'Designation', width: 150 },
    { field: 'aadharNumber', headerName: 'Aadhaar Number', width: 150 },
    { field: 'panNumber', headerName: 'Pan Number', width: 150 },
    { field: 'address', headerName: 'Address', width: 90 },
    { field: 'dateOfBirth', headerName: 'Date Of Birth', width: 100 },
    { field: 'joiningDate', headerName: 'Joining Date', width: 100 },
    { field: 'bloodGroup', headerName: 'Blood Group', width: 90 },
    { field: 'accountName', headerName: 'Account Name', width: 150 },
    { field: 'accountNumber', headerName: 'Account Number', width: 100 },
    { field: 'ifscCode', headerName: 'IFSC Code', width: 150 },
    { field: 'branch', headerName: 'Branch Name', width: 100 },
    { field: 'accountType', headerName: 'Account Type', width: 130 },
    {
        field: 'actions',
        headerName: 'Actions',
        width: 130,
        renderCell: (params) => (
            <Button
                onClick={() => handleEdit(params.row as Row)}
                variant="contained"
                color="primary"
            >
                <EditNoteIcon />
            </Button>
        )
    }
]
const ListAllEmployee: React.FC<Props> = ({ allEmployee, loading, handleEdit }) => {
    if (loading) {
        return <CircularLoader />
    }
    const rowsWithId = allEmployee?.map((row, index) => ({
        ...row,
        dateOfBirth: dayjs.unix(row.dateOfBirth).format('DD MMM YYYY'),
        joiningDate: dayjs.unix(row.joiningDate).format('DD MMM YYYY'),
        index: index + 1,
        id: row.id
    }))
    return (
        <div style={{ height: 390, width: '100%' }}>
            <DataGrid rows={rowsWithId} columns={columns(handleEdit)} />
        </div>
    )
}
export default ListAllEmployee
