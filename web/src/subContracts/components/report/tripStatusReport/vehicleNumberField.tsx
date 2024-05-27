import { Dispatch, FC, useState, useEffect, ChangeEvent } from 'react'
import { Control } from 'react-hook-form'
import AutoComplete from '../../../../form/AutoComplete'
import { getAllTruck } from '../../../services/truck'
import { dispatchType } from './tripStatusReportTypes'

interface VehicleNumberProps {
    control: Control
    dispatch: Dispatch<dispatchType>
}
interface Truck {
    vehicleNumber: string
}
export const VehicleNumberField: FC<VehicleNumberProps> = ({ control, dispatch }) => {
    const [vehicleNumberList, setVehicleNumberList] = useState<string[]>([])
    useEffect(() => {
        getAllTruck().then((trucks: Truck[]) => {
            setVehicleNumberList(trucks.map((truck) => truck.vehicleNumber))
        })
    }, [])
    return (
        <AutoComplete
            control={control}
            fieldName="vehicleNumber"
            label="Select Vehicle Number"
            options={vehicleNumberList}
            onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                dispatch({ vehicleNumber: newValue, type: 'updateVehicleNumber' })
                dispatch({ pageNumber: 1, type: 'updatePageNumber' })
            }}
        />
    )
}
