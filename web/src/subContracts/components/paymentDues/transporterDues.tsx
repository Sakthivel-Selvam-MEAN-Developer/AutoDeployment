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

const TransporterDues: React.FC = () => {
    const [transporterDue, setTransporterDue] = useState([])
    const [refresh, setRefresh] = useState<boolean>(false)
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
        invoiceNumber: string
        fuelInvoiceNumber: string
        date: number
    }
    const style = { width: '100%', padding: '10px 10px 0px' }
    useEffect(() => {
        const todayDate = dayjs().startOf('day').unix()
        getOnlyActiveDues(todayDate).then(setTransporterDue)
    }, [refresh])
    return (
        <>
            {transporterDue.map((data: dataProp) => {
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
                                Total Trips: <b>{data.dueDetails.count}</b>
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
                                    <Typography sx={style}>
                                        <b>{list.number}</b>
                                    </Typography>
                                    <Typography sx={style}>
                                        {list.loadingPoint} - {list.unloadingPoint}
                                    </Typography>
                                    <Typography sx={style}>{list.type} </Typography>
                                    <Typography sx={style}>{list.payableAmount} </Typography>
                                    {list.type !== 'fuel pay' && (
                                        <Typography sx={style}>{list.invoiceNumber} </Typography>
                                    )}
                                    {list.type !== 'fuel pay' && (
                                        <Typography sx={style}>
                                            {epochToMinimalDate(list.date)}{' '}
                                        </Typography>
                                    )}
                                    <FormField
                                        setRefresh={setRefresh}
                                        refresh={refresh}
                                        id={list.id}
                                    />
                                </AccordionDetails>
                            )
                        })}
                    </Accordion>
                )
            })}
        </>
    )
}
export default TransporterDues
