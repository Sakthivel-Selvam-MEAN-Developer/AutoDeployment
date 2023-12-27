import { ChangeEvent, useEffect, useState } from 'react'
import AutoComplete from '../../../form/AutoComplete.tsx'
import InputWithDefaultValue from '../../../form/InputWithDefaultValue.tsx'
import { Control } from 'react-hook-form'
import { getAllBunk } from '../../services/bunk.ts'
import { getAllFuelStationByBunk } from '../../services/fuelStation.ts'
import { getByActiveTrip } from '../../services/trip.ts'
import NumberInput from '../../../form/NumberInput.tsx'
import { InputAdornment } from '@mui/material'

interface FormFieldsProps {
    control: Control
    fuelStationId: React.Dispatch<React.SetStateAction<number>>
    totalPrice: number
    tripId: React.Dispatch<React.SetStateAction<number>>
}
interface formtype {
    truck: { vehicleNumber: string }
}
const FuelFormFields: React.FC<FormFieldsProps> = ({
    control,
    fuelStationId,
    totalPrice,
    tripId
}) => {
    const [bunkList, setBunkList] = useState([])
    const [bunkId, setBunkId] = useState(0)
    const [stationList, setStationList] = useState([])
    const [activeTrip, setActiveTrip] = useState([])
    useEffect(() => {
        if (bunkId !== 0) {
            getAllFuelStationByBunk(bunkId).then(setStationList)
        }
    }, [bunkId])
    useEffect(() => {
        getAllBunk().then(setBunkList)
        getByActiveTrip().then(setActiveTrip)
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
                    const bId: any = bunkList.find(
                        (bunk: { bunkName: string }) => bunk.bunkName === newValue
                    )
                    console.log(bId)
                    setBunkId(bId.id)
                }}
            />
            <AutoComplete
                control={control}
                fieldName="fuelStationId"
                label="Fuel Station"
                options={stationList.map(({ location }) => location)}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    const bId: any = stationList.find(
                        (bunk: { location: string }) => bunk.location === newValue
                    )
                    fuelStationId(bId.id)
                }}
            />
            <AutoComplete
                control={control}
                fieldName="loadingPointToUnloadingPointTripId"
                label="Vehicle Number"
                options={activeTrip.map(({ truck: { vehicleNumber } }) => vehicleNumber)}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    const trip: any = activeTrip.find(
                        (trip: formtype) => trip.truck.vehicleNumber === newValue
                    )
                    tripId(trip.id)
                }}
            />

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
