import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { epochToMinimalDate } from '../../../../commonUtils/epochToTime'
import { fileColumns } from './tripType'
import { formattedData } from './tableList'
import { gridProp } from './showTypes'
import { closeDialogBox, openDialogBox, pdfBox, link } from './tableCells'
const InvoiceDataGrid: React.FC<gridProp> = ({ display }) => {
    const [rows, setRows] = useState<formattedData[]>([])
    const [pdfLink, setPdfLink] = useState<string | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)
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
    const handleOpenDialog = openDialogBox(setPdfLink, setDialogOpen)
    const handleCloseDialog = closeDialogBox(setDialogOpen, setPdfLink)
    const columns = fileColumns().map((column) => {
        if (column.field === 'pdfLink') {
            return {
                ...column,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                renderCell: (params: any) => link(handleOpenDialog, params)
            }
        }
        return column
    })
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} hideFooterPagination />
            {pdfBox(dialogOpen, handleCloseDialog, pdfLink)}
        </div>
    )
}
export default InvoiceDataGrid
