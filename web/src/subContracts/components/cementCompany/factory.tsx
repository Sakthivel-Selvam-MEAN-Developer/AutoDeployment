import React, { ReactElement, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import SubmitButton from '../../../form/button'
import FactoryFormFields from './factoryFormField'
import { createDeliveryPoint } from '../../services/deliveryPoint'
import { createFactoryPoint } from '../../services/factory'

const CreateFactory: React.FC = (): ReactElement => {
    const { handleSubmit, control } = useForm<FieldValues>()
    const [companyId, setCompanyId] = useState(0)
    const onSubmit: SubmitHandler<FieldValues> = (data: any) => {
        if (data.loadingPoint !== undefined || '') {
            createFactoryPoint({ name: data.loadingPoint, cementCompanyId: companyId })
        }
        if (data.unloadingPoint !== undefined || '') {
            createDeliveryPoint({ name: data.unloadingPoint, cementCompanyId: companyId })
        }
        window.location.reload()
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FactoryFormFields control={control} companyId={setCompanyId} />
                <SubmitButton name="Save" type="submit" />
            </form>
        </>
    )
}

export default CreateFactory
