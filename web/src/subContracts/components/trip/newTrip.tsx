import TextInput from '../../../form/TextInput.tsx'
import { Autocomplete, Button, InputAdornment, TextField } from '@mui/material'
import { useForm, SubmitHandler } from 'react-hook-form'
import NumberInput from '../../../form/NumberInput.tsx'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
// import { getAllTruck } from '../../services/truck.ts'
import { getAllTransporter } from '../../services/transporter.ts'
import { getTruckByTransporter } from '../../services/truck.ts'

const NewTrip: React.FC = () => {
    const { handleSubmit, control } = useForm<FormData>()
    const [listTruck, setListTruck] = useState([])
    const [transporter, setTransporter] = useState([])
    const [truckNumber, setTruckNumber] = React.useState<string | null>()
    const [transporterName, setTransporterName] = React.useState<string | null>()
    const [fromValue, setFromValue] = useState<dayjs.Dayjs | null>(null)
    const [toValue, setToValue] = useState<dayjs.Dayjs | null>(null)

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log({
            ...data,
            startDate: fromValue?.unix(),
            endDate: toValue?.unix(),
            truckId: truckNumber,
            transporter: transporterName
        })
    }
    useEffect(() => {
        getAllTransporter().then(setTransporter)
        // getAllTruck().then(setListTruck)
    }, [])

    useEffect(() => {
        getTruckByTransporter(transporterName).then(setListTruck)
    }, [transporterName])

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
                    <Autocomplete
                        options={transporter.map(({ name }) => name)}
                        sx={{ width: 300 }}
                        value={transporterName}
                        renderInput={(params) => <TextField {...params} label="Transporter" />}
                        onChange={(_event: any, newValue: string | null) => {
                            setTransporterName(newValue)
                        }}
                    />
                    <Autocomplete
                        options={listTruck.map(({ vehicleNumber }) => vehicleNumber)}
                        sx={{ width: 300 }}
                        value={truckNumber}
                        renderInput={(params) => <TextField {...params} label="Truck Number" />}
                        onChange={(_event: any, newValue: string | null) => {
                            setTruckNumber(newValue)
                        }}
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
                                    <b>Ton</b>
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
