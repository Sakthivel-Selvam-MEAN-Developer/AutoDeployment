import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { columns } from './dataGridInputs'
import React, { FC, useState } from 'react'
import { Button } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { dateProps } from '../generateInvoice/list'
import { updateSubmittedDateForInvoice } from '../../../services/invoiceSubmissionDate'
import { billProps } from './list'
interface gridRows {
    gridRows: {
        id: number
        billNo: string
        billDate: string
        cementCompany: string
        amount: number
    }[]
    setBillDetails: React.Dispatch<React.SetStateAction<billProps[]>>
}
const DataTable: FC<gridRows> = ({ gridRows, setBillDetails }) => {
    const [date, setDate] = useState<{ [key: number]: number }>({})
    const onChange = (rowId: number) => {
        if (date[rowId] === undefined) return
        updateSubmittedDateForInvoice({ id: rowId, submitDate: date[rowId] }).then(() => {
            setBillDetails((prev) => prev.filter(({ id }) => id !== rowId))
        })
    }
    const headers: GridColDef[] = columns.map((column) => ({
        ...column,
        renderCell: (params) => {
            if (column.field === 'action') {
                return (
                    <Button variant="text" onClick={() => onChange(params.row.id)}>
                        Add
                    </Button>
                )
            } else if (column.field === 'submissionDate') {
                return (
                    <GetDateField
                        key={params.row.id}
                        updateDate={(date: number) => {
                            setDate((prev) => ({ ...prev, [params.row.id]: date }))
                        }}
                    />
                )
            }
        }
    }))
    return (
        <div>
            <DataGrid
                sx={{ width: '88vw', height: '40vw', marginLeft: 4 }}
                columns={headers}
                rows={gridRows}
                disableRowSelectionOnClick
                hideFooterPagination
            />
        </div>
    )
}

export default DataTable
interface dateFieldProps {
    updateDate: (date: number) => void
}
const GetDateField: FC<dateFieldProps> = ({ updateDate }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-in">
            <DatePicker
                label="SubmittedDate"
                onChange={(newValue) => {
                    const date = dayjs((newValue as unknown as dateProps)?.$d).format('DD/MM/YYYY')
                    const submitDate = dayjs.utc(date, 'DD/MM/YYYY').unix()
                    updateDate(submitDate)
                }}
            />
        </LocalizationProvider>
    )
}
