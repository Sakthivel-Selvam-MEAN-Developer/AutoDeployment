import React, { ReactElement, useState } from 'react'
import { updatePaymentDues } from '../../services/paymentDues'
import { Button, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
interface formProps {
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>
    refresh: boolean
    id: number
    fuelId: number
    type: string
}
const FormField: React.FC<formProps> = ({
    setRefresh,
    refresh,
    id,
    type,
    fuelId
}): ReactElement => {
    const [transactionId, setTransactionId] = useState('')
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const formattedDays = form.paymentDate.value.split('/')
        const MMDDformat = `${formattedDays[1]}.${formattedDays[0]}.${formattedDays[2]}`
        const paymentDate = Math.floor(new Date(MMDDformat).getTime() / 1000)
        updatePayment(paymentDate)
    }
    const updatePayment = (paymentDate: number) =>
        updatePaymentDues({ id, transactionId, paidAt: paymentDate, type, fuelId }).then(() => {
            setRefresh(!refresh)
            setTransactionId('')
        })
    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Payment Date"
                    name="paymentDate"
                    format="DD/MM/YYYY"
                    sx={{ margin: '0 10px' }}
                />
            </LocalizationProvider>
            <TextField
                id="outlined-basic"
                label="Transaction Id"
                name="transactionId"
                variant="outlined"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                sx={{ width: '200px', margin: '0 10px' }}
            />
            <Button
                disabled={transactionId == ''}
                type="submit"
                sx={{ width: '100px', margin: '0 10px' }}
            >
                Pay
            </Button>
        </form>
    )
}
export default FormField
