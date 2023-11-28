import SelectInput from '../../../form/SelectInput.tsx'
import TextInput from '../../../form/TextInput.tsx'
import { Button, InputAdornment } from '@mui/material'
import { useForm, SubmitHandler } from 'react-hook-form'
import NumberInput from '../../../form/NumberInput.tsx'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { getAllTruck } from '../../services/truck.ts'
import { getAllTransporter } from '../../services/transporter.ts'

const NewTrip: React.FC = () => {
    const { handleSubmit, control } = useForm<FormData>()
    const [truck, setTruck] = useState([])
    const [transporter, setTransporter] = useState([])
    const [fromValue, setFromValue] = useState<dayjs.Dayjs | null>(null)
    const [toValue, setToValue] = useState<dayjs.Dayjs | null>(null)

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log({ ...data, startDate: fromValue?.unix(), endDate: toValue?.unix() })
    }
    useEffect(() => {
        getAllTransporter().then(setTransporter)
        getAllTruck().then(setTruck)
    }, [])

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
                    <SelectInput
                        control={control}
                        listValues={transporter.map(({ name }) => name)}
                        label="Transporter"
                        fieldName="transporter"
                    />
                    <SelectInput
                        control={control}
                        listValues={truck.map(({ vehicleNumber }) => vehicleNumber)}
                        label="Truck Number"
                        fieldName="truckId"
                    />
                    <TextInput control={control} label="Start Point" fieldName="Start Point" />
                    <TextInput control={control} label="Delivery Point" fieldName="deliveryPoint" />
                    <TextInput control={control} label="Invoice Number" fieldName="invoiceNumber" />

                    <NumberInput
                        control={control}
                        label="Filled Load"
                        fieldName="filledLoad"
                        type="number"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <b>/ Ton</b>
                                </InputAdornment>
                            )
                        }}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker value={fromValue} onChange={setFromValue} label="Start Date" />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker value={toValue} onChange={setToValue} label="End Date" />
                    </LocalizationProvider>
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
                    >
                        Start Trip
                    </Button>
                </div>
            </form>
        </>
    )
}

export default NewTrip
