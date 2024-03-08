import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import FormField from './formField'
import { getOverallTripByCompany } from '../../services/overallTrips'
import { useEffect, useState } from 'react'
import ListAllTripForInvoice from './show'
import dayjs from 'dayjs'
import { Button } from '@mui/material'
import InvoiceDialog from './invoiceDialog'
import { updateInvoiceDetails } from '../../services/invoice'
import { getLastBillNumber } from '../../services/billNumber'
import useAuthorization from '../../../authorization'
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
    tripId: number
    tripName: string
}
const InvoiceList: React.FC = () => {
    const { handleSubmit, control } = useForm<FieldValues>()
    const [tripDetails, setTripDetails] = useState([])
    const [startDate, setStartDate] = useState<string | null>(null)
    const [endDate, setEndDate] = useState<string | null>(null)
    const [cementCompany, setCementCompany] = useState<cementCompanyProps[]>([])
    const [cementCompanyName, setCementCompanyName] = useState<string>('')
    const [tripId, setTripId] = useState<tripDetailsProps[]>([])
    const [message, setMessage] = useState<string>('Select Cement Comapany to List Data..!')
    const [activate, setActivate] = useState<boolean>(false)
    const [lastBillNumber, setLastBillNumber] = useState<string>('')
    const token = useAuthorization()
    useEffect(() => {
        setTripDetails([])
        setTripId([])
        setMessage('Select Cement Comapany to List Data..!')
    }, [cementCompanyName])
    const onSubmit: SubmitHandler<FieldValues> = async () => {
        getTripDetails()
        await generateBillNumber().then(setLastBillNumber)
    }
    const handleClick = () => setActivate(true)

    const generateBillNumber = async () => {
        return await getLastBillNumber().then((billNo) => {
            const financialYear =
                dayjs().month() < 3
                    ? `${String(dayjs().year() - 1).slice(-2)}`
                    : `${String(dayjs().year()).slice(-2)}`
            return `MGL${financialYear}A-${parseInt(billNo.lastBillNo.split('-')[1]) + 1}`
        })
    }
    const getTripDetails = () => {
        if (
            (endDate !== null && startDate !== null && cementCompanyName !== '') ||
            (cementCompanyName !== '' && startDate !== null) ||
            cementCompanyName !== ''
        ) {
            const start_date =
                startDate !== null
                    ? dayjs(dayjs((startDate as unknown as dateProps)?.$d)).unix()
                    : 0
            const end_date =
                endDate !== null ? dayjs(dayjs((endDate as unknown as dateProps)?.$d)).unix() : 0
            getOverallTripByCompany(
                cementCompanyName !== '' ? cementCompanyName : null,
                start_date,
                end_date
            )
                .then(setTripDetails)
                .then(() => tripId.length === 0 && setMessage('No Records Found..!'))
        } else alert("Cement Company can't be Empty..!\nand\nStart Date can't be Empty..!")
    }
    const updateInvoice = async () => {
        const data = {
            trip: tripId,
            billNo: lastBillNumber
        }
        await updateInvoiceDetails(data, token).then(getTripDetails)
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
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    startDate={startDate}
                    endDate={endDate}
                    cementCompany={cementCompany}
                    setCementCompany={setCementCompany}
                    setCementCompanyName={setCementCompanyName}
                />
                <Button
                    color="secondary"
                    variant="contained"
                    type="button"
                    style={{ margin: '10px' }}
                    onClick={handleClick}
                    disabled={tripId.length === 0}
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
            {activate && (
                <InvoiceDialog
                    tripId={tripId}
                    company={cementCompanyName}
                    setActivate={setActivate}
                    updateInvoice={updateInvoice}
                    lastBillNumber={lastBillNumber}
                />
            )}
        </form>
    )
}
export default InvoiceList
