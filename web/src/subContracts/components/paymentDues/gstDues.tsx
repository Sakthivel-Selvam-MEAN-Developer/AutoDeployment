import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useEffect, useState } from 'react'
import { getGstDues } from '../../services/paymentDues'
import { Checkbox, ListItemSecondaryAction } from '@mui/material'
import { epochToMinimalDate } from '../../../commonUtils/epochToTime'

interface tripProp {
    fuelId: number
    id: number
    vehicleNumber: string
    amount: number
    type: string
    transactionId: string
    loadingPoint: string
    unloadingPoint: string
    invoiceNumber: string
    startDate: number
    transporterInvoice: string
}
interface bankDetailProps {
    name: string
    accountNumber: string
    ifsc: string
    branchName: string
    accountHolder: string
    accountTypeNumber: number
    bunkName: string
}
interface dataProp {
    name: string
    dueDetails: { count: number; payableAmount: number }
    tripDetails: tripProp[]
    bankDetails: bankDetailProps[]
}
export interface gstNEFTDetailsProps {
    id: number
    bankDetails: bankDetailProps[]
    type: string
    payableAmount: number
    vehicleNumber: string
    transporterName: string
    loadingPoint: string
    unloadingPoint: string
    invoiceNumber: string
    startDate: string
}
export interface GenerateFormProps {
    gstNEFTDetails: gstNEFTDetailsProps[]
    setGstNEFTDetails: React.Dispatch<React.SetStateAction<gstNEFTDetailsProps[]>>
    paymentDueId: number[]
    setPaymentDueId: React.Dispatch<React.SetStateAction<number[]>>
    refresh: boolean
}
const style = { width: '100%', padding: '10px 10px 0px' }
const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
const accordionDetails = (
    accordianStyle: { display: string; borderBottom: string },
    style: { width: string; padding: string },
    list: tripProp,
    data: dataProp,
    gstNEFTDetails: gstNEFTDetailsProps[],
    setGstNEFTDetails: React.Dispatch<React.SetStateAction<gstNEFTDetailsProps[]>>,
    paymentDueId: number[],
    setPaymentDueId: React.Dispatch<React.SetStateAction<number[]>>
) => {
    const obj = {
        id: list.id,
        bankDetails: data.bankDetails,
        type: list.type,
        payableAmount: list.amount,
        vehicleNumber: list.vehicleNumber,
        transporterName: data.name,
        loadingPoint: list.loadingPoint,
        unloadingPoint: list.unloadingPoint,
        transporterInvoice: list.transporterInvoice,
        startDate: epochToMinimalDate(list.startDate),
        invoiceNumber: list.invoiceNumber
    }
    const handleClick = () => {
        if (gstNEFTDetails.find((detail) => detail.id === obj.id)) {
            setGstNEFTDetails(gstNEFTDetails.filter((detail) => detail.id !== obj.id))
            setPaymentDueId(paymentDueId.filter((id) => id !== obj.id))
        } else {
            setGstNEFTDetails((prevDetails) => [...prevDetails, obj])
            setPaymentDueId((prevId) => [...prevId, obj.id])
        }
    }
    return (
        <AccordionDetails sx={accordianStyle}>
            <Typography>
                <Checkbox onClick={() => handleClick()} {...label} />
            </Typography>
            <Typography sx={style}>
                <b>{list.vehicleNumber}</b>
            </Typography>
            <Typography sx={style}>{list.type} </Typography>
            <Typography sx={style}>{list.invoiceNumber} </Typography>
            <Typography sx={style}>{epochToMinimalDate(list.startDate)} </Typography>
            <Typography sx={style}>{list.loadingPoint} </Typography>
            <Typography sx={style}>{list.unloadingPoint} </Typography>
            <Typography sx={style}>
                {list.transporterInvoice !== '' ? list.transporterInvoice : 'Null'}{' '}
            </Typography>
            <Typography sx={style}>{list.amount} </Typography>
        </AccordionDetails>
    )
}

function accordionSummary(data: dataProp) {
    return (
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
                Total Amount: <b>{data.dueDetails.payableAmount.toFixed(2)}</b>
            </ListItemSecondaryAction>
        </AccordionSummary>
    )
}
const GSTDues: React.FC<GenerateFormProps> = ({
    gstNEFTDetails,
    setGstNEFTDetails,
    paymentDueId,
    setPaymentDueId,
    refresh
}) => {
    const [gstDues, setGstDues] = useState([])
    const accordianStyle = { display: 'flex', borderBottom: '1px solid grey' }
    useEffect(() => {
        setGstNEFTDetails([])
        setPaymentDueId([])
    }, [])
    useEffect(() => {
        getGstDues(false).then(setGstDues)
    }, [refresh])
    return (
        <>
            {gstDues.length !== 0 ? (
                gstDues.map((data: dataProp) => {
                    return (
                        <Accordion key={data.name}>
                            {accordionSummary(data)}
                            {data.tripDetails.map((list: tripProp) => {
                                return accordionDetails(
                                    accordianStyle,
                                    style,
                                    list,
                                    data,
                                    gstNEFTDetails,
                                    setGstNEFTDetails,
                                    paymentDueId,
                                    setPaymentDueId
                                )
                            })}
                        </Accordion>
                    )
                })
            ) : (
                <p style={{ textAlign: 'center' }}>No GST Dues to Generate NEFT File...!</p>
            )}
        </>
    )
}
export default GSTDues
