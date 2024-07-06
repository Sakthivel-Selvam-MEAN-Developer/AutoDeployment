import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { FC, useContext, useEffect, useState } from 'react'
import { getOnlyActiveDues } from '../../services/paymentDues'
import {
    Checkbox,
    ListItemSecondaryAction,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material'
import { epochToMinimalDate } from '../../../commonUtils/epochToTime'
import { NEFTDetailsProps, bankDetailsProps } from './list'
import { paymentDueContext } from './paymentDueContext'

interface tripProp {
    id: number
    dueDate: number
    number: string
    loadingPoint: string
    unloadingPoint: string
    payableAmount: number
    type: string
    transactionId: string
    invoiceNumber: string
    fuelInvoiceNumber: string
    date: number
    tripId: number
    location: string
}
interface dataProp {
    name: string
    dueDetails: { count: number; totalPayableAmount: number }
    tripDetails: tripProp[]
    bankDetails: bankDetailsProps[]
}
export interface GenerateFormProps {
    NEFTDetails: NEFTDetailsProps[]
    setNEFTDetails: React.Dispatch<React.SetStateAction<NEFTDetailsProps[]>>
    paymentDueId: number[]
    refresh: boolean
    setPaymentDueId: React.Dispatch<React.SetStateAction<number[]>>
    type: string
}
interface ObjectProps {
    id: number
    bankDetails: bankDetailsProps[]
    type: string
    payableAmount: number
    vehicleNumber: string
    date: string
    location: string
    invoiceNumber: string
    transporterName: string
}
const style = { width: '100%' }
const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
const GenerateForm: React.FC<GenerateFormProps> = ({
    NEFTDetails,
    setNEFTDetails,
    paymentDueId,
    setPaymentDueId,
    refresh,
    type
}) => {
    const [transporterDue, setTransporterDue] = useState([])
    const paymentDueDate = useContext(paymentDueContext)
    const accordianStyle = {
        display: 'table',
        borderBottom: '1px solid grey',
        alignItems: 'center',
        width: '100%'
    }
    useEffect(() => {
        setNEFTDetails([])
        setPaymentDueId([])
    }, [])
    useEffect(() => {
        getOnlyActiveDues(paymentDueDate, false, type)
            .then(setTransporterDue)
            .then(() => setNEFTDetails([]))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh, paymentDueDate])
    const handleClick = (list: tripProp, data: dataProp) => {
        const object = {
            id: list.id,
            bankDetails: data.bankDetails,
            type: list.type,
            payableAmount: list.payableAmount,
            vehicleNumber: list.number,
            date: epochToMinimalDate(list.date),
            location:
                list.type === 'fuel pay'
                    ? list.location
                    : `${list.loadingPoint} - ${list.unloadingPoint}`,
            invoiceNumber: list.invoiceNumber,
            transporterName: data.name
        }
        addNEFTDetails(object)
    }
    const addNEFTDetails = (object: ObjectProps) => {
        if (NEFTDetails.find((detail) => detail.id === object.id)) {
            setNEFTDetails(NEFTDetails.filter((detail) => detail.id !== object.id))
            setPaymentDueId(paymentDueId.filter((id) => id !== object.id))
        } else {
            setNEFTDetails((prevDetails) => [...prevDetails, object])
            setPaymentDueId((prevId) => [...prevId, object.id])
        }
    }
    return (
        <>
            {transporterDue && transporterDue.length !== 0 ? (
                transporterDue.map((data: dataProp) => {
                    return (
                        <Accordion key={data.name}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                sx={{ borderBottom: '1px solid grey' }}
                            >
                                <AccordianHead data={data} />
                            </AccordionSummary>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <AccordionDetails sx={accordianStyle}>
                                        <TableHeadRow type={type} />
                                        <TableBody>
                                            {data.tripDetails &&
                                                data.tripDetails.length !== 0 &&
                                                data.tripDetails.map((list: tripProp) => {
                                                    return (
                                                        <TableRow key={list.id}>
                                                            <TableCell align="center">
                                                                <Typography>
                                                                    <Checkbox
                                                                        key={list.id}
                                                                        onClick={() =>
                                                                            handleClick(list, data)
                                                                        }
                                                                        {...label}
                                                                    />
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                <Typography sx={style}>
                                                                    <b>{list.number}</b>
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                <Typography sx={style}>
                                                                    {epochToMinimalDate(list.date)}
                                                                </Typography>
                                                            </TableCell>
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
                                                                    {list.type}
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
                                                            {type !== 'fuel pay' && (
                                                                <TableCell align="left">
                                                                    <Typography sx={style}>
                                                                        {epochToMinimalDate(
                                                                            list.dueDate
                                                                        )}
                                                                    </Typography>
                                                                </TableCell>
                                                            )}
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
                <p style={{ textAlign: 'center' }}>No Dues to Generate NEFT File...!</p>
            )}
        </>
    )
}
export default GenerateForm
interface tableHeadRowProps {
    type: string
}
const TableHeadRow: FC<tableHeadRowProps> = ({ type }) => {
    return (
        <TableHead>
            <TableRow>
                <TableCell align="center">#</TableCell>
                <TableCell align="left">Vehicle Number</TableCell>
                <TableCell align="left">Start Date</TableCell>
                <TableCell align="left">Trip Route</TableCell>
                <TableCell align="left">Payment Type</TableCell>
                <TableCell align="left">Payable Amount</TableCell>
                <TableCell align="left">Invoice Number</TableCell>
                {type !== 'fuel pay' && <TableCell align="left">Due Date</TableCell>}
            </TableRow>
        </TableHead>
    )
}
interface AccordianHeadProps {
    data: dataProp
}
const AccordianHead: React.FC<AccordianHeadProps> = ({ data }) => {
    return (
        <>
            <Typography sx={{ padding: '10px', width: '350px' }}>
                <b>{data.name}</b>
            </Typography>
            <Typography sx={style} display={'flex'} alignItems={'center'}>
                Total Trips: <b>{data.dueDetails.count}</b>
            </Typography>
            <ListItemSecondaryAction sx={{ padding: '10px 30px' }}>
                Total Amount:
                <b>{data.dueDetails.totalPayableAmount.toFixed(2)}</b>
            </ListItemSecondaryAction>
        </>
    )
}
