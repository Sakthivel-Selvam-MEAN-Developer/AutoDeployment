import React, { FormEvent, ReactElement, useState } from 'react'
import dayjs from 'dayjs'
import { updatePaymentDues } from '../../services/paymentDues'
import { Button, TextField } from '@mui/material'

interface formProps {
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>
    refresh: boolean
    id: number
}
const FormField: React.FC<formProps> = ({ setRefresh, refresh, id }): ReactElement => {
    const [transactionId, setTransactionId] = useState('')
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const details = {
            id,
            transactionId,
            paidAt: dayjs().unix()
        }
        updatePaymentDues(details).then(() => {
            setRefresh(!refresh)
            setTransactionId('')
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
                <TextField
                    id="outlined-basic"
                    label="Transaction Id"
                    name="transactionId"
                    variant="outlined"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    sx={{ width: '200px' }}
                />
                <Button
                    disabled={transactionId == ''}
                    type="submit"
                    sx={{ width: '100px', margin: '0 10px' }}
                >
                    Pay
                </Button>
            </form>
        </>
    )
}
export default FormField
