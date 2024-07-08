import { TextField } from '@mui/material'
import { FC } from 'react'
import { containerProps } from './dialogFieldTypes'

const DepotTextField: FC<containerProps> = ({ invoiceValues, setInvoiceValues }) => {
    return (
        <TextField
            style={{ margin: '20px 0' }}
            fullWidth
            label="Enter Depot"
            value={invoiceValues.depot}
            onChange={(event) => {
                setInvoiceValues((preData) => {
                    return { ...preData, depot: event.target.value }
                })
            }}
        />
    )
}
export default DepotTextField
