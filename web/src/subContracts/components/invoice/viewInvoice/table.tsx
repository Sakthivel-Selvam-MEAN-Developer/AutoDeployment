/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { epochToMinimalDate } from '../../../../commonUtils/epochToTime'
import { formattedData } from './tableList'
import { gridProp } from './showTypes'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { closeDialogBox, openDialogBox, pdfBox, link } from './tableCells'
import { columns } from './tripType'

const InvoiceDataGrid: React.FC<gridProp> = ({ display }) => {
    const [rows, setRows] = useState<formattedData[]>([])
    const [pdfLink, setPdfLink] = useState<string | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [page, setPage] = useState(1)
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
    const column = columns.map((column) => {
        if (column.field === 'pdfLink') {
            return {
                ...column,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                renderCell: (params: any) => link(handleOpenDialog, params)
            }
        }
        return column
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handlePageChange = (_event: any, value: React.SetStateAction<number>) => {
        setPage(value)
    }

    const paginatedRows = rows.slice((page - 1) * 50, page * 50)

    return (
        <div style={{ height: 600, width: '100%' }}>
            <DataGrid
                rows={paginatedRows}
                columns={column}
                hideFooter
                pageSizeOptions={[50]}
                disableRowSelectionOnClick
            />
            {pdfBox(dialogOpen, handleCloseDialog, pdfLink)}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '10px 0'
                }}
            >
                <Stack spacing={2}>{pagination(rows, page, handlePageChange)}</Stack>
            </div>
        </div>
    )
}
export default InvoiceDataGrid

function pagination(
    rows: formattedData[],
    page: number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handlePageChange: (_event: any, value: React.SetStateAction<number>) => void
) {
    return (
        <Pagination
            count={Math.ceil(rows.length / 50)}
            page={page}
            onChange={handlePageChange}
            size="large"
            shape="rounded"
            color="primary"
        />
    )
}
