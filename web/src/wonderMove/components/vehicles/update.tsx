import { useForm, SubmitHandler } from 'react-hook-form'
import { updateVehicle } from '../../services/vehicles.ts'
import FormFields from './formFields.tsx'
import { Button } from '@mui/material'
import SuccessDialog from '../SuccessDialog.tsx'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface VehicleDetails {
    number: string;
}

interface UpdateVehicleProps {
    vehicleDetails: any;
}
const UpdateVehicle: React.FC<UpdateVehicleProps> = ({ vehicleDetails }) => {
    const [number, setNumber] = useState()
    const navigate = useNavigate()
    const { handleSubmit, control, getValues, reset } = useForm({
        defaultValues: vehicleDetails,
    })
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
    
    useEffect(() => {
        setNumber(vehicleDetails.number)
        reset(vehicleDetails)
    }, [vehicleDetails])

    const onSubmit: SubmitHandler<VehicleDetails> = (vehicle) => {
        // @ts-ignore
        updateVehicle(number, JSON.stringify(vehicle)).then(() =>
            setOpenSuccessDialog(true)
        )
    }
    const handleClose = () => {
        setOpenSuccessDialog(false)
        navigate(-1)
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormFields control={control} listValues={undefined}/>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Button
                        color="secondary"
                        variant="contained"
                        type="submit"
                        style={{ marginTop: '20px' }}
                    >
                        Update
                    </Button>
                </div>
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
