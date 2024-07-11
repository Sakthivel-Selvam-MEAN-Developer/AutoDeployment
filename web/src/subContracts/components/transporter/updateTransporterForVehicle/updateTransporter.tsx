import React, { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { getAllTruck } from '../../../services/truck'
import { getAllTransporter } from '../../../services/transporter'
import SubmitButton from '../../../../form/button'
import { transporterType, vehicleListType } from './types'
import { GetVehicleListField } from './GetVehicleListField'
import { GetTransporterTextFild } from './GetTransporterTextFild'
import { GetNewTransporterField } from './GetNewTransporterField'

export const UpdateTransporter: React.FC = () => {
    const [vehicleList, setVehicleList] = useState<vehicleListType[]>([])
    const [transporterList, setTransporterList] = useState<transporterType[]>([])
    const [currentTransporterName, setCurrentTransporterName] = useState('')
    const [truckId, setTruckId] = useState<number>(0)
    const [newTranporterId, setNewTranporterId] = useState(0)
    const { handleSubmit, control } = useForm<FieldValues>()
    useEffect(() => {
        getAllTruck().then(setVehicleList)
        getAllTransporter().then(setTransporterList)
    }, [])
    const onSubmit: SubmitHandler<FieldValues> = async () => {
        console.log(truckId, newTranporterId)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '60px' }}>
            <div style={{ display: 'flex', gap: '10px', rowGap: '10px', flexWrap: 'wrap' }}>
                <GetVehicleListField
                    control={control}
                    vehicleList={vehicleList}
                    setTruckId={setTruckId}
                    setCurrentTransporterName={setCurrentTransporterName}
                />
                <GetTransporterTextFild currentTransporterName={currentTransporterName} />
                <GetNewTransporterField
                    control={control}
                    transporterList={transporterList}
                    setNewTranporterId={setNewTranporterId}
                />
            </div>
            <SubmitButton name="Start" type="submit" disabled={false} />
        </form>
    )
}
export default UpdateTransporter
