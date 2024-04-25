import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useContext, useEffect, useState } from 'react'
import { getOnlyActiveDues } from '../../services/paymentDues'
import FormField from './formField'
import { epochToMinimalDate } from '../../../commonUtils/epochToTime'
import SuccessDialog from '../../../commonUtils/SuccessDialog'
import { paymentDueContext } from './paymentDueContext'

interface tripProp {
    fuelId: number
    dueDate: number
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
interface paymentDuesProps {
    type: string
}
const PaymentDues: React.FC<paymentDuesProps> = ({ type }) => {
    const [transporterDue, setTransporterDue] = useState([])
    const [refresh, setRefresh] = useState<boolean>(false)
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
    const paymentDueDateEpoch = useContext(paymentDueContext)
    const style = { width: '100%', padding: '10px 10px 0px' }
    const accordianStyle = { display: 'flex', borderBottom: '1px solid grey', alignItems: 'center' }
    useEffect(() => {
        getOnlyActiveDues(paymentDueDateEpoch, true, type).then(setTransporterDue)
    }, [refresh, type, paymentDueDateEpoch])
    return (
        <>
            {transporterDue.length !== 0 ? (
                transporterDue.map((data: dataProp) => {
                    return (
                        <Accordion key={data.name}>
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
                                    Total Trips : <b>{data.dueDetails.count}</b>
                                </Typography>
                                <Typography sx={style}>
                                    Total Amount :
                                    <b>{data.dueDetails.totalPayableAmount.toFixed(2)}</b>
                                </Typography>
                            </AccordionSummary>
                            {data.tripDetails &&
                                data.tripDetails.map((list: tripProp) => {
                                    return (
                                        <AccordionDetails key={list.id} sx={accordianStyle}>
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
                                                {epochToMinimalDate(list.dueDate)}
                                            </Typography>
                                            <Typography sx={style}>
                                                {epochToMinimalDate(list.date)}
                                            </Typography>
                                            <FormField
                                                setRefresh={setRefresh}
                                                refresh={refresh}
                                                id={list.id}
                                                fuelId={list.fuelId}
                                                type={list.type}
                                                payableAmount={list.payableAmount}
                                                setOpenSuccessDialog={setOpenSuccessDialog}
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
            <SuccessDialog
                open={openSuccessDialog}
                handleClose={() => setOpenSuccessDialog(false)}
                message={`${type} has been made successfully!`}
            />
        </>
    )
}
export default PaymentDues
