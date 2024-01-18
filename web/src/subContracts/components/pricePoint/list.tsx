import React, { ReactElement, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import SubmitButton from '../../../form/button'
import FormFields from './formField'
import { getAllCementCompany } from '../../services/cementCompany'
import { createpricePoint } from '../../services/pricePoint'
const CreatePricepoint: React.FC = (): ReactElement => {
    const { handleSubmit, control, watch } = useForm<FieldValues>()
    const [transporterRate, setTransporterRate] = useState<number>(0)
    const [cementCompany, setCementCompany] = useState([])
    const [loadingPointId, setLoadingPointId] = useState<number | null>(null)
    const [unloadingPointId, setUnloadingPointId] = useState<number | null>(null)
    const [stockPointId, setStockPointId] = useState<number | null>(null)
    const [freightAmount, setFreightAmount] = useState<number>(0)
    const transporterPercentage = watch('transporterPercentage')
    const [category, setCategory] = useState<string>('')
    useEffect(() => {
        getAllCementCompany().then((companyData) =>
            setCementCompany(companyData.map(({ name }: { name: string }) => name))
        )
    }, [])
    useEffect(() => {
        setTransporterRate(freightAmount - (freightAmount * parseInt(transporterPercentage)) / 100)
    }, [freightAmount, transporterPercentage])
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const details = {
            loadingPointId: loadingPointId,
            unloadingPointId: unloadingPointId,
            stockPointId: stockPointId,
            freightAmount: freightAmount,
            transporterPercentage: parseInt(data.transporterPercentage),
            transporterAmount: transporterRate
        }
        if (category === 'Loading - Unloading') createpricePoint({ ...details, stockPointId: null })
        else if (category === 'Loading - Stock')
            createpricePoint({ ...details, unloadingPointId: null })
        else if (category === 'Stock - Unloading')
            createpricePoint({ ...details, loadingPointId: null })
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
            />
            <SubmitButton name="Submit" type="submit" />
        </form>
    )
}
export default CreatePricepoint
