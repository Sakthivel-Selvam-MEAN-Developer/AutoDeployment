import React, { ReactElement, useState } from 'react'
import { FieldValues, SubmitHandler, UseFormSetValue, useForm } from 'react-hook-form'
import SubmitButton from '../../../form/button'
import FactoryFormFields from './factoryFormField'
import { createUnloadingPoint } from '../../services/unloadingPoint'
import { createLoadingPoint } from '../../services/loadingPoint'
import { createStockPoint } from '../../services/stockPoint'
import { Box, CircularProgress } from '@mui/material'
import useAuthorization from '../../../authorization'
const clearForm = (
    reset: (values: Record<string, string>) => void,
    setValue: UseFormSetValue<FieldValues>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
    reset({ name: '', location: '' })
    setValue('companyName', null)
    setValue('category', null)
    setLoading(false)
}
const CreateFactory: React.FC = (): ReactElement => {
    const { handleSubmit, control, setValue, reset } = useForm<FieldValues>()
    const [loading, setLoading] = useState(false)
    const [companyId, setCompanyId] = useState(0)
    const token = useAuthorization()
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (
            data.companyName !== undefined &&
            data.category !== undefined &&
            data.name !== '' &&
            data.location !== ''
        ) {
            setLoading(true)
            const details = {
                name: data.name,
                cementCompanyId: companyId,
                location: data.location.toLowerCase()
            }
            if (data.category === 'Loading Point')
                createLoadingPoint(details, token)
                    .then(() => clearForm(reset, setValue, setLoading))
                    .catch((e) => {
                        alert(`${e.message}`)
                        setLoading(false)
                    })
            else if (data.category === 'Unloading Point')
                createUnloadingPoint(details, token)
                    .then(() => clearForm(reset, setValue, setLoading))
                    .catch((e) => {
                        alert(`${e.message}`)
                        setLoading(false)
                    })
            else if (data.category === 'Stock Point')
                createStockPoint(details, token)
                    .then(() => clearForm(reset, setValue, setLoading))
                    .catch((e) => {
                        alert(`${e.message}`)
                        setLoading(false)
                    })
        } else {
            alert('All Fields are Required...')
            setLoading(false)
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FactoryFormFields control={control} companyId={setCompanyId} setValue={setValue} />
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <CircularProgress
                        sx={{ textAlign: 'center', marginTop: '20px', width: '100%' }}
                    />
                </Box>
            ) : (
                <SubmitButton name="Save" type="submit" />
            )}
        </form>
    )
}
export default CreateFactory
