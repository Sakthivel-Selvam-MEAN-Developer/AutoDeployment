import { ChangeEvent, useEffect, useState } from 'react'
import AutoComplete from '../../../form/AutoComplete.tsx'
import InputWithDefaultValue from '../../../form/InputWithDefaultValue.tsx'
import { Control, Controller } from 'react-hook-form'
import { getAllBunk } from '../../services/bunk.ts'
import { InputAdornment, TextField } from '@mui/material'
import { getAllTruck, getNumberByTruckId } from '../../services/truck.ts'
import DateInput from '../../../form/DateInput.tsx'
import TextInput from '../../../form/TextInput.tsx'
import { SetStateAction } from 'jotai'

interface FormFieldsProps {
    control: Control
    setBunkId: React.Dispatch<React.SetStateAction<number>>
    totalPrice: number
    pricePerliter: number
    quantity: number
    dieselkilometer: number
    fuelType: string
    setPricePerliter: React.Dispatch<SetStateAction<number>>
    setQuantity: React.Dispatch<SetStateAction<number>>
    setDieselkilometer: React.Dispatch<SetStateAction<number>>
    setTransporterType: React.Dispatch<SetStateAction<transporterType>>
    transporterType: transporterType
    setFuelType: React.Dispatch<SetStateAction<string>>
}
interface vehicleProps {
    id: number
    vehicleNumber: string
    capacity: number
    transporterId: number
}
export interface transporterType {
    vehicleNumber: string
    transporter: {
        name: string
        transporterType: string
    }
}
const FuelFormFields: React.FC<FormFieldsProps> = ({
    control,
    setBunkId,
    totalPrice,
    pricePerliter,
    dieselkilometer,
    quantity,
    setPricePerliter,
    setQuantity,
    setDieselkilometer,
    setTransporterType,
    transporterType,
    setFuelType
}) => {
    const [bunkList, setBunkList] = useState([])
    const [bunkLocation, setBunkLocation] = useState<string>('')
    const [vehicleList, setvehicleList] = useState<vehicleProps[]>([])
    const [truckId, setTruckId] = useState<number>(0)
    useEffect(() => {
        getAllBunk().then(setBunkList)
        getAllTruck().then(setvehicleList)
    }, [])
    useEffect(() => {
        getNumberByTruckId(truckId).then(setTransporterType)
    }, [truckId])

    return (
        <div
            style={{
                display: 'flex',
                gap: '10px',
                rowGap: '10px',
                flexWrap: 'wrap'
            }}
        >
            <DateInput
                control={control}
                format="DD/MM/YYYY"
                fieldName="fuelDate"
                label="Fueled Date"
            />
            <AutoComplete
                control={control}
                fieldName="bunkId"
                label="Select Bunk"
                options={bunkList ? bunkList.map(({ bunkName }) => bunkName) : []}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    const { id, location } = bunkList.find(
                        (bunk: { bunkName: string }) => bunk.bunkName === newValue
                    ) || { id: 0, location: '' }
                    setBunkId(id)
                    setBunkLocation(location)
                }}
            />
            <TextField
                value={bunkLocation}
                type="text"
                label="Location"
                variant="outlined"
                aria-readonly
            />
            <AutoComplete
                control={control}
                fieldName="vehicleNumber"
                label="Vehicle Number"
                options={vehicleList ? vehicleList.map(({ vehicleNumber }) => vehicleNumber) : []}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    const data = vehicleList.filter((vehicle) => newValue === vehicle.vehicleNumber)
                    setTruckId(data[0].id)
                }}
            />
            <Controller
                render={() => (
                    <TextField
                        value={quantity}
                        sx={{ width: '200px' }}
                        label="Fuel Quantity"
                        inputProps={{ step: 0.01, min: 0, max: 500 }}
                        type="number"
                        onChange={(e) => {
                            if (parseFloat(e.target.value) <= 500 && parseFloat(e.target.value) > 0)
                                setQuantity(parseFloat(parseFloat(e.target.value).toFixed(2)))
                            else if (e.target.value === '') setQuantity(0)
                        }}
                    />
                )}
                name="quantity"
                control={control}
            />
            <Controller
                render={() => (
                    <TextField
                        value={pricePerliter}
                        sx={{ width: '200px' }}
                        label="Fuel per Liter"
                        inputProps={{ step: 0.01, min: 0, max: 110 }}
                        type="number"
                        onChange={(e) => {
                            if (parseFloat(e.target.value) <= 110 && parseFloat(e.target.value) > 0)
                                setPricePerliter(parseFloat(parseFloat(e.target.value).toFixed(2)))
                            else if (e.target.value === '') setPricePerliter(0)
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <b>Rs/liter</b>
                                </InputAdornment>
                            )
                        }}
                    />
                )}
                name="pricePerliter"
                control={control}
            />
            <InputWithDefaultValue
                control={control}
                label="Total Price"
                fieldName="totalprice"
                type="number"
                defaultValue={totalPrice}
                value={totalPrice.toFixed(2)}
                InputProps={{
                    readOnly: true,
                    endAdornment: (
                        <InputAdornment position="end">
                            <b>Rs</b>
                        </InputAdornment>
                    )
                }}
                InputLabelProps={{ shrink: true }}
            />
            <TextInput control={control} label="Diesel Bill Number" fieldName="invoiceNumber" />

            {transporterType !== undefined &&
                transporterType?.transporter.transporterType === 'Own' && (
                    <TextField
                        label="Diesel Kilometer"
                        name="kilometer"
                        type="number"
                        sx={{ width: '200px' }}
                        inputProps={{
                            pattern: '[0-9]{6}',
                            title: 'Please enter exactly 6 digits.',
                            min: 0,
                            max: 999999
                        }}
                        value={dieselkilometer}
                        onChange={(e) => setDieselkilometer(parseInt(e.target.value))}
                    />
                )}

            {transporterType?.transporter.transporterType === 'Own' && (
                <AutoComplete
                    control={control}
                    fieldName="Dieseltype"
                    label="Diesel Type"
                    options={['Partial fill', 'Full tank']}
                    onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string | null) => {
                        if (newValue) {
                            setFuelType(newValue)
                        }
                    }}
                />
            )}
        </div>
    )
}
export default FuelFormFields
