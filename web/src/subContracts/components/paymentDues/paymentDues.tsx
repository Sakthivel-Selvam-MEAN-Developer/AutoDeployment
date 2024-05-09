import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { FC, useContext, useEffect, useState } from 'react'
import { getOnlyActiveDues } from '../../services/paymentDues'
import { epochToMinimalDate } from '../../../commonUtils/epochToTime'
import SuccessDialog from '../../../commonUtils/SuccessDialog'
import { paymentDueContext } from './paymentDueContext'
import {
    TableContainer,
    Paper,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableHead,
    ListItemSecondaryAction
} from '@mui/material'
import FormField from './formField'

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
    const style = { width: '100%' }
    const accordianStyle = {
        width: '100%',
        display: 'table',
        borderBottom: '1px solid grey',
        alignItems: 'center'
    }
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
                                <TransporterName name={data.name} />
                                <TransporterTotalTrips totalTrips={data.dueDetails.count} />
                                <TransporterPayableAmount
                                    totalPayableAmount={data.dueDetails.totalPayableAmount}
                                />
                            </AccordionSummary>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="payment due table">
                                    <AccordionDetails sx={accordianStyle}>
                                        <TableHeadRow type={type} />
                                        <TableBody>
                                            {data.tripDetails &&
                                                data.tripDetails.length !== 0 &&
                                                data.tripDetails.map((list: tripProp) => {
                                                    return (
                                                        <TableRow key={list.id}>
                                                            <TableCell align="left">
                                                                <Typography sx={style}>
                                                                    <b>{list.number}</b>
                                                                </Typography>
                                                            </TableCell>
                                                            {type !== 'fuel pay' && (
                                                                <TableCell align="left">
                                                                    <Typography sx={style}>
                                                                        {epochToMinimalDate(
                                                                            list.date
                                                                        )}
                                                                    </Typography>
                                                                </TableCell>
                                                            )}
                                                            <TableCell align="left">
                                                                <Typography sx={style}>
                                                                    {list.type !== 'fuel pay'
                                                                        ? list.loadingPoint +
                                                                          ' - ' +
                                                                          list.unloadingPoint
                                                                        : list.location}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                <Typography sx={style}>
                                                                    {list.type}{' '}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                <Typography sx={style}>
                                                                    {list.payableAmount}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                <Typography sx={style}>
                                                                    {list.invoiceNumber}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                <Typography sx={style}>
                                                                    {epochToMinimalDate(
                                                                        list.dueDate
                                                                    )}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                <FormField
                                                                    setRefresh={setRefresh}
                                                                    refresh={refresh}
                                                                    id={list.id}
                                                                    fuelId={list.fuelId}
                                                                    type={list.type}
                                                                    payableAmount={
                                                                        list.payableAmount
                                                                    }
                                                                    setOpenSuccessDialog={
                                                                        setOpenSuccessDialog
                                                                    }
                                                                />
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                })}
                                        </TableBody>
                                    </AccordionDetails>
                                </Table>
                            </TableContainer>
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
interface tableHeadRowProps {
    type: string
}
const TableHeadRow: FC<tableHeadRowProps> = ({ type }) => {
    return (
        <TableHead>
            <TableRow>
                <TableCell align="left">Vehicle Number</TableCell>
                <TableCell align="left">Start Date</TableCell>
                <TableCell align="left">Trip Route</TableCell>
                <TableCell align="left">Payment Type</TableCell>
                <TableCell align="left">Payable Amount</TableCell>
                <TableCell align="left">Invoice Number</TableCell>
                {type !== 'fuel pay' && <TableCell align="left">Due Date</TableCell>}
                <TableCell align="left" sx={{ paddingLeft: '25px' }}>
                    Payment Date & Transaction ID
                </TableCell>
            </TableRow>
        </TableHead>
    )
}
interface TransporterNameProps {
    name: string
}
const TransporterName: FC<TransporterNameProps> = ({ name }) => {
    return (
        <Typography sx={{ padding: '10px', width: '350px' }}>
            <b>{name}</b>
        </Typography>
    )
}
interface TransporterTotalTripsProps {
    totalTrips: number
}
const TransporterTotalTrips: FC<TransporterTotalTripsProps> = ({ totalTrips }) => {
    return (
        <Typography sx={{ width: '100%' }} display={'flex'} alignItems={'center'}>
            Total Trips : <b>{totalTrips}</b>
        </Typography>
    )
}
interface TransporterPayableAmountProps {
    totalPayableAmount: number
}
const TransporterPayableAmount: FC<TransporterPayableAmountProps> = ({ totalPayableAmount }) => {
    return (
        <ListItemSecondaryAction sx={{ padding: '10px 30px' }}>
            Total Amount:
            <b>{totalPayableAmount.toFixed(2)}</b>
        </ListItemSecondaryAction>
    )
}
