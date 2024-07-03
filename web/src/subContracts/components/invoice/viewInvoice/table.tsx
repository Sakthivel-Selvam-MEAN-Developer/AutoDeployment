import { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { getCompanyInvoice } from '../../../services/viewInvoice'
import { epochToMinimalDate } from '../../../../commonUtils/epochToTime'
const columns = [
    { field: 'id', headerName: '#', width: 70 },
    { field: 'billNo', headerName: 'Bill Number', width: 150, flex: 1 },
    { field: 'billDate', headerName: 'Date Created', width: 150, flex: 1 },
    { field: 'company', headerName: 'Company Name', width: 200, flex: 1 },
    { field: 'amount', headerName: 'Amount', width: 150, flex: 1 },
    {
        field: 'pdfLink',
        headerName: 'PDF File Link',
        width: 200,
        flex: 1,
        renderCell: (params: any) => (
            <a href={params.value} target="_blank" rel="noopener noreferrer">
                View PDF
            </a>
        )
    }
]
const InvoiceDataGrid = () => {
    const [rows, setRows] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCompanyInvoice()
                const formattedData = data.map((row: any, index: number) => ({
                    id: index + 1,
                    billNo: row.billNo,
                    billDate: epochToMinimalDate(row.billDate),
                    company: row.cementCompany.name,
                    amount: `₹ ${row.amount}`,
                    pdfLink: row.pdfLink
                }))
                setRows(formattedData)
            } catch (error) {
                console.error('Error fetching company invoices:', error)
            }
        }
        fetchData()
    }, [])
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} />
        </div>
    )
}
export default InvoiceDataGrid
