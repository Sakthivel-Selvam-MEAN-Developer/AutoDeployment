import { useForm, SubmitHandler } from 'react-hook-form'
import { updateVehicle } from '../../services/vehicles.ts'
import FormFields from './formFields.tsx'
import SuccessDialog from '../../../commonUtils/SuccessDialog.tsx'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SubmitButton from '../../../form/button.tsx'

interface VehicleDetails {
    number: string
}
interface UpdateVehicleProps {
    vehicleDetails: any
}

const UpdateVehicle: React.FC<UpdateVehicleProps> = ({ vehicleDetails }) => {
    const [number, setNumber] = useState<string>('')
    const navigate = useNavigate()
    const { handleSubmit, control, getValues, reset } = useForm({ defaultValues: vehicleDetails })
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
    useEffect(() => {
        setNumber(vehicleDetails.number)
        reset(vehicleDetails)
    }, [vehicleDetails, reset])
    const onSubmit: SubmitHandler<VehicleDetails> = (vehicle) =>
        updateVehicle(number, JSON.stringify(vehicle)).then(() => setOpenSuccessDialog(true))
    const handleClose = () => {
        setOpenSuccessDialog(false)
        navigate(-1)
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormFields control={control} listValues={[]} />
                <SubmitButton name="Submit" type="submit" />
            </form>
            <SuccessDialog
                open={openSuccessDialog}
                handleClose={handleClose}
                message={`${getValues().number} is updated successfully`}
            />
        </>
    )
}
export default UpdateVehicle
