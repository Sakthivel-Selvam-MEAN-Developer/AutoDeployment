import React, { ReactElement, useState } from 'react'
import { updatePaymentDues } from '../../services/paymentDues'
import { Button, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import AlertDialog from '../../../commonUtils/confirmationDialog'
import dayjs from 'dayjs'
import { CheckUser } from '../../../auth/checkUser'
interface formProps {
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>
    refresh: boolean
    id: number
    fuelId: number
    type: string
    payableAmount: number
    setOpenSuccessDialog: React.Dispatch<React.SetStateAction<boolean>>
}
interface dateProps {
    $d: number
}
const FormField: React.FC<formProps> = ({
    setRefresh,
    refresh,
    id,
    type,
    fuelId,
    payableAmount,
    setOpenSuccessDialog
}): ReactElement => {
    const authoriser = CheckUser()
    const [transactionId, setTransactionId] = useState('')
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
    const [paymentDate, setPaymentDate] = useState(0)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const coverDateToEpoc = (date: any) => {
        const formattedDays =
            date !== null ? dayjs(dayjs((date as unknown as dateProps)?.$d)).unix() : 0
        setPaymentDate(formattedDays)
    }
    const clear = () => {
        setRefresh(!refresh)
        setTransactionId('')
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setOpenConfirmDialog(true)
    }
    const updatePayment = () => {
        updatePaymentDues({
            id,
            transactionId: transactionId === '' ? '0' : transactionId,
            paidAt: paymentDate,
            type,
            fuelId
        }).then(() => reset())
    }
    const reset = () => {
        clear()
        setOpenSuccessDialog(true)
        setOpenConfirmDialog(false)
    }
    return (
        <>
            <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
                {(authoriser.adminAccess || authoriser.semiAccess) && payableAmount > 0 && (
                    <>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Payment Date"
                                name="paymentDate"
                                format="DD/MM/YYYY"
                                sx={{ margin: '0 10px' }}
                                onChange={coverDateToEpoc}
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
                {(authoriser.adminAccess || authoriser.semiAccess) && (
                    <Button
                        disabled={transactionId === '' && payableAmount > 0}
                        type="submit"
                        sx={{ width: '200px', margin: '0 10px' }}
                    >
                        {payableAmount > 0 ? 'Pay' : 'Proceed to Final Pay'}
                    </Button>
                )}
            </form>
            <AlertDialog
                open={openConfirmDialog}
                handleClose={() => setOpenConfirmDialog(false)}
                handleAgree={() => updatePayment()}
                message={`Do you want add Transaction ID?`}
            />
        </>
    )
}
export default FormField
