import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useEffect, useState } from 'react'
import { getGstDues } from '../../services/paymentDues'
import { ListItemSecondaryAction } from '@mui/material'
import FormField from './formField'
import SuccessDialog from '../../../commonUtils/SuccessDialog'

interface tripProp {
    id: number
    vehicleNumber: string
    type: string
    amount: number
}
interface dataProp {
    name: string
    dueDetails: { count: number; payableAmount: number }
    tripDetails: tripProp[]
}
const GSTPaymentDues: React.FC = () => {
    const [gstDues, setGstDues] = useState([])
    const [refresh, setRefresh] = useState<boolean>(false)
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
    const style = { width: '100%', padding: '10px 10px 0px' }
    const accordianStyle = { display: 'flex', borderBottom: '1px solid grey' }
    useEffect(() => {
        getGstDues(true).then(setGstDues)
    }, [refresh])
    return (
        <>
            {gstDues.length !== 0 ? (
                gstDues.map((data: dataProp) => {
                    return (
                        <Accordion key={data.name}>
                            {accordionSummary(data, style)}
                            {data.tripDetails.map((list: tripProp) => {
                                return (
                                    <AccordionDetails key={list.id} sx={accordianStyle}>
                                        <Typography sx={style}>
                                            <b>{list.vehicleNumber}</b>
                                        </Typography>
                                        <Typography sx={style}>{list.type} </Typography>
                                        <Typography sx={style}>{list.amount}</Typography>
                                        <FormField
                                            setRefresh={setRefresh}
                                            refresh={refresh}
                                            id={list.id}
                                            fuelId={list.id}
                                            type={list.type}
                                            payableAmount={list.amount}
                                            setOpenSuccessDialog={setOpenSuccessDialog}
                                        />
                                    </AccordionDetails>
                                )
                            })}
                        </Accordion>
                    )
                })
            ) : (
                <p style={{ textAlign: 'center' }}>No GST Payment Dues...!</p>
            )}
            <SuccessDialog
                open={openSuccessDialog}
                handleClose={() => setOpenSuccessDialog(false)}
                message={`GST pay has been made successfully!`}
            />
        </>
    )
}
export default GSTPaymentDues

function accordionSummary(data: dataProp, style: { width: string; padding: string }) {
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
