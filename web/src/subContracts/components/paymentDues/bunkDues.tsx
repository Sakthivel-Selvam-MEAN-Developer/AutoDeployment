import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Button, ListItemSecondaryAction, TextField } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { getOnlyActiveDues, updatePaymentDues } from '../../services/paymentDues'
const BunkDues: React.FC = () => {
    const [bunkDue, setBunkDue] = useState([])
    const [transactionId, setTransactionId] = useState<string>()
    const style = { width: '100%', padding: '10px 10px 0px' }
    type dataProp = {
        name: string
        dueDetails: { count: number; totalPayableAmount: number }
        tripDetails: tripProp[]
    }
    type tripProp = {
        id: number
        vehicleNumber: string
        loadingPoint: string
        unloadingPoint: string
        payableAmount: number
        type: string
        transactionId: string
        stationLocation: {
            fuelStation: {
                location: string
            }
        }
    }
    const handleClick = (id: number) => {
        const data = {
            id,
            transactionId,
            paidAt: dayjs().unix()
        }
        updatePaymentDues(data).then(() => console.log('Success'))
    }
    useEffect(() => {
        const todayDate = dayjs().startOf('day').unix()
        getOnlyActiveDues(todayDate, 'fuel pay').then(setBunkDue)
    }, [])

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
                                    <Typography sx={style}>{list.vehicleNumber}</Typography>
                                    <Typography sx={style}>
                                        {list.stationLocation.fuelStation.location}
                                    </Typography>
                                    <Typography sx={style}>{list.type} </Typography>
                                    <Typography sx={style}>{list.payableAmount} </Typography>
                                    <TextField
                                        sx={style}
                                        label="Transaction Id"
                                        variant="outlined"
                                        value={transactionId}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            setTransactionId(e.target.value)
                                        }
                                    />
                                    <Button sx={style} onClick={() => handleClick(list.id)}>
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
