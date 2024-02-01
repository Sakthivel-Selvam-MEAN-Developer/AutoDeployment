import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { getAllTransporter } from '../../services/transporter.ts'
import FormField from './formFields.tsx'
import SubmitButton from '../../../form/button.tsx'
import { getAllCementCompany } from '../../services/cementCompany.ts'
import { createTrip } from '../../services/trip.ts'
import { useNavigate } from 'react-router-dom'
import { getPricePoint } from '../../services/pricePoint.ts'
import { createStockPointTrip } from '../../services/stockPointTrip.tsx'

interface transporter {
    name: string
    transporterAmount: number
    freightAmount: number
}
const NewTrip: React.FC = () => {
    const navigate = useNavigate()
    const { handleSubmit, control, watch, setValue } = useForm<FieldValues>()
    const [transporter, setTransporter] = useState([])
    const [cementCompany, setCementCompany] = useState([])
    const [truckId, setTruckId] = useState(0)
    const [loadingPointId, setLoadingPointId] = useState<number | null>(null)
    const [stockPointId, setStockPointId] = useState<number | null>(null)
    const [unloadingPointId, setUnloadingPointId] = useState<number | null>(null)
    const [freightAmount, setFreightAmount] = useState(0)
    const [transporterAmount, setTransporterAmount] = useState(0)
    const [totalTransporterAmount, setTotalTransporterAmount] = useState(0)
    const [totalFreightAmount, setTotalFreightAmount] = useState(0)
    const [margin, setMargin] = useState(0)
    const [fuel, setFuel] = useState(false)
    const filledLoad = watch('filledLoad')
    const [category, setCategory] = useState<string>('')

    useEffect(() => {
        setTotalFreightAmount(freightAmount * parseFloat(filledLoad))
        setTotalTransporterAmount(transporterAmount * parseFloat(filledLoad))
        setMargin(totalFreightAmount - totalTransporterAmount)
    }, [filledLoad, freightAmount, transporterAmount, totalFreightAmount, totalTransporterAmount])

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (
            truckId !== 0 &&
            data.invoiceNumber !== '' &&
            data.filledLoad !== '' &&
            freightAmount !== 0
        ) {
            const filledLoad = parseFloat(data.filledLoad).toFixed(2)
            const freightAmountFloat = freightAmount.toFixed(2)
            const transporterAmountFloat = transporterAmount.toFixed(2)
            const totalFreightAmountFloat = totalFreightAmount.toFixed(2)
            const totalTransporterAmountFloat = totalTransporterAmount.toFixed(2)
            const marginFloat = margin.toFixed(2)
            const details = {
                truckId: truckId,
                loadingPointId: loadingPointId,
                startDate: data.tripDate.unix(),
                filledLoad: parseFloat(filledLoad),
                invoiceNumber: data.invoiceNumber,
                freightAmount: parseFloat(freightAmountFloat),
                transporterAmount: parseFloat(transporterAmountFloat),
                totalFreightAmount: parseFloat(totalFreightAmountFloat),
                totalTransporterAmount: parseFloat(totalTransporterAmountFloat),
                margin: parseFloat(marginFloat),
                wantFuel: fuel
            }
            if (category === 'Stock Point')
                createStockPointTrip({ ...details, stockPointId: stockPointId }).then(() =>
                    navigate('/sub/trip')
                )
            else if (category === 'Unloading Point')
                createTrip({ ...details, unloadingPointId: unloadingPointId }).then(() =>
                    navigate('/sub/trip')
                )
        } else alert('All fields Required')
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
        // if (loadingPointId !== undefined && unloadingPointId !== undefined) {
        getPricePoint(loadingPointId, unloadingPointId, stockPointId).then((data) => {
            setFreightAmount(data.freightAmount)
            setTransporterAmount(data.transporterAmount)
        })
        // }
    }, [loadingPointId, unloadingPointId, stockPointId])
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormField
                control={control}
                transporter={transporter}
                cementCompany={cementCompany}
                setTruckId={setTruckId}
                loadingPointId={setLoadingPointId}
                unloadingPointId={setUnloadingPointId}
                freightAmount={freightAmount}
                setFreightAmount={setFreightAmount}
                transporterAmount={transporterAmount}
                setTransporterAmount={setTransporterAmount}
                totalFreightAmount={totalFreightAmount}
                totalTransporterAmount={totalTransporterAmount}
                margin={margin}
                fuel={fuel}
                setFuel={setFuel}
                setCategory={setCategory}
                category={category}
                stockPointId={setStockPointId}
                setValue={setValue}
            />
            <SubmitButton name="Start" type="submit" />
        </form>
    )
}
export default NewTrip
