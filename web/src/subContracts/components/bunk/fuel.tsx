import React, { ReactElement, useEffect } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import SubmitButton from '../../../form/button'
// import { useNavigate } from 'react-router-dom'
import FuelFormFields from './fuelFormFields'

const Fuel: React.FC = (): ReactElement => {
    // const navigate = useNavigate()
    const { handleSubmit, control } = useForm<FieldValues>()
    useEffect(() => {}, [])

    const onSubmit = () => {}
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FuelFormFields control={control} />
            <SubmitButton name="Add Fuel" type="submit" />
        </form>
    )
}
export default Fuel
