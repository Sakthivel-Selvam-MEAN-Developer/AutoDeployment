import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { getAllTransporter } from '../../services/transporter.ts'
import FormField from './formFields.tsx'
import SubmitButton from '../../../form/button.tsx'
import { getAllCementCompany } from '../../services/cementCompany.ts'
import { createTrip } from '../../services/trip.ts'
import { useNavigate } from 'react-router-dom'
import { getPricePoint } from '../../services/pricePoint.ts'
import dayjs from 'dayjs'
import { createPaymentDues } from '../../services/paymentDues.ts'

interface transporter {
    name: string
    transporterAmount: number
    freightAmount: number
}
const NewTrip: React.FC = () => {
    const navigate = useNavigate()
    const { handleSubmit, control, watch } = useForm<FieldValues>()
    const [transporter, setTransporter] = useState([])
    const [cementCompany, setCementCompany] = useState([])
    const [truckId, setTruckId] = useState(0)
    const [loadingPointId, setLoadingPointId] = useState(0)
    const [unloadingPointId, setUnloadingPointId] = useState(0)
    const [freightAmount, setFreightAmount] = useState(0)
    const [transporterAmount, setTransporterAmount] = useState(0)
    const [totalTransporterAmount, setTotalTransporterAmount] = useState(0)
    const [totalFreightAmount, setTotalFreightAmount] = useState(0)
    const [margin, setMargin] = useState(0)
    const [fuel, setFuel] = useState(false)
    const filledLoad = watch('filledLoad')
    useEffect(() => {
        setTotalFreightAmount(freightAmount * parseInt(filledLoad))
        setTotalTransporterAmount(transporterAmount * parseInt(filledLoad))
        setMargin(totalFreightAmount - totalTransporterAmount)
    }, [filledLoad, freightAmount, transporterAmount, totalFreightAmount, totalTransporterAmount])

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const details = {
            truckId: truckId,
            loadingPointId: loadingPointId,
            unloadingPointId: unloadingPointId,
            startDate: dayjs().unix(),
            filledLoad: parseInt(data.filledLoad),
            invoiceNumber: data.invoiceNumber,
            freightAmount: freightAmount,
            transporterAmount: transporterAmount,
            totalFreightAmount: totalFreightAmount,
            totalTransporterAmount: totalTransporterAmount,
            margin: margin,
            wantFuel: fuel
        }
        const paymentDues = {
            name: data.transporterName,
            type: 'initial pay',
            payableAmount: (totalTransporterAmount * 70) / 100
        }
        createTrip(JSON.stringify(details))
            .then((tripData) => createPaymentDues({ ...paymentDues, tripId: tripData.id }))
            .then(() => navigate('/sub/trip'))
    }
    useEffect(() => {
        getAllTransporter().then((transporterData) =>
            setTransporter(transporterData.map(({ name }: transporter) => name))
        )
        getAllCementCompany().then((companyData) =>
            setCementCompany(companyData.map(({ name }: transporter) => name))
        )
    }, [])
    useEffect(() => {
        if (loadingPointId !== undefined && unloadingPointId !== undefined) {
            getPricePoint(loadingPointId, unloadingPointId).then((data) => {
                setFreightAmount(data.freightAmount)
                setTransporterAmount(data.transporterAmount)
            })
        }
    }, [loadingPointId, unloadingPointId])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormField
                control={control}
                transporter={transporter}
                cementCompany={cementCompany}
                truckId={setTruckId}
                loadingPointId={setLoadingPointId}
                unloadingPointId={setUnloadingPointId}
                freightAmount={freightAmount}
                transporterAmount={transporterAmount}
                totalFreightAmount={totalFreightAmount}
                totalTransporterAmount={totalTransporterAmount}
                margin={margin}
                fuel={fuel}
                setFuel={setFuel}
            />
            <SubmitButton name="Start" type="submit" />
        </form>
    )
}
export default NewTrip
