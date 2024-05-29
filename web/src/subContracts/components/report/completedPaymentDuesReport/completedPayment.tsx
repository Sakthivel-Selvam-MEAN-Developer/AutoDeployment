import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { FC, useEffect, useState } from 'react'
import CompletedPaymentForm from './completedPaymentForm'
import { getCompletedDues } from '../../../services/paymentDues'
import CompletedPaymentTable from './completedPaymentTable'
import { Box, CircularProgress, Pagination, Stack } from '@mui/material'

export interface vendorProps {
    bunkName: string
    name: string
}
const style = {
    display: 'flex',
    bottom: '0',
    width: '100%',
    justifyContent: 'center',
    padding: '10px 0',
    background: 'white'
}
const CompletedPayment: React.FC = () => {
    const { handleSubmit, control } = useForm<FieldValues>()
    const [loading, setLoading] = useState(false)
    const [completedPayments, setCompletedPayments] = useState([])
    const [vendor, setVendor] = useState<vendorProps[]>([])
    const [page, setPage] = useState(1)
    const [name, setName] = useState('')
    const [from, setFrom] = useState(0)
    const [payType, setPayType] = useState('')
    const [to, setTo] = useState(0)
    const [message, setMessage] = useState<string>('Please Select Any One...')
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setPage(1)
        const from = data.from !== undefined ? data.from.unix() : 0
        const to = data.to !== undefined ? data.to.unix() : 0
        setFrom(from)
        setTo(to)
        if (name !== '' || (from !== 0 && to !== 0) || payType !== '') {
            setLoading(true)
            getCompletedDues(name !== '' ? name : 'null', from, to, page, payType)
                .then(setCompletedPayments)
                .then(() => {
                    completedPayments.length === 0 && setMessage('No Records Found...')
                    setLoading(false)
                })
        } else if (from === 0 && to === 0 && name === '' && payType === '')
            alert('Please Select Valid Date Or Name...')
    }
    useEffect(() => {
        if (name !== '' || (from !== 0 && to !== 0) || payType !== null) {
            setLoading(true)
            getCompletedDues(name, from, to, page, payType)
                .then(setCompletedPayments)
                .then(() => {
                    completedPayments.length === 0 && setMessage('No Records Found...')
                    setLoading(false)
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <CompletedPaymentForm
                control={control}
                setName={setName}
                vendor={vendor}
                setVendor={setVendor}
                setPayType={setPayType}
            />
            <br />
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <CircularProgress />
                </Box>
            ) : completedPayments.length !== 0 ? (
                <CompletedPaymentTable completedPayments={completedPayments} />
            ) : (
                <p style={{ marginTop: '30px', textAlign: 'center' }}>{message}</p>
            )}
            <div style={{ ...style, position: 'sticky' }}>
                <StackPage setPage={setPage} completedPaymentsLength={completedPayments.length} />
            </div>
        </form>
    )
}
export default CompletedPayment
interface stackProps {
    setPage: React.Dispatch<React.SetStateAction<number>>
    completedPaymentsLength: number
}
const StackPage: FC<stackProps> = ({ setPage, completedPaymentsLength }) => {
    return (
        <Stack spacing={10}>
            <Pagination
                count={Math.ceil(completedPaymentsLength / 15)}
                size="large"
                color="primary"
                onChange={(_e, value) => {
                    setPage(value)
                }}
            />
        </Stack>
    )
}
