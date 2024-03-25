import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useEffect, useState } from 'react'
import { getOnlyActiveDues } from '../../services/paymentDues'
import { ListItemSecondaryAction } from '@mui/material'
import dayjs from 'dayjs'
import FormField from './formField'
import { epochToMinimalDate } from '../../../commonUtils/epochToTime'

interface tripProp {
    fuelId: number
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
    location: string
}
interface dataProp {
    name: string
    dueDetails: { count: number; totalPayableAmount: number }
    tripDetails: tripProp[]
}
const PaymentDues: React.FC = () => {
    const [transporterDue, setTransporterDue] = useState([])
    const [refresh, setRefresh] = useState<boolean>(false)
    const style = { width: '100%', padding: '10px 10px 0px' }
    const accordianStyle = { display: 'flex', borderBottom: '1px solid grey' }
    useEffect(() => {
        const todayDate = dayjs().startOf('day').unix()
        getOnlyActiveDues(todayDate, true).then(setTransporterDue)
    }, [refresh])
    return (
        <>
            {transporterDue.length !== 0 ? (
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
                                    Total Amount:{' '}
                                    <b>{data.dueDetails.totalPayableAmount.toFixed(2)}</b>
                                </ListItemSecondaryAction>
                            </AccordionSummary>
                            {data.tripDetails &&
                                data.tripDetails.map((list: tripProp) => {
                                    return (
                                        <AccordionDetails sx={accordianStyle}>
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
                                            <Typography sx={style}>
                                                {list.payableAmount}{' '}
                                            </Typography>
                                            <Typography sx={style}>{list.invoiceNumber}</Typography>
                                            <Typography sx={style}>
                                                {epochToMinimalDate(list.date)}
                                            </Typography>
                                            <FormField
                                                setRefresh={setRefresh}
                                                refresh={refresh}
                                                id={list.id}
                                                fuelId={list.fuelId}
                                                type={list.type}
                                            />
                                        </AccordionDetails>
                                    )
                                })}
                        </Accordion>
                    )
                })
            ) : (
                <p style={{ textAlign: 'center' }}>No Payment Deus...!</p>
            )}
        </>
    )
}
export default PaymentDues
