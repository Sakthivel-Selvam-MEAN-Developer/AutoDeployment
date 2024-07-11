import { ChangeEvent, FC } from 'react'
import { VehicleListProps } from './types'
import AutoComplete from '../../../../form/AutoComplete'

export const GetVehicleListField: FC<VehicleListProps> = ({
    control,
    vehicleList,
    setTruckId,
    setCurrentTransporterName
}) => {
    return (
        <AutoComplete
            control={control}
            fieldName="vehicleNumber"
            label="Vehicle Number"
            options={vehicleList.map(({ vehicleNumber }) => vehicleNumber)}
            onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                const truck = vehicleList.filter((truck) => truck.vehicleNumber === newValue)
                setTruckId(truck[0].id)
                setCurrentTransporterName(truck[0].transporter.name)
            }}
        />
    )
}
