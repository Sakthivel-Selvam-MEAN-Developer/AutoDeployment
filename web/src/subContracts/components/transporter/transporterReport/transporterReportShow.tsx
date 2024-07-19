import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Button from '@mui/material/Button'
import EditNoteIcon from '@mui/icons-material/EditNote'
import { CircularLoader } from '../../cementCompany/companyReport/companyReportShow'
interface Props {
    allTransporter: Row[]
    loading: boolean
    handleEdit: (row: Row) => void
}
export interface Row {
    id: number
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
    branchName: string
    ifsc: string
    accountTypeNumber: number
    panNumber: string
    aadharNumber: string
    employee?: {
        name: string
    }
}
const columns = (handleEdit: (row: Row) => void): GridColDef[] => [
    { field: 'index', headerName: '#', width: 40 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'employeeName', headerName: 'CSM Name New', width: 130 },
    { field: 'emailId', headerName: 'Email Id', width: 150 },
    { field: 'contactPersonName', headerName: 'Contact Person Name', width: 150 },
    { field: 'contactPersonNumber', headerName: 'Contact Person Number', width: 150 },
    { field: 'address', headerName: 'Address', width: 150 },
    { field: 'aadharNumber', headerName: 'Aadhaar Number', width: 150 },
    { field: 'panNumber', headerName: 'Pan Number', width: 150 },
    { field: 'hasGst', headerName: 'GST', width: 90 },
    { field: 'gstNumber', headerName: 'GST Number', width: 100 },
    { field: 'gstPercentage', headerName: 'GST Percentage', width: 100 },
    { field: 'hasTds', headerName: 'TDS', width: 90 },
    { field: 'transporterType', headerName: 'Transporter Type', width: 150 },
    { field: 'tdsPercentage', headerName: 'TDS Percentage', width: 100 },
    { field: 'accountHolder', headerName: 'Account Holder', width: 150 },
    { field: 'accountNumber', headerName: 'Account Number', width: 150 },
    { field: 'branchName', headerName: 'Branch Name', width: 100 },
    { field: 'ifsc', headerName: 'IFSC', width: 150 },
    { field: 'accountTypeNumber', headerName: 'Account Type', width: 130 },
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
const ListAllTransporter: React.FC<Props> = ({ allTransporter, loading, handleEdit }) => {
    if (loading) {
        return <CircularLoader />
    }
    const rowsWithId = allTransporter.map((row, index) => ({
        ...row,
        index: index + 1,
        id: row.id,
        employeeName: row.employee?.name || null
    }))
    return (
        <div style={{ height: 390, width: '100%' }}>
            <DataGrid rows={rowsWithId} columns={columns(handleEdit)} />
        </div>
    )
}
export default ListAllTransporter
