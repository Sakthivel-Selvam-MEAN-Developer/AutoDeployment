import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import FormFields from './formField'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import SubmitButton from '../../../form/button'
import { Button } from '@mui/material'
import { createCompany } from '../../services/cementCompany'

const CreateCompany: React.FC = (): ReactElement => {
    const { handleSubmit, control, reset } = useForm<FieldValues>()
    const onSubmit: SubmitHandler<FieldValues> = (data: any) => {
        createCompany(JSON.stringify(data))
        reset()
    }
    return (
        <>
            <div
                style={{
                    marginBottom: '30px',
                    display: 'flex',
                    justifyContent: 'right'
                }}
            >
                <Link to={'/sub/company/factory'}>
                    <Button color="primary" variant="contained" data-testid={'new-trip-button'}>
                        Create Factory
                    </Button>
                </Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormFields control={control} />
                <SubmitButton name="Create" type="submit" />
            </form>
        </>
    )
}

export default CreateCompany
