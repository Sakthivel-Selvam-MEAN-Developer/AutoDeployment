import { useForm, SubmitHandler, FieldValues, UseFormSetValue } from 'react-hook-form'
import SubmitButton from '../../../form/button.tsx'
import { createTruck } from '../../services/truck.ts'
import SuccessDialog from '../../../commonUtils/SuccessDialog.tsx'
import { useState } from 'react'
import VehicleFormField from './vehicleFormField.tsx'

const AddVehicle: React.FC = () => {
    const { handleSubmit, control, setValue } = useForm<FieldValues>()
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
    const [transporterId, setTransporterId] = useState<number>(0)
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        createTruck({
            vehicleNumber: data.vehicleNumber,
            transporterId: transporterId,
            capacity: parseFloat(data.capacity)
        })
            .then(() => setOpenSuccessDialog(true))
            .then(() => clearForm(setValue))
            .catch((error) => alert(`Error in ${error.response.data.meta.target[0]}`))
    }
    const handleClose = () => setOpenSuccessDialog(false)
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <VehicleFormField control={control} setTransporterId={setTransporterId} />
                <SubmitButton name="Create" type="submit" />
            </form>
            <SuccessDialog
                open={openSuccessDialog}
                handleClose={handleClose}
                message="Vehicle creation is successful"
            />
        </>
    )
}
export default AddVehicle

const clearForm = (setValue: UseFormSetValue<FieldValues>) => {
    setValue('transporterName', null)
    setValue('vehicleNumber', '')
    setValue('capacity', '')
}
