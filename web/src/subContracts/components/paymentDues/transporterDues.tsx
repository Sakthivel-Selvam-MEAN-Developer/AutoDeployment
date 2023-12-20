import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useEffect, useState } from 'react'
import { getOnlyActiveDues, listTripWithActiveDues } from '../../services/paymentDues'
import { ListItemSecondaryAction } from '@mui/material'
const TransporterDues: React.FC = () => {
    const [transporterDue, setTransporterDue] = useState([])
    const [tripByDue, setTripByDue] = useState([])
    type dataProp = {
        name: string
        _count: { tripId: number }
        _sum: { payableAmount: number }
    }
    const style = { padding: '10px 100px ' }
    const handleAccordionClick = (name: string) => listTripWithActiveDues(name).then(setTripByDue)
    useEffect(() => {
        getOnlyActiveDues().then(setTransporterDue)
    }, [])
    return (
        <>
            {transporterDue.map((data: dataProp) => {
                return (
                    <Accordion onClick={() => handleAccordionClick(data.name)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            sx={{ borderBottom: ' 1px solid grey' }}
                        >
                            <Typography sx={{ padding: '10px' }}>
                                <b>{data.name}</b>
                            </Typography>
                            <Typography sx={style}>
                                Total Trips: <b>{data._count.tripId}</b>
                            </Typography>
                            <ListItemSecondaryAction sx={{ padding: '10px 30px' }}>
                                Total Amount: <b>{data._sum.payableAmount}</b>
                            </ListItemSecondaryAction>
                        </AccordionSummary>
                        {tripByDue.map(
                            (data: { tripId: number; type: string; payableAmount: number }) => {
                                return (
                                    <AccordionDetails
                                        sx={{ display: 'flex', borderBottom: ' 1px solid grey' }}
                                    >
                                        <Typography sx={style}> {data.tripId} </Typography>
                                        <Typography sx={style}> {data.type} </Typography>
                                        <Typography sx={style}> {data.payableAmount} </Typography>
                                    </AccordionDetails>
                                )
                            }
                        )}
                    </Accordion>
                )
            })}
        </>
    )
}
export default TransporterDues
