import { useForm, SubmitHandler } from 'react-hook-form'
import { updateCustomer } from '../../services/customer.js'
import FormFields from './formFields.tsx'
import SuccessDialog from '../SuccessDialog.tsx'
import { FC, useEffect, useState } from 'react'
import SubmitButton from '../../../form/button.tsx'

interface CustomerDetails {
    name: string
}
interface UpdateCustomerProps {
    customerDetails: any
}
const UpdateCustomer: FC<UpdateCustomerProps> = ({ customerDetails }) => {
    const [name, setName] = useState('')
    const { handleSubmit, control, getValues, reset } = useForm({
        defaultValues: customerDetails
    })
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
    useEffect(() => {
        setName(customerDetails.name)
        reset(customerDetails)
    }, [customerDetails, reset])

    const onSubmit: SubmitHandler<CustomerDetails> = (customer) => {
        updateCustomer(name, JSON.stringify(customer)).then(() => setOpenSuccessDialog(true))
    }
    const handleClose = () => setOpenSuccessDialog(false)

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormFields control={control} />
                <SubmitButton name="Update" type="submit" />
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
