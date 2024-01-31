import React, { ReactElement, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import SubmitButton from '../../../form/button'
import FactoryFormFields from './factoryFormField'
import { createUnloadingPoint } from '../../services/unloadingPoint'
import { createLoadingPoint } from '../../services/loadingPoint'
import SuccessDialog from '../../../commonUtils/SuccessDialog'
import { createStockPoint } from '../../services/stockPoint'

const CreateFactory: React.FC = (): ReactElement => {
    const { handleSubmit, control, setValue } = useForm<FieldValues>()
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
    const [companyId, setCompanyId] = useState(0)
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (
            data.companyName !== undefined &&
            data.category !== undefined &&
            data.name !== '' &&
            data.location !== ''
        ) {
            const details = {
                name: data.name,
                cementCompanyId: companyId,
                location: data.location.toLowerCase()
            }
            if (data.category === 'Loading Point') createLoadingPoint(details)
            else if (data.category === 'Unloading Point') createUnloadingPoint(details)
            else if (data.category === 'Stock Point') createStockPoint(details)
            setOpenSuccessDialog(true)
        } else alert('All fields are Required')
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FactoryFormFields control={control} companyId={setCompanyId} setValue={setValue} />
                <SubmitButton name="Save" type="submit" />
            </form>
            <SuccessDialog
                open={openSuccessDialog}
                handleClose={() => setOpenSuccessDialog(false)}
                message="Factory creation is successful"
            />
        </>
    )
}

export default CreateFactory
