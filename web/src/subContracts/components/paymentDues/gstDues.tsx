import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useEffect, useState } from 'react'
import { getGstDues } from '../../services/paymentDues'
import { ListItemSecondaryAction } from '@mui/material'
import FormField from './formField'

interface tripProp {
    fuelId: number
    id: number
    vehicleNumber: string
    amount: number
    type: string
    transactionId: string
}
interface dataProp {
    name: string
    dueDetails: { count: number; payableAmount: number }
    tripDetails: tripProp[]
}
const GSTDues: React.FC = () => {
    const [gstDues, setGstDues] = useState([])
    const [refresh, setRefresh] = useState<boolean>(false)
    const style = { width: '100%', padding: '10px 10px 0px' }
    const accordianStyle = { display: 'flex', borderBottom: '1px solid grey' }
    useEffect(() => {
        getGstDues().then(setGstDues)
    }, [refresh])
    return (
        <>
            {gstDues &&
                gstDues.map((data: dataProp) => {
                    return (
                        <Accordion>
                            {accordionSummary(data, style)}
                            {data.tripDetails.map((list: tripProp) => {
                                return accordionDetails(
                                    accordianStyle,
                                    style,
                                    list,
                                    setRefresh,
                                    refresh
                                )
                            })}
                        </Accordion>
                    )
                })}
        </>
    )
}
export default GSTDues
function accordionDetails(
    accordianStyle: { display: string; borderBottom: string },
    style: { width: string; padding: string },
    list: tripProp,
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>,
    refresh: boolean
) {
    return (
        <AccordionDetails sx={accordianStyle}>
            <Typography sx={style}>
                <b>{list.vehicleNumber}</b>
            </Typography>
            <Typography sx={style}>{list.type} </Typography>
            <Typography sx={style}>{list.amount} </Typography>
            <FormField
                setRefresh={setRefresh}
                refresh={refresh}
                id={list.id}
                fuelId={0}
                type={list.type}
            />
        </AccordionDetails>
    )
}

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
                Total Amount: <b>{data.dueDetails.payableAmount}</b>
            </ListItemSecondaryAction>
        </AccordionSummary>
    )
}
