import React, { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { getAllTruck, updateTransporterId } from '../../../services/truck'
import { getAllTransporter } from '../../../services/transporter'
import SubmitButton from '../../../../form/button'
import { transporterType, vehicleListType } from './types'
import { GetVehicleListField } from './GetVehicleListField'
import { GetTransporterTextFild } from './GetTransporterTextFild'
import { GetNewTransporterField } from './GetNewTransporterField'
import SuccessDialog from '../../../../commonUtils/SuccessDialog'

export const UpdateTransporter: React.FC = () => {
    const [vehicleList, setVehicleList] = useState<vehicleListType[]>([])
    const [transporterList, setTransporterList] = useState<transporterType[]>([])
    const [currentTransporterName, setCurrentTransporterName] = useState('')
    const [truckId, setTruckId] = useState<number>(0)
    const [newTranporterId, setNewTranporterId] = useState(0)
    const { handleSubmit, control, reset } = useForm<FieldValues>()
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
    useEffect(() => {
        getAllTruck().then(setVehicleList)
        getAllTransporter().then(setTransporterList)
    }, [])
    const onSubmit: SubmitHandler<FieldValues> = () =>
        updateTransporterId(truckId, newTranporterId).then(() => {
            setCurrentTransporterName('')
            reset({})
            setOpenSuccessDialog(true)
        })
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
            <SubmitButton name="Update" type="submit" disabled={false} />
            <SuccessDialog
                open={openSuccessDialog}
                handleClose={() => setOpenSuccessDialog(false)}
                message="Truck Transfered Successfully"
            />
        </form>
    )
}
export default UpdateTransporter
