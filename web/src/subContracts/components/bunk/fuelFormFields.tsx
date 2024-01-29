import { ChangeEvent, useEffect, useState } from 'react'
import AutoComplete from '../../../form/AutoComplete.tsx'
import InputWithDefaultValue from '../../../form/InputWithDefaultValue.tsx'
import { Control } from 'react-hook-form'
import { getAllBunk } from '../../services/bunk.ts'
import { getAllFuelStationByBunk } from '../../services/fuelStation.ts'
import NumberInput from '../../../form/NumberInput.tsx'
import { InputAdornment } from '@mui/material'
import { getAllTruck } from '../../services/truck.ts'
import DateInput from '../../../form/DateInput.tsx'
import TextInput from '../../../form/TextInput.tsx'

interface FormFieldsProps {
    control: Control
    fuelStationId: React.Dispatch<React.SetStateAction<number>>
    totalPrice: number
}

const FuelFormFields: React.FC<FormFieldsProps> = ({ control, fuelStationId, totalPrice }) => {
    const [bunkList, setBunkList] = useState([])
    const [bunkId, setBunkId] = useState(0)
    const [stationList, setStationList] = useState([])
    const [vehicleList, setvehicleList] = useState([])
    useEffect(() => {
        if (bunkId !== 0) {
            getAllFuelStationByBunk(bunkId).then(setStationList)
        }
    }, [bunkId])
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
                    const bId = bunkList.find(
                        (bunk: { bunkName: string }) => bunk.bunkName === newValue
                    ) || { id: 0 }
                    setBunkId(bId.id)
                }}
            />
            <AutoComplete
                control={control}
                fieldName="fuelStationId"
                label="Fuel Station"
                options={stationList.map(({ location }) => location)}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    const bId = stationList.find(
                        (bunk: { location: string }) => bunk.location === newValue
                    ) || { id: 0 }
                    fuelStationId(bId.id)
                }}
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
            <NumberInput
                control={control}
                label="Fuel per Liter"
                fieldName="pricePerliter"
                type="number"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <b>Rs/liter</b>
                        </InputAdornment>
                    )
                }}
            />
            <NumberInput
                control={control}
                label="Fuel Quantity"
                fieldName="quantity"
                type="number"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <b>liter</b>
                        </InputAdornment>
                    )
                }}
            />
            <InputWithDefaultValue
                control={control}
                label="Total Price"
                fieldName="totalprice"
                type="number"
                defaultValue={totalPrice}
                value={totalPrice}
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
