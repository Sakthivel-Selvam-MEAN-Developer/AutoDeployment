import { useForm, SubmitHandler, FieldValues, UseFormSetValue } from 'react-hook-form'
import SubmitButton from '../../../form/button.tsx'
import { createTruck } from '../../services/truck.ts'
import SuccessDialog from '../../../commonUtils/SuccessDialog.tsx'
import { useState } from 'react'
import VehicleFormField from './vehicleFormField.tsx'
import { Box, CircularProgress } from '@mui/material'

const AddVehicle: React.FC = () => {
    const { handleSubmit, control, setValue } = useForm<FieldValues>()
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
    const [transporterId, setTransporterId] = useState<number>(0)
    const [loading, setLoading] = useState(false)
    const [disable, setDisable] = useState(false)
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        transporterId !== 0 && setLoading(true)
        setDisable(true)
        createTruck({
            vehicleNumber: data.vehicleNumber,
            transporterId: transporterId,
            capacity: parseFloat(data.capacity)
        })
            .then(() => {
                setLoading(false)
                setDisable(false)
            })

            .then(() => setOpenSuccessDialog(true))
            .then(() => clearForm(setValue))
            .catch((error) => {
                alert(`Error in ${error.response.data.meta.target[0]}`)
                setDisable(false)
            })
            .then(() => setLoading(false))
    }
    const handleClose = () => setOpenSuccessDialog(false)
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <VehicleFormField control={control} setTransporterId={setTransporterId} />
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <SubmitButton name="Create" type="submit" disabled={disable} />
                )}
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
