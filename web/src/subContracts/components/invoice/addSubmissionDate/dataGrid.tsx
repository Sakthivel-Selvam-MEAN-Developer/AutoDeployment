import { DataGrid } from '@mui/x-data-grid'
import { columns } from './dataGridInputs'
// import dayjs from "dayjs"
// import { dateProps } from "../generateInvoice/list"
import { FC } from 'react'
import { Button } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
interface gridRows {
    gridRows: {
        id: number
        billNo: string
        billDate: string
        cementCompany: string
        amount: number
    }[]
}
const DataTable: FC<gridRows> = ({ gridRows }) => {
    columns.map((column) => ({
        ...column,
        renderCell: () => {
            if (column.field === 'action') {
                return <Button variant="text">Add</Button>
            } else if (column.field === 'submissionDate') {
                return <GetDateField />
            }
        }
    }))
    return (
        <div>
            <DataGrid
                columns={columns}
                rows={gridRows}
                disableRowSelectionOnClick
                hideFooterPagination
            />
        </div>
    )
}

export default DataTable

const GetDateField: FC = () => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-in">
            <DatePicker
                label="SubmittedDate"
                // onChange={(newValue) => {
                //     const endDate = dayjs
                //         .utc(dayjs((newValue as unknown as dateProps)?.$d))
                //         .unix()
                // }}
            />
        </LocalizationProvider>
    )
}
