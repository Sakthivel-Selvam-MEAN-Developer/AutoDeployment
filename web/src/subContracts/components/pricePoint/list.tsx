import React, { ReactElement, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import SubmitButton from '../../../form/button'
import FormFields from './formField'
import { getAllCementCompany } from '../../services/cementCompany'
import { createpricePoint } from '../../services/pricePoint'
import useAuthorization from '../../../authorization.ts'
const CreatePricepoint: React.FC = (): ReactElement => {
    const { handleSubmit, control, watch, setValue } = useForm<FieldValues>()
    const [transporterRate, setTransporterRate] = useState<number>(0)
    const [cementCompany, setCementCompany] = useState([])
    const [loadingPointId, setLoadingPointId] = useState<number | null>(null)
    const [unloadingPointId, setUnloadingPointId] = useState<number | null>(null)
    const [stockPointId, setStockPointId] = useState<number | null>(null)
    const [freightAmount, setFreightAmount] = useState<number>(0)
    const transporterPercentage = watch('transporterPercentage')
    const [cementCompanyName, setCementCompanyName] = useState<string>('')
    const [category, setCategory] = useState<string>('')
    const token = useAuthorization()
    useEffect(() => {
        getAllCementCompany().then((companyData) =>
            setCementCompany(companyData.map(({ name }: { name: string }) => name))
        )
    }, [])
    useEffect(() => {
        setTransporterRate(
            freightAmount - (freightAmount * parseFloat(transporterPercentage)) / 100
        )
    }, [freightAmount, transporterPercentage])
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (
            (loadingPointId && stockPointId) ||
            (loadingPointId && unloadingPointId) ||
            (stockPointId && unloadingPointId)
        ) {
            const transporterAmountFloat = transporterRate.toFixed(2)
            const transporterPercentageFloat = parseFloat(data.transporterPercentage).toFixed(2)
            const details = {
                loadingPointId: loadingPointId,
                unloadingPointId: unloadingPointId,
                stockPointId: stockPointId,
                freightAmount: freightAmount,
                transporterPercentage: parseFloat(transporterPercentageFloat),
                transporterAmount: parseFloat(transporterAmountFloat)
            }
            if (category === 'Loading - Unloading')
                createpricePoint({ ...details, stockPointId: null }, token).then(() =>
                    clearForm(setCategory, setCementCompanyName)
                )
            else if (category === 'Loading - Stock')
                createpricePoint({ ...details, unloadingPointId: null }, token).then(() =>
                    clearForm(setCategory, setCementCompanyName)
                )
            else if (category === 'Stock - Unloading')
                createpricePoint({ ...details, loadingPointId: null }, token).then(() =>
                    clearForm(setCategory, setCementCompanyName)
                )
        } else alert('All fields Required')
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormFields
                control={control}
                cementCompany={cementCompany}
                setLoadingPointId={setLoadingPointId}
                setUnloadingPointId={setUnloadingPointId}
                setStockPointId={setStockPointId}
                freightAmount={freightAmount}
                setFreightAmount={setFreightAmount}
                loadingPointId={loadingPointId}
                unloadingPointId={unloadingPointId}
                stockPointId={stockPointId}
                transporterRate={transporterRate}
                category={category}
                setCategory={setCategory}
                setValue={setValue}
                setCementCompanyName={setCementCompanyName}
                cementCompanyName={cementCompanyName}
            />
            <SubmitButton name="Submit" type="submit" />
        </form>
    )
}
export default CreatePricepoint

const clearForm = (
    setCategory: React.Dispatch<React.SetStateAction<string>>,
    setCementCompanyName: React.Dispatch<React.SetStateAction<string>>
) => {
    setCategory('')
    setCementCompanyName('')
}
