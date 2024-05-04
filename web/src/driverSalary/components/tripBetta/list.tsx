import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import TripBettaFormFields from './formFields'
import { useEffect, useState } from 'react'
import { createTripSalary, getAllCementCompany } from '../../services/tripBetta'
import SubmitButton from '../../../form/button'

export interface cementCompanyProps {
    name: string
    id: number
}
const AddTripBetta = () => {
    const { handleSubmit, control } = useForm<FieldValues>()
    const [cementCompany, setCementCompany] = useState<cementCompanyProps[]>([{ name: '', id: 0 }])
    const [loadingPointId, setLoadingPointId] = useState<number | null>(null)
    const [unloadingPointId, setUnloadingPointId] = useState<number | null>(null)
    const [stockPointId, setStockPointId] = useState<number | null>(null)
    const [cementCompanyName, setCementCompanyName] = useState<string>('')
    const [cementCompanyId, setCementCompanyId] = useState<number>(0)
    const [tripSalary, setTripSalary] = useState<number>(0)
    const [driverAdvance, setDriverAdvance] = useState<number>(0)
    const [dailySalary, setDailySalary] = useState<number>(0)
    const [category, setCategory] = useState<string>('')
    useEffect(() => {
        getAllCementCompany().then((companyData) =>
            setCementCompany(
                companyData.map(({ name, id }: { name: string; id: number }) => ({ name, id }))
            )
        )
    }, [])
    const onSubmit: SubmitHandler<FieldValues> = () => {
        const tripSalaryDetails = {
            cementCompanyId,
            loadingPointId,
            unloadingPointId,
            stockPointId,
            tripBetta: tripSalary,
            dailyBetta: dailySalary,
            driverAdvance
        }
        createTripSalary(tripSalaryDetails)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TripBettaFormFields
                control={control}
                cementCompany={cementCompany}
                setLoadingPointId={setLoadingPointId}
                setUnloadingPointId={setUnloadingPointId}
                setStockPointId={setStockPointId}
                loadingPointId={loadingPointId}
                unloadingPointId={unloadingPointId}
                stockPointId={stockPointId}
                setCategory={setCategory}
                setCementCompanyName={setCementCompanyName}
                category={category}
                cementCompanyName={cementCompanyName}
                setCementCompanyId={setCementCompanyId}
                cementCompanyId={cementCompanyId}
                setTripSalary={setTripSalary}
                setDriverAdvance={setDriverAdvance}
                setDailySalary={setDailySalary}
                tripSalary={tripSalary}
                driverAdvance={driverAdvance}
                dailySalary={dailySalary}
            />
            <SubmitButton name="Create / Update" type="submit" disabled={false} />
        </form>
    )
}
export default AddTripBetta
