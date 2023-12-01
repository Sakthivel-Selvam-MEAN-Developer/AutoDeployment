import { useForm, SubmitHandler } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { getAllTransporter } from '../../services/transporter.ts'
import FormField from './formFields.tsx'
import SubmitButton from '../../../form/button.tsx'
import { getAllCementCompany } from '../../services/cementCompany.ts'
import { createTrip } from '../../services/trip.ts'
import { useNavigate } from 'react-router-dom'

const NewTrip: React.FC = () => {
    const navigate = useNavigate()
    const { handleSubmit, control } = useForm<FormData>()
    const [transporter, setTransporter] = useState([])
    const [cementCompany, setCementCompany] = useState([])
    const [truckId, setTruckId] = useState()
    const [factoryId, setFactoryId] = useState()
    const [deliveryPointId, setDeliveryPointId] = useState()
    const onSubmit: SubmitHandler<FormData> = (data: any) => {
        const details = {
            truckId: truckId,
            factoryId: factoryId,
            deliveryPointId: deliveryPointId,
            startDate: data.startDate.unix(),
            endDate: data.endDate.unix(),
            filledLoad: parseInt(data.filledLoad),
            invoiceNumber: data.invoiceNumber
        }
        createTrip(JSON.stringify(details)).then(() => navigate('/sub/trip'))
    }
    useEffect(() => {
        getAllTransporter().then((transporterData) =>
            setTransporter(transporterData.map(({ name }: any) => name))
        )
        getAllCementCompany().then((companyData) =>
            setCementCompany(companyData.map(({ name }: any) => name))
        )
    }, [])
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormField
                control={control}
                transporter={transporter}
                cementCompany={cementCompany}
                truckId={setTruckId}
                factoryId={setFactoryId}
                deliveryPointId={setDeliveryPointId}
            />
            <SubmitButton name="Start" type="submit" />
        </form>
    )
}
export default NewTrip
