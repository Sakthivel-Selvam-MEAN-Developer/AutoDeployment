import { ChangeEvent, useEffect, useState } from 'react'
import AutoComplete from '../../../form/AutoComplete.tsx'
import InputWithDefaultValue from '../../../form/InputWithDefaultValue.tsx'
import { Control } from 'react-hook-form'
import { getAllBunk } from '../../services/bunk.ts'
import { InputAdornment, TextField } from '@mui/material'
import { getAllTruck } from '../../services/truck.ts'
import DateInput from '../../../form/DateInput.tsx'
import TextInput from '../../../form/TextInput.tsx'
import NumberInputWithProps from '../../../form/NumberInputwithProps.tsx'

interface FormFieldsProps {
    control: Control
    setBunkId: React.Dispatch<React.SetStateAction<number>>
    totalPrice: number
}

const FuelFormFields: React.FC<FormFieldsProps> = ({ control, setBunkId, totalPrice }) => {
    const [bunkList, setBunkList] = useState([])
    const [bunkLocation, setBunkLocation] = useState<string>('')
    const [vehicleList, setvehicleList] = useState([])

    useEffect(() => {
        getAllBunk().then(setBunkList)
        getAllTruck().then(setvehicleList)
    }, [])

    return (
        <div
            style={{
                display: 'flex',
                gap: '10px',
                rowGap: '10px',
                flexWrap: 'wrap'
            }}
        >
            <AutoComplete
                control={control}
                fieldName="bunkId"
                label="Select Bunk"
                options={bunkList.map(({ bunkName }) => bunkName)}
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
            <DateInput
                control={control}
                format="DD/MM/YYYY"
                fieldName="fuelDate"
                label="Fueled Date"
            />
            <AutoComplete
                control={control}
                fieldName="vehicleNumber"
                label="Vehicle Number"
                options={vehicleList.map(({ vehicleNumber }) => vehicleNumber)}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    console.log(newValue)
                }}
            />
            <TextInput control={control} label="Invoice Number" fieldName="invoiceNumber" />
            <NumberInputWithProps
                control={control}
                label="Fuel per Liter"
                fieldName="pricePerliter"
                type="number"
                inputProps={{ step: 'any', min: '0' }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <b>Rs/liter</b>
                        </InputAdornment>
                    )
                }}
            />
            <NumberInputWithProps
                control={control}
                label="Fuel Quantity"
                fieldName="quantity"
                type="number"
                inputProps={{ step: 'any', min: '0' }}
                InputProps={{}}
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
                InputLabelProps={{
                    shrink: true
                }}
            />
        </div>
    )
}
export default FuelFormFields
