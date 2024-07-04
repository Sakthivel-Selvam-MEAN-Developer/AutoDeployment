import { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { epochToMinimalDate } from '../../../../commonUtils/epochToTime'
import { fileColumns } from './tripType'
import { formattedData } from './tableList'
export interface display {
    id: number
    billNo: string
    billDate: number
    cementCompany: {
        name: string
    }
    amount: number
    pdfLink: string
}
interface gridProp {
    display: display[]
}
const columns = fileColumns()
const InvoiceDataGrid: React.FC<gridProp> = ({ display }) => {
    const [rows, setRows] = useState<formattedData[]>([])
    useEffect(() => {
        try {
            const formattedData = display.map((row, index) => ({
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
    }, [display])
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} />
        </div>
    )
}
export default InvoiceDataGrid
