import { ChangeEvent, FC, useEffect, useState } from 'react'
import AutoComplete from '../../../../../form/AutoComplete.tsx'
import { getAllTruck } from '../../../../services/truck.ts'
import { fuelReoprtActionProps } from '../fuelContext/fuelReportTypes.ts'

export const VehicleNameField: FC<fuelReoprtActionProps> = ({ control, dispatch }) => {
    const [truckList, setTruckList] = useState([])
    useEffect(() => {
        getAllTruck().then(setTruckList)
    }, [])
    return (
        <AutoComplete
            control={control}
            fieldName="vehicleNumber"
            label="Select vehicle Number"
            options={truckList ? truckList.map(({ vehicleNumber }) => vehicleNumber) : []}
            onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                const { id } = truckList.find(
                    ({ vehicleNumber }) => vehicleNumber === newValue
                ) || { id: 0 }
                dispatch({ vehicleNumberId: id, type: 'updatevehicleNumberId' })
                dispatch({ pageNumber: 1, type: 'updatePageNumber' })
            }}
        />
    )
}
