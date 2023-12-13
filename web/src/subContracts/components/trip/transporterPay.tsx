import React, { ReactElement, useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import SubmitButton from '../../../form/button'
import PayFormFields from './payFormFields'
import { getAllTransporter } from '../../services/transporter'
import { updateBalance } from '../../services/trip'
import { useNavigate } from 'react-router-dom'

const TransporterPay: React.FC = (): ReactElement => {
    const navigate = useNavigate()
    const { handleSubmit, control } = useForm<FieldValues>()
    const [transporter, setTransporter] = useState([])
    const [data, setData] = useState<number>(0)
    const [firstPay, setFirstPay] = useState<number>(0)
    const [secondPay, setSecondPay] = useState<number>(0)
    const [tripId, setTripId] = useState<number>(0)
    interface transporter {
        name: string
    }
    useEffect(() => {
        getAllTransporter().then((transporterData) =>
            setTransporter(transporterData.map(({ name }: transporter) => name))
        )
        setFirstPay((data * 70) / 100)
    }, [data])
    useEffect(() => {
        setSecondPay(data - firstPay)
    }, [firstPay])

    const onSubmit = () => {
        const details = {
            tripId: tripId,
            remaining: secondPay
            // seventypercentage: firstPay
        }
        updateBalance(details).then(() => navigate('/sub/trip'))
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <PayFormFields
                    control={control}
                    transporter={transporter}
                    tripId={setTripId}
                    data={setData}
                    firstPay={firstPay}
                    secondPay={secondPay}
                    setFirstPay={setFirstPay}
                    setSecondPay={setSecondPay}
                />
                <SubmitButton name="Paid First Payment" type="submit" />
            </form>
        </>
    )
}

export default TransporterPay
