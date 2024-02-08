import React, { ReactElement, useState } from 'react'
import { FieldValues, SubmitHandler, UseFormSetValue, useForm } from 'react-hook-form'
import SubmitButton from '../../../form/button'
import FactoryFormFields from './factoryFormField'
import { createUnloadingPoint } from '../../services/unloadingPoint'
import { createLoadingPoint } from '../../services/loadingPoint'
import { createStockPoint } from '../../services/stockPoint'

const CreateFactory: React.FC = (): ReactElement => {
    const { handleSubmit, control, setValue, reset } = useForm<FieldValues>()
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
            if (data.category === 'Loading Point')
                createLoadingPoint(details).then(() => clearForm(reset, setValue))
            else if (data.category === 'Unloading Point')
                createUnloadingPoint(details).then(() => clearForm(reset, setValue))
            else if (data.category === 'Stock Point')
                createStockPoint(details).then(() => clearForm(reset, setValue))
        } else alert('All fields are Required')
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FactoryFormFields control={control} companyId={setCompanyId} setValue={setValue} />
            <SubmitButton name="Save" type="submit" />
        </form>
    )
}

export default CreateFactory

const clearForm = (
    reset: (values: Record<string, string>) => void,
    setValue: UseFormSetValue<FieldValues>
) => {
    reset({ name: '', location: '' })
    setValue('companyName', null)
    setValue('category', null)
}
