import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useEffect, useState } from 'react'
import { getGstDues } from '../../services/paymentDues'
import { Checkbox, ListItemSecondaryAction } from '@mui/material'

interface tripProp {
    fuelId: number
    id: number
    vehicleNumber: string
    amount: number
    type: string
    transactionId: string
}
interface bankDetailProps {
    name: string
    accountNumber: string
    ifsc: string
    address: string
    accountTypeNumber: number
    bunkName: string
    location: string
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
    const handleClick = (list: tripProp, data: dataProp) => {
        const obj = {
            id: list.id,
            bankDetails: data.bankDetails,
            type: list.type,
            payableAmount: list.amount
        }
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
                <Checkbox onClick={() => handleClick(list, data)} {...label} />
            </Typography>
            <Typography sx={style}>
                <b>{list.vehicleNumber}</b>
            </Typography>
            <Typography sx={style}>{list.type} </Typography>
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        getGstDues(false).then(setGstDues)
    }, [refresh])
    return (
        <>
            {gstDues.length !== 0 ? (
                gstDues.map((data: dataProp) => {
                    return (
                        <Accordion>
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
