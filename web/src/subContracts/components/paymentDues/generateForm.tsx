import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useEffect, useState } from 'react'
import { getOnlyActiveDues } from '../../services/paymentDues'
import { Checkbox, ListItemSecondaryAction } from '@mui/material'
import dayjs from 'dayjs'
import { epochToMinimalDate } from '../../../commonUtils/epochToTime'
import { NEFTDetailsProps, bankDetailsProps } from './list'

interface tripProp {
    id: number
    number: string
    loadingPoint: string
    unloadingPoint: string
    payableAmount: number
    type: string
    transactionId: string
    invoiceNumber: string
    fuelInvoiceNumber: string
    date: number
    tripId: number
    location: string
}
interface dataProp {
    name: string
    dueDetails: { count: number; totalPayableAmount: number }
    tripDetails: tripProp[]
    bankDetails: bankDetailsProps[]
}
export interface GenerateFormProps {
    NEFTDetails: NEFTDetailsProps[]
    setNEFTDetails: React.Dispatch<React.SetStateAction<NEFTDetailsProps[]>>
    paymentDueId: number[]
    refresh: boolean
    setPaymentDueId: React.Dispatch<React.SetStateAction<number[]>>
}
const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
const GenerateForm: React.FC<GenerateFormProps> = ({
    NEFTDetails,
    setNEFTDetails,
    paymentDueId,
    setPaymentDueId,
    refresh
}) => {
    const [transporterDue, setTransporterDue] = useState([])
    const style = { width: '100%', padding: '10px 10px 0px' }
    const accordianStyle = { display: 'flex', borderBottom: '1px solid grey' }
    useEffect(() => {
        setNEFTDetails([])
        setPaymentDueId([])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        const todayDate = dayjs().startOf('day').unix()
        getOnlyActiveDues(todayDate, false)
            .then(setTransporterDue)
            .then(() => setNEFTDetails([]))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh])
    const handleClick = (list: tripProp, data: dataProp) => {
        const obj = {
            id: list.id,
            bankDetails: data.bankDetails,
            type: list.type,
            payableAmount: list.payableAmount
        }
        if (NEFTDetails.find((detail) => detail.id === obj.id)) {
            setNEFTDetails(NEFTDetails.filter((detail) => detail.id !== obj.id))
            setPaymentDueId(paymentDueId.filter((id) => id !== obj.id))
        } else {
            setNEFTDetails((prevDetails) => [...prevDetails, obj])
            setPaymentDueId((prevId) => [...prevId, obj.id])
        }
    }
    return (
        <>
            {transporterDue ? (
                transporterDue.map((data: dataProp) => {
                    return (
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                sx={{ borderBottom: '1px solid grey' }}
                            >
                                <Typography sx={{ padding: '10px 10px 0px', width: '350px' }}>
                                    <b>{data.name}</b>
                                </Typography>
                                <Typography sx={style}>
                                    Total Trips: <b>{data.dueDetails.count}</b>
                                </Typography>
                                <ListItemSecondaryAction sx={{ padding: '10px 30px' }}>
                                    Total Amount: <b>{data.dueDetails.totalPayableAmount}</b>
                                </ListItemSecondaryAction>
                            </AccordionSummary>
                            {data.tripDetails &&
                                data.tripDetails.map((list: tripProp) => {
                                    return (
                                        <AccordionDetails sx={accordianStyle}>
                                            <Typography>
                                                <Checkbox
                                                    key={list.id}
                                                    onClick={() => handleClick(list, data)}
                                                    {...label}
                                                />
                                            </Typography>
                                            <Typography sx={style}>
                                                <b>{list.number}</b>
                                            </Typography>
                                            <Typography sx={style}>
                                                {list.type !== 'fuel pay'
                                                    ? list.loadingPoint +
                                                      ' - ' +
                                                      list.unloadingPoint
                                                    : list.location}
                                            </Typography>
                                            <Typography sx={style}>{list.type} </Typography>
                                            <Typography sx={style}>{list.payableAmount}</Typography>
                                            <Typography sx={style}>{list.invoiceNumber}</Typography>
                                            <Typography sx={style}>
                                                {epochToMinimalDate(list.date)}
                                            </Typography>
                                        </AccordionDetails>
                                    )
                                })}
                        </Accordion>
                    )
                })
            ) : (
                <p style={{ textAlign: 'center' }}>No Dues to Generate NEFT File...!</p>
            )}
        </>
    )
}
export default GenerateForm
