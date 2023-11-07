import React from "react";
import { Button } from "@mui/material";
import { useForm, SubmitHandler } from 'react-hook-form'
import dayjs from 'dayjs';
import { useState } from "react";
import TextInput from "../../../form/TextInput";
import SelectInput from "../../../form/SelectInput";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import FetchReason from "./fetchReason";


const EmployeeFormList: React.FC = () => {
  const { handleSubmit, control } = useForm<FormData>()
  const [startValue, setStartValue] = useState<dayjs.Dayjs | null>(null)
  const [endValue, setEndValue] = useState<dayjs.Dayjs | null>(null)
  const [reason, setReason] = useState('')

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('data', data);
    console.log(dayjs(startValue));
    console.log(reason);
    
  }
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
              value={startValue}
              onChange={setStartValue}
              minDate={dayjs()}
              label="Start Date" />

          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={endValue}
              onChange={setEndValue}
              minDate={dayjs()}
              label="End Date" />

          </LocalizationProvider>
          <SelectInput
            control={control}
            listValues={['Half Day', 'Full Day']}
            fieldName="make"
            label="Make"
          />
          <div>
            {
              <FetchReason
                reason={reason}
                setReason={setReason}
              />
            }
          </div>
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
          >
            Save
          </Button>
        </div>
      </form>
    </>
  );
};

export default EmployeeFormList;