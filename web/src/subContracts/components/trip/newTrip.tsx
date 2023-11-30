import { useForm, SubmitHandler } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { getAllTransporter } from '../../services/transporter.ts'
import FormField from './formFields.tsx'
import SubmitButton from '../button.tsx'

const NewTrip: React.FC = () => {
    const { handleSubmit, control } = useForm<FormData>()
    const [transporter, setTransporter] = useState([])

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data)
    }
    useEffect(() => {
        getAllTransporter().then((transporterData) => {
            setTransporter(transporterData.map(({ name }: any) => name))
        })
    }, [])

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormField control={control} transporter={transporter} />
                <SubmitButton name="Submit" type="submit" />
            </form>
        </>
    )
}

export default NewTrip
