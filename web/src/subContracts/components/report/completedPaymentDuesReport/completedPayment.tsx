import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import CompletedPaymentForm from './completedPaymentForm'
import { getCompletedDues } from '../../../services/paymentDues'
import CompletedPaymentTable from './completedPaymentTable'
import dayjs from 'dayjs'
import { Pagination, Stack } from '@mui/material'
export interface filterDataType {
    vendor: string | null
    fromDate: number | null
    toDate: number | null
    pageNumber: number
    payType: string | null
    csmName: string | null
}
interface tripDetailsTypes {
    trips: []
    length: number
}
const initialState = {
    pageNumber: 1,
    fromDate: null,
    toDate: null,
    vendor: null,
    payType: null,
    csmName: null
}
const style = {
    display: 'flex',
    bottom: '0',
    width: '100%',
    justifyContent: 'center',
    padding: '10px 0',
    background: 'white'
}
const covertToEpoch = (data: FieldValues) => {
    return {
        fromDate: data.from ? dayjs(data.from).unix() : null,
        toDate: data.to ? dayjs(data.to).unix() : null
    }
}
const CompletedPayment: React.FC = () => {
    const { handleSubmit, control } = useForm<FieldValues>()
    const [tripDetails, setTripdetails] = useState<tripDetailsTypes>({} as tripDetailsTypes)
    const [filterData, setFilterData] = useState<filterDataType>(initialState)
    useEffect(() => {
        if (tripDetails.length > 0) {
            getCompletedDues(filterData).then(setTripdetails)
        }
    }, [filterData.pageNumber])
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const dates = covertToEpoch(data)
        await getCompletedDues({ ...filterData, ...dates }).then(setTripdetails)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <CompletedPaymentForm control={control} setFilterData={setFilterData} />
            {tripDetails.trips && <CompletedPaymentTable completedPayments={tripDetails.trips} />}
            <div style={style}>
                <StackPage setFilterData={setFilterData} length={tripDetails.length} />
            </div>
        </form>
    )
}
export default CompletedPayment
interface stackProps {
    setFilterData: React.Dispatch<React.SetStateAction<filterDataType>>
    length: number
}
const StackPage: React.FC<stackProps> = ({ setFilterData, length }) => {
    return (
        <Stack spacing={10}>
            <Pagination
                count={Math.ceil(length / 20)}
                size="large"
                color="primary"
                onChange={(_e, value) => setFilterData((prev) => ({ ...prev, pageNumber: value }))}
            />
        </Stack>
    )
}
