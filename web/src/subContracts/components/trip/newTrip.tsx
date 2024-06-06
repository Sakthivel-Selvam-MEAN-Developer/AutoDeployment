import { useForm, SubmitHandler, FieldValues, UseFormSetValue } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { getAllTransporter } from '../../services/transporter.ts'
import FormField from './formFields.tsx'
import SubmitButton from '../../../form/button.tsx'
import { getAllCementCompany } from '../../services/cementCompany.ts'
import { createTrip } from '../../services/trip.ts'
import { getPricePoint } from '../../services/pricePoint.ts'
import { createStockPointTrip } from '../../services/stockPointTrip.tsx'
import { getAllDriver } from '../../../driverSalary/services/driver.ts'
import SuccessDialog from '../../../commonUtils/SuccessDialog.tsx'
import { createDriverTrip } from '../../../driverSalary/services/driverTrip.ts'
import { getTripSalaryDetailsById } from '../../../driverSalary/services/tripBetta.ts'

interface transporter {
    name: string
    transporterAmount: number
    freightAmount: number
}
export interface FuelProps {
    fueledDate: number
    invoiceNumber: string
    pricePerliter: number
    quantity: number
    totalprice: number
    vehicleNumber: string
    bunk: {
        bunkName: string
    }
}
const NewTrip: React.FC = () => {
    const { handleSubmit, control, setValue } = useForm<FieldValues>()
    const [transporter, setTransporter] = useState([])
    const [cementCompany, setCementCompany] = useState([])
    const [driversList, setDriversList] = useState([])
    const [truckId, setTruckId] = useState(0)
    const [ownTruck, setOwnTruck] = useState(false)
    const [loadingPointId, setLoadingPointId] = useState<number | null>(null)
    const [stockPointId, setStockPointId] = useState<number | null>(null)
    const [unloadingPointId, setUnloadingPointId] = useState<number | null>(null)
    const [freightAmount, setFreightAmount] = useState(0)
    const [transporterAmount, setTransporterAmount] = useState(0)
    const [totalTransporterAmount, setTotalTransporterAmount] = useState(0)
    const [totalFreightAmount, setTotalFreightAmount] = useState(0)
    const [margin, setMargin] = useState(0)
    const [loadingKilometer, setLoadingKilometer] = useState(0)
    const [fuel, setFuel] = useState(false)
    const [filledLoad, setFilledLoad] = useState<number | null>(null)
    const [category, setCategory] = useState<string>('')
    const [driverId, setDriverId] = useState<number>(0)
    const [driverName, setDriverName] = useState('')
    const [clear, setClear] = useState<boolean>(false)
    const [ownTruckFuel, setownTruckFuel] = useState<boolean>(true)
    const [listTruck, setListTruck] = useState([])
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
    const [fuelDetails, setFuelDetails] = useState<FuelProps | null>(null)
    const [disable, setDisable] = useState(false)

    useEffect(() => {
        setTotalFreightAmount(freightAmount * (filledLoad !== null ? filledLoad : 0))
        setTotalTransporterAmount(transporterAmount * (filledLoad !== null ? filledLoad : 0))
        setMargin(((totalFreightAmount - totalTransporterAmount) * 70) / 100)
    }, [filledLoad, freightAmount, transporterAmount, totalFreightAmount, totalTransporterAmount])

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const tripSalaryDetails = await getTripSalaryDetailsById(
            loadingPointId,
            unloadingPointId,
            stockPointId
        ).then((data) => data)
        if (checkCondition(truckId, data, freightAmount, filledLoad)) {
            const freightAmountFloat = freightAmount.toFixed(2)
            const transporterAmountFloat = transporterAmount.toFixed(2)
            setDisable(true)
            const details = {
                truckId: truckId,
                loadingPointId: loadingPointId,
                startDate: data.tripDate.startOf('day').unix(),
                filledLoad: filledLoad,
                invoiceNumber: data.invoiceNumber,
                loadingKilometer: loadingKilometer,
                freightAmount: parseFloat(freightAmountFloat),
                transporterAmount: ownTruck === false ? parseFloat(transporterAmountFloat) : 0,
                wantFuel: ownTruck === false ? fuel : ownTruckFuel,
                partyName: data.partyName,
                lrNumber: data.lrNumber
            }
            const driverDetails = {
                tripStartDate: data.tripDate.startOf('day').unix(),
                driverId
            }
            const createStockTrip = async () => {
                if (!ownTruck)
                    return await createStockPointTrip({ ...details, stockPointId: stockPointId })
                else if (ownTruck && tripSalaryDetails !== null)
                    return await createStockPointTrip({
                        ...details,
                        stockPointId: stockPointId
                    }).then((trip) => {
                        return (
                            ownTruck &&
                            createDriverTrip({
                                ...driverDetails,
                                tripId: trip.id,
                                unloadingTripSalaryId: tripSalaryDetails.id
                            })
                        )
                    })
                else throw new Error('There is No Trip Salary Details for Specified Locations')
            }
            const createUnloadingTrip = async () => {
                if (!ownTruck)
                    return await createTrip({
                        ...details,
                        unloadingPointId: unloadingPointId
                    })
                else if (ownTruck && tripSalaryDetails !== null)
                    return await createTrip({
                        ...details,
                        unloadingPointId: unloadingPointId,
                        partyName: data.partyName,
                        lrNumber: data.lrNumber
                    }).then((trip) => {
                        return (
                            ownTruck &&
                            createDriverTrip({
                                ...driverDetails,
                                tripId: trip.id,
                                unloadingTripSalaryId: tripSalaryDetails.id
                            })
                        )
                    })
                else throw new Error('There is No Trip Salary Details for Specified Locations')
            }
            if (category === 'Stock Point')
                createStockTrip()
                    .then(() => {
                        clearForm(
                            clear,
                            setClear,
                            setCategory,
                            setValue,
                            setListTruck,
                            setFuelDetails,
                            setFuel,
                            setFilledLoad
                        )
                        setOpenSuccessDialog(true)
                        setDisable(false)
                    })
                    .catch((error) => {
                        alert(error.response ? error.response.data.error : error)
                        setDisable(false)
                    })
            else if (category === 'Unloading Point')
                createUnloadingTrip()
                    .then(() => {
                        clearForm(
                            clear,
                            setClear,
                            setCategory,
                            setValue,
                            setListTruck,
                            setFuelDetails,
                            setFuel,
                            setFilledLoad
                        )
                        setOpenSuccessDialog(true)
                        setDisable(false)
                    })
                    .catch((error) => {
                        alert(error.response.data.error)
                        setDisable(false)
                    })
            else setDisable(false)
        } else alert('All fields Required')
    }
    useEffect(() => {
        getAllTransporter().then((transporterData) => setTransporter(transporterData))
        getAllCementCompany().then((companyData) =>
            setCementCompany(cementCompany && companyData.map(({ name }: transporter) => name))
        )
        if (driversList.length === 0) getAllDriver().then(setDriversList)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        getPricePoint(loadingPointId, unloadingPointId, stockPointId).then((data) => {
            setFreightAmount(data.freightAmount)
            setTransporterAmount(data.transporterAmount)
        })
    }, [loadingPointId, unloadingPointId, stockPointId])
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormField
                control={control}
                ownTruck={ownTruck}
                setOwnTruck={setOwnTruck}
                transporter={transporter}
                driversList={driversList}
                setDriverId={setDriverId}
                cementCompany={cementCompany}
                setTruckId={setTruckId}
                loadingPointId={setLoadingPointId}
                unloadingPointId={setUnloadingPointId}
                freightAmount={freightAmount}
                setownTruckFuel={setownTruckFuel}
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
                clear={clear}
                setListTruck={setListTruck}
                listTruck={listTruck}
                setFuelDetails={setFuelDetails}
                fuelDetails={fuelDetails}
                setDriverName={setDriverName}
                driverName={driverName}
                filledLoad={filledLoad}
                setFilledLoad={setFilledLoad}
                setLoadingKilometer={setLoadingKilometer}
                loadingKilometer={loadingKilometer}
            />
            <SubmitButton name="Start" type="submit" disabled={disable} />
            <SuccessDialog
                open={openSuccessDialog}
                handleClose={() => setOpenSuccessDialog(false)}
                message="Trip creation is successful"
            />
        </form>
    )
}
export default NewTrip
function checkCondition(
    truckId: number,
    data: FieldValues,
    freightAmount: number,
    filledLoad: number | null
) {
    return truckId !== 0 && data.invoiceNumber !== '' && freightAmount !== 0 && filledLoad !== null
}
const clearForm = (
    clear: boolean,
    setClear: React.Dispatch<React.SetStateAction<boolean>>,
    setCategory: React.Dispatch<React.SetStateAction<string>>,
    setValue: UseFormSetValue<FieldValues>,
    setListTruck: React.Dispatch<React.SetStateAction<never[]>>,
    setFuelDetails: React.Dispatch<React.SetStateAction<FuelProps | null>>,
    setFuel: React.Dispatch<React.SetStateAction<boolean>>,
    setFilledLoad: React.Dispatch<React.SetStateAction<number | null>>
) => {
    setClear(!clear)
    setCategory('')
    setValue('tripDate', null)
    setValue('filledLoad', '')
    setListTruck([])
    setFuelDetails(null)
    setFuel(false)
    setFilledLoad(0)
}
