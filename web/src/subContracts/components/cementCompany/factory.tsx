import React, { ReactElement, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import SubmitButton from '../../../form/button'
import FactoryFormFields from './factoryFormField'
import { createUnloadingPoint } from '../../services/unloadingPoint'
import { createLoadingPoint } from '../../services/loadingPoint'
import SuccessDialog from '../../../commonUtils/SuccessDialog'
import { useNavigate } from 'react-router-dom'
import { createStockPoint } from '../../services/stockPoint'

const CreateFactory: React.FC = (): ReactElement => {
    const navigate = useNavigate()
    const { handleSubmit, control } = useForm<FieldValues>()
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
    const [companyId, setCompanyId] = useState(0)
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (data.loadingPoint) {
            createLoadingPoint({
                name: data.loadingPoint.toLowerCase(),
                cementCompanyId: companyId
            })
        }
        if (data.unloadingPoint) {
            createUnloadingPoint({
                name: data.unloadingPoint.toLowerCase(),
                cementCompanyId: companyId
            })
        }
        if (data.stockPoint) {
            createStockPoint({
                name: data.stockPoint.toLowerCase(),
                cementCompanyId: companyId
            })
        }
        setOpenSuccessDialog(true)
    }
    const handleClose = () => {
        setOpenSuccessDialog(false)
        navigate('/sub/trip')
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FactoryFormFields control={control} companyId={setCompanyId} />
                <SubmitButton name="Save" type="submit" />
            </form>
            <SuccessDialog
                open={openSuccessDialog}
                handleClose={handleClose}
                message="Factory creation is successful"
            />
        </>
    )
}

export default CreateFactory
