import { useForm, SubmitHandler, FieldValues, UseFormSetValue } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { getAllTransporter } from '../../services/transporter.ts'
import FormField from './formFields.tsx'
import SubmitButton from '../../../form/button.tsx'
import { getAllCementCompany } from '../../services/cementCompany.ts'
import { createTrip } from '../../services/trip.ts'
import { getPricePoint } from '../../services/pricePoint.ts'
import { createStockPointTrip } from '../../services/stockPointTrip.tsx'
interface transporter {
    name: string
    transporterAmount: number
    freightAmount: number
}
const NewTrip: React.FC = () => {
    const { handleSubmit, control, watch, setValue } = useForm<FieldValues>()
    const [transporter, setTransporter] = useState([])
    const [cementCompany, setCementCompany] = useState([])
    const [truckId, setTruckId] = useState(0)
    const [ownTruck, setOwnTruck] = useState(false)
    const [loadingPointId, setLoadingPointId] = useState<number | null>(null)
    const [stockPointId, setStockPointId] = useState<number | null>(null)
    const [unloadingPointId, setUnloadingPointId] = useState<number | null>(null)
    const [freightAmount, setFreightAmount] = useState(0)
    const [transporterAmount, setTransporterAmount] = useState(0)
    const [tdsPercentage, setTdsPercentage] = useState(0)
    const [totalTransporterAmount, setTotalTransporterAmount] = useState(0)
    const [totalFreightAmount, setTotalFreightAmount] = useState(0)
    const [margin, setMargin] = useState(0)
    const [fuel, setFuel] = useState(false)
    const filledLoad = watch('filledLoad')
    const [category, setCategory] = useState<string>('')
    const [clear, setClear] = useState<boolean>(false)
    const [ownTruckFuel, setownTruckFuel] = useState<boolean>(true)
    const [listTruck, setListTruck] = useState([])
    useEffect(() => {
        setTotalFreightAmount(freightAmount * parseFloat(filledLoad))
        setTotalTransporterAmount(transporterAmount * parseFloat(filledLoad))
        setMargin(totalFreightAmount - totalTransporterAmount)
    }, [
        filledLoad,
        freightAmount,
        transporterAmount,
        totalFreightAmount,
        totalTransporterAmount,
        tdsPercentage
    ])

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (checkCondition(truckId, data, freightAmount)) {
            const filledLoad = parseFloat(data.filledLoad).toFixed(2)
            const freightAmountFloat = freightAmount.toFixed(2)
            const transporterAmountFloat = transporterAmount.toFixed(2)
            const totalFreightAmountFloat = totalFreightAmount.toFixed(2)
            const totalTransporterAmountFloat = (totalTransporterAmount).toFixed(2)
            const marginFloat = margin.toFixed(2)
            const details = {
                truckId: truckId,
                loadingPointId: loadingPointId,
                startDate: data.tripDate.startOf('day').unix(),
                filledLoad: parseFloat(filledLoad),
                invoiceNumber: data.invoiceNumber,
                freightAmount: parseFloat(freightAmountFloat),
                transporterAmount: ownTruck === false ? parseFloat(transporterAmountFloat) : 0,
                totalFreightAmount: parseFloat(totalFreightAmountFloat),
                totalTransporterAmount:
                    ownTruck === false ? parseFloat(totalTransporterAmountFloat) : 0,
                margin: ownTruck === false ? parseFloat(marginFloat) : 0,
                wantFuel: ownTruck === false ? fuel : ownTruckFuel
            }
            if (category === 'Stock Point')
                createStockPointTrip({ ...details, stockPointId: stockPointId })
                    .then(() => clearForm(clear, setClear, setCategory, setValue, setListTruck))
                    .catch((error) => alert(`Error in ${error.response.data.meta.target[0]}`))
            else if (category === 'Unloading Point')
                createTrip({ ...details, unloadingPointId: unloadingPointId })
                    .then(() => clearForm(clear, setClear, setCategory, setValue, setListTruck))
                    .catch((error) => alert(`Error in ${error.response.data.meta.target[0]}`))
        } else alert('All fields Required')
    }
    useEffect(() => {
        getAllTransporter().then((transporterData) => setTransporter(transporterData))
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
                ownTruck={ownTruck}
                setOwnTruck={setOwnTruck}
                transporter={transporter}
                cementCompany={cementCompany}
                setTruckId={setTruckId}
                loadingPointId={setLoadingPointId}
                unloadingPointId={setUnloadingPointId}
                freightAmount={freightAmount}
                setownTruckFuel={setownTruckFuel}
                setFreightAmount={setFreightAmount}
                transporterAmount={transporterAmount}
                setTransporterAmount={setTransporterAmount}
                setTdsPercentage={setTdsPercentage}
                totalFreightAmount={totalFreightAmount}
                totalTransporterAmount={totalTransporterAmount}
                margin={margin}
                fuel={fuel}
                setFuel={setFuel}
                setCategory={setCategory}
                category={category}
                stockPointId={setStockPointId}
                setValue={setValue}
                clear={clear}
                setListTruck={setListTruck}
                listTruck={listTruck}
            />
            <SubmitButton name="Start" type="submit" />
        </form>
    )
}
export default NewTrip
function checkCondition(truckId: number, data: FieldValues, freightAmount: number) {
    return (
        truckId !== 0 && data.invoiceNumber !== '' && data.filledLoad !== '' && freightAmount !== 0
    )
}
const clearForm = (
    clear: boolean,
    setClear: React.Dispatch<React.SetStateAction<boolean>>,
    setCategory: React.Dispatch<React.SetStateAction<string>>,
    setValue: UseFormSetValue<FieldValues>,
    setListTruck: React.Dispatch<React.SetStateAction<never[]>>
) => {
    setClear(!clear)
    setCategory('')
    setValue('tripDate', null)
    setValue('filledLoad', '')
    setListTruck([])
}
