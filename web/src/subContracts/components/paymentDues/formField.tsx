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
    payableAmount: number
}
const FormField: React.FC<formProps> = ({
    setRefresh,
    refresh,
    id,
    type,
    fuelId,
    payableAmount
}): ReactElement => {
    const [transactionId, setTransactionId] = useState('')
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        updatePayment(paymentDate(event))
    }
    const paymentDate = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.target as HTMLFormElement
        if (form.paymentDate === undefined) return 0
        const formattedDays = form.paymentDate.value.split('/')
        const MMDDformat = `${formattedDays[1]}.${formattedDays[0]}.${formattedDays[2]}`
        return Math.floor(new Date(MMDDformat).getTime() / 1000)
    }
    const updatePayment = (paymentDate: number) =>
        updatePaymentDues({
            id,
            transactionId: transactionId === '' ? '0' : transactionId,
            paidAt: paymentDate,
            type,
            fuelId
        }).then(() => {
            setRefresh(!refresh)
            setTransactionId('')
        })
    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
            {payableAmount > 0 && (
                <>
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
                </>
            )}
            <Button
                disabled={transactionId === '' && payableAmount > 0}
                type="submit"
                sx={{ width: '200px', margin: '0 10px' }}
            >
                {payableAmount > 0 ? 'Pay' : 'Proceed to Final Pay'}
            </Button>
        </form>
    )
}
export default FormField
