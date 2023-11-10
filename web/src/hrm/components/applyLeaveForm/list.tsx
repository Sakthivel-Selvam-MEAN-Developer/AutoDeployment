import React from "react"
import { Button, FormControlLabel, Switch } from "@mui/material"
import { useForm, SubmitHandler } from 'react-hook-form'
import dayjs from 'dayjs'
import { useState } from "react"
import TextInput from "../../../form/TextInput"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import FetchReason from "./fetchReason"
import { create } from "../../services/employeeLeave"

interface FormData {
  appliedBy: string
}


const EmployeeFormList: React.FC = () => {
  const { control, handleSubmit, reset } = useForm<FormData>()
  const [fromValue, setFromValue] = useState<dayjs.Dayjs | null>(null)
  const [toValue, setToValue] = useState<dayjs.Dayjs | null>(null)
  const [startIsHalfDay, setStartIsHalfDay] = useState(false)
  const [endIsHalfDay, setEndIsHalfDay] = useState(false)
  const [reason, setReason] = useState('')

  const onSubmit: SubmitHandler<FormData> = (data) => {
    create(JSON.stringify({
      ...data,
      isFromHalfDay: startIsHalfDay,
      isToHalfDay: endIsHalfDay,
      leaveReasonId: reason,
      from: fromValue?.unix(),
      to: toValue?.unix(),
      appliedOn: dayjs().unix()
    })).catch(err => alert(err));
    
    setFromValue(null)
    setToValue(null)
    setStartIsHalfDay(false)
    setEndIsHalfDay(false)
    setReason('')

  reset({ appliedBy: '' })
  }
  const isFormIncomplete = !fromValue || !toValue || !reason

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          style={{
            display: 'flex',
            gap: '10px',
            rowGap: '10px',
            flexWrap: 'wrap',
          }}
        >
          <TextInput
            control={control}
            label="Name"
            fieldName="appliedBy"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={fromValue}
              onChange={setFromValue}
              minDate={dayjs()}
              label="Start Date" />
          </LocalizationProvider>
          <FormControlLabel
            control={
              <Switch
                checked={startIsHalfDay}
                onChange={() => setStartIsHalfDay(!startIsHalfDay)}
              />
            }
            label={startIsHalfDay ? "Half Day" : "Full Day"}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={toValue}
              onChange={setToValue}
              minDate={dayjs()}
              label="End Date" />
          </LocalizationProvider>
          <FormControlLabel
            control={
              <Switch
                checked={endIsHalfDay}
                onChange={() => setEndIsHalfDay(!endIsHalfDay)}
              />
            }
            label={endIsHalfDay ? "Half Day" : "Full Day"}
          />
          <FetchReason
            reason={reason}
            setReason={setReason}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
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
    </>
  );
};

export default EmployeeFormList