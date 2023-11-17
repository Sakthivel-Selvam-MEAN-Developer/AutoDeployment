import { useForm, SubmitHandler } from 'react-hook-form'
import { updateCustomer } from '../../services/customer.js'
import FormFields from './formFields.tsx'
import { Button } from '@mui/material'
import SuccessDialog from '../SuccessDialog.tsx'
import { useEffect, useState } from 'react'

interface CustomerDetails {
    name: string
}

interface UpdateCustomerProps {
    customerDetails: any
}
const UpdateCustomer: React.FC<UpdateCustomerProps> = ({ customerDetails }) => {
    const [name, setName] = useState()
    const { handleSubmit, control, getValues, reset } = useForm({
        defaultValues: customerDetails
    })
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
    useEffect(() => {
        setName(customerDetails.name)
        reset(customerDetails)
    }, [customerDetails])

    const onSubmit: SubmitHandler<CustomerDetails> = (customer) => {
        // @ts-ignore
        updateCustomer(name, JSON.stringify(customer)).then(() => setOpenSuccessDialog(true))
    }
    const handleClose = () => {
        setOpenSuccessDialog(false)
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormFields control={control} listValues={undefined} />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center'
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
                message={`${getValues().name} is updated successfully`}
            />
        </>
    )
}

export default UpdateCustomer
