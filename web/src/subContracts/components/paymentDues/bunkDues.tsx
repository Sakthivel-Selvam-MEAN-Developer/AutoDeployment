import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Button, ListItemSecondaryAction, TextField } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { getOnlyActiveDues, updatePaymentDues } from '../../services/paymentDues'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
const BunkDues: React.FC = () => {
    const [bunkDue, setBunkDue] = useState([])
    const [transactionIds, setTransactionIds] = useState<Record<number, string>>({})
    const [refresh, setRefresh] = useState<boolean>(false)
    const style = { width: '100%', padding: '10px 10px 0px' }
    type dataProp = {
        name: string
        dueDetails: { count: number; totalPayableAmount: number }
        tripDetails: tripProp[]
    }
    type tripProp = {
        id: number
        number: string
        loadingPoint: string
        unloadingPoint: string
        payableAmount: number
        type: string
        transactionId: string
    }
    const handleTransactionIdChange = (id: number, value: string) => {
        setTransactionIds((prevIds) => ({
            ...prevIds,
            [id]: value
        }))
    }
    const handleClick = (id: number) => {
        const transactionId = transactionIds[id] || ''
        const data = {
            id,
            transactionId,
            paidAt: dayjs().unix()
        }
        updatePaymentDues(data).then(() => {
            setRefresh(!refresh)
            setTransactionIds((prevIds) => ({
                ...prevIds,
                [id]: ''
            }))
        })
    }
    useEffect(() => {
        const todayDate = dayjs().startOf('day').unix()
        getOnlyActiveDues(todayDate).then(setBunkDue)
    }, [refresh])
    return (
        <>
            {bunkDue.map((data: dataProp) => {
                return (
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            sx={{ borderBottom: '1px solid grey' }}
                        >
                            <Typography sx={{ padding: '0px 20px' }}>
                                <b>{data.name}</b>
                            </Typography>
                            <Typography sx={style}>
                                Total Dues: <b>{data.dueDetails.count}</b>
                            </Typography>
                            <ListItemSecondaryAction sx={{ padding: '10px 30px' }}>
                                Total Amount: <b>{data.dueDetails.totalPayableAmount}</b>
                            </ListItemSecondaryAction>
                        </AccordionSummary>
                        {data.tripDetails.map((list: tripProp) => {
                            return (
                                <AccordionDetails
                                    sx={{ display: 'flex', borderBottom: '1px solid grey' }}
                                >
                                    <Typography sx={style}>{list.number}</Typography>
                                    <Typography sx={style}>{list.type} </Typography>
                                    <Typography sx={style}>{list.payableAmount} </Typography>
                                    <TextField
                                        sx={style}
                                        label="Transaction Id"
                                        variant="outlined"
                                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            handleTransactionIdChange(list.id, e.target.value)
                                        }
                                    />
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Payment Date"
                                            name="paymentDate"
                                            format="DD/MM/YYYY"
                                        />
                                    </LocalizationProvider>
                                    <Button
                                        sx={style}
                                        onClick={() => handleClick(list.id)}
                                        disabled={!transactionIds[list.id]}
                                    >
                                        Pay
                                    </Button>
                                </AccordionDetails>
                            )
                        })}
                    </Accordion>
                )
            })}
        </>
    )
}
export default BunkDues
