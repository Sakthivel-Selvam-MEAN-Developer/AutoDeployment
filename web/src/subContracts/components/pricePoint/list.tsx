import React, { ReactElement, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import SubmitButton from '../../../form/button'
import FormFields from './formField'
import { getAllCementCompany } from '../../services/cementCompany'
import { createpricePoint } from '../../services/pricePoint'

interface transporter {
    name: string
}
const CreatePricepoint: React.FC = (): ReactElement => {
    const { handleSubmit, control, watch } = useForm<FieldValues>()
    const [transporterRate, setTransporterRate] = useState<number>(0)
    const [cementCompany, setCementCompany] = useState([])
    const [factoryId, setFactoryId] = useState<number>(0)
    const [deliveryPointId, setDeliveryPointId] = useState<number>(0)
    const freightAmount = watch('freightAmount')
    const transporterPercentage = watch('transporterPercentage')
    useEffect(() => {
        getAllCementCompany().then((companyData) =>
            setCementCompany(companyData.map(({ name }: transporter) => name))
        )
    }, [])
    useEffect(() => {
        setTransporterRate(
            parseInt(freightAmount) -
                (parseInt(freightAmount) * parseInt(transporterPercentage)) / 100
        )
    }, [freightAmount, transporterPercentage])
    const onSubmit: SubmitHandler<FieldValues> = (data: any) => {
        const details = {
            factoryId: factoryId,
            deliveryPointId: deliveryPointId,
            freightAmount: parseInt(data.freightAmount),
            transporterPercentage: parseInt(data.transporterPercentage),
            transporterAmount: transporterRate
        }
        createpricePoint(JSON.stringify(details))
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormFields
                control={control}
                cementCompany={cementCompany}
                factoryId={setFactoryId}
                deliveryPointId={setDeliveryPointId}
                transporterRate={transporterRate}
            />
            <SubmitButton name="Submit" type="submit" />
        </form>
    )
}
export default CreatePricepoint
