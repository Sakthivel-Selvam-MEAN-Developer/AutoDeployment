import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import FormField from './formField'
import { getOverallTripByCompany } from '../../services/overallTrips'
import { useState } from 'react'
import ListAllTripForInvoice from './show'
import dayjs from 'dayjs'
import { Button } from '@mui/material'
interface dateProps {
    $d: number
}
export interface cementCompanyProps {
    address: string
    contactPersonName: string
    contactPersonNumber: string
    emailId: string
    gstNo: string
    id: number
    name: string
}
export interface tripDetailsProps {
    overallTripId: number
    tripId: number
    tripName: string
}
const InvoiceList: React.FC = () => {
    const { handleSubmit, control } = useForm<FieldValues>()
    const [tripDetails, setTripDetails] = useState([])
    const [loadingDate, setLoadingDate] = useState<string | null>(null)
    const [cementCompany, setCementCompany] = useState<cementCompanyProps[]>([])
    const [cementCompanyName, setCementCompanyName] = useState<string>('')
    const [tripId, setTripId] = useState<tripDetailsProps[]>([])
    const [message, setMessage] = useState<string>('Select Date or Cement Comapany to List Data..!')
    const onSubmit: SubmitHandler<FieldValues> = () => {
        const date =
            loadingDate !== null
                ? dayjs(dayjs((loadingDate as unknown as dateProps)?.$d)).unix()
                : 0
        if (loadingDate !== null || cementCompanyName !== '')
            getOverallTripByCompany(cementCompanyName !== '' ? cementCompanyName : null, date)
                .then(setTripDetails)
                .then(() => tripId.length === 0 && setMessage('No Records Found..!'))
        else alert('Any one field Required..!')
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                }}
            >
                <FormField
                    control={control}
                    setLoadingDate={setLoadingDate}
                    loadingDate={loadingDate}
                    cementCompany={cementCompany}
                    setCementCompany={setCementCompany}
                    setCementCompanyName={setCementCompanyName}
                />
                <Button
                    color="secondary"
                    variant="contained"
                    type="button"
                    style={{ margin: '10px' }}
                >
                    Generate Invoice
                </Button>
            </div>
            {tripDetails.length !== 0 ? (
                <ListAllTripForInvoice
                    tripDetails={tripDetails}
                    setTripId={setTripId}
                    tripId={tripId}
                />
            ) : (
                <p style={{ marginTop: '30px' }}>{message}</p>
            )}
        </form>
    )
}
export default InvoiceList
