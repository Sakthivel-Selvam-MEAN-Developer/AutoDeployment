import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import CompletedPaymentForm from './completedPaymentForm'
import { getCompletedDues } from '../../services/paymentDues'
import CompletedPaymentTable from './completedPaymentTable'

export interface transporterProps {
    name: string
}
const CompletedPayment: React.FC = () => {
    const { handleSubmit, control } = useForm<FieldValues>()
    const [completedPayments, setCompletedPayments] = useState([])
    const [transporter, setTransporter] = useState<transporterProps[]>([])
    const [page, setPage] = useState(1)
    const [name, setName] = useState('')
    const [date, setDate] = useState(0)
    const [message, setMessage] = useState<string>('Please Select Any One...')

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setPage(1)
        const date = data.date !== undefined ? data.date.unix() : 0
        setDate(date)
        setName(data.name)
        getCompletedDues(data.name, date, page)
            .then(setCompletedPayments)
            .then(() => completedPayments.length === 0 && setMessage('No Records Found...'))
    }
    useEffect(() => {
        if (name !== '' || date !== 0) getCompletedDues(name, date, page).then(setCompletedPayments)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <CompletedPaymentForm
                control={control}
                transporter={transporter}
                setTransporter={setTransporter}
            />
            <br />
            {completedPayments.length !== 0 ? (
                <CompletedPaymentTable completedPayments={completedPayments} setPage={setPage} />
            ) : (
                <p style={{ marginTop: '30px', textAlign: 'center' }}>{message}</p>
            )}
        </form>
    )
}
export default CompletedPayment
