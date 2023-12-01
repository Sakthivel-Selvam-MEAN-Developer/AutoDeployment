import React from 'react'
import { Button, FormControlLabel, Switch, TextField } from '@mui/material'
import { useForm, SubmitHandler } from 'react-hook-form'
import dayjs from 'dayjs'
import { useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import FetchReason from './fetchReason'
import { create } from '../../services/employeeLeave'
import { useNavigate } from 'react-router-dom'
import SuccessDialog from '../../../wonderMove/components/SuccessDialog'
import { useAtomValue } from 'jotai/react'
import { userIdAtom } from '../layout/userAtom.tsx'

interface FormData {
    appliedBy: string
}

const LeaveForm: React.FC = () => {
    const navigate = useNavigate()
    const { handleSubmit } = useForm<FormData>()
    const [fromValue, setFromValue] = useState<dayjs.Dayjs | null>(null)
    const [toValue, setToValue] = useState<dayjs.Dayjs | null>(null)
    const [startIsHalfDay, setStartIsHalfDay] = useState(false)
    const [endIsHalfDay, setEndIsHalfDay] = useState(false)
    const [reason, setReason] = useState('')
    const [comment, setComment] = useState('')
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
    const employeeId = useAtomValue(userIdAtom)

    const onSubmit: SubmitHandler<FormData> = () => {
        const details = {
            isFromHalfDay: startIsHalfDay,
            isToHalfDay: endIsHalfDay,
            leaveReasonId: reason,
            from: fromValue?.unix(),
            to: toValue?.unix(),
            appliedOn: dayjs().unix(),
            comments: comment,
            employeeId
        }

        create(JSON.stringify(details))
            .then(() => setOpenSuccessDialog(true))
            .catch((err) => alert(err))
    }

    const handleClose = () => {
        setOpenSuccessDialog(false)
        navigate(-1)
    }
    const handleChange = (event: any) => {
        setComment(event.target.value)
    }
    const isFormIncomplete = !fromValue || !toValue || !reason || !comment

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div
                    style={{
                        display: 'flex',
                        gap: '10px',
                        rowGap: '10px',
                        flexWrap: 'wrap'
                    }}
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={fromValue}
                            onChange={setFromValue}
                            minDate={dayjs()}
                            label="From"
                        />
                    </LocalizationProvider>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={startIsHalfDay}
                                onChange={() => setStartIsHalfDay(!startIsHalfDay)}
                            />
                        }
                        label={startIsHalfDay ? 'Half Day' : 'Full Day'}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={toValue}
                            onChange={setToValue}
                            minDate={dayjs()}
                            label="To"
                        />
                    </LocalizationProvider>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={endIsHalfDay}
                                onChange={() => setEndIsHalfDay(!endIsHalfDay)}
                            />
                        }
                        label={endIsHalfDay ? 'Half Day' : 'Full Day'}
                    />
                    <FetchReason reason={reason} setReason={setReason} />
                    <TextField
                        id="outlined-multiline-static"
                        label="Add comments..."
                        multiline
                        rows={4}
                        onChange={handleChange}
                    />
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <Button
                        color="secondary"
                        variant="contained"
                        type="submit"
                        style={{ marginTop: '20px' }}
                        disabled={isFormIncomplete}
                    >
                        Submit
                    </Button>
                </div>
            </form>
            <SuccessDialog
                open={openSuccessDialog}
                handleClose={handleClose}
                message="Leave applied successfully"
            />
        </>
    )
}

export default LeaveForm
