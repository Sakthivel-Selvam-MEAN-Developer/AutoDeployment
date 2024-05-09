import { Button, TableCell, TextField } from '@mui/material'
import { FC, useState } from 'react'
import { epochToMinimalDate } from '../../../commonUtils/epochToTime'
import { updateTransporterInvoice } from '../../services/transporterInvoice'
import { GetCellsProps, textCellProps, TextFieldContainerProps } from './type'

export const GetCells: FC<GetCellsProps> = ({ trip, id, setTripDetails }) => {
    return (
        <>
            <TableCell align="left">1</TableCell>
            <TableCell align="left">{trip?.truck.vehicleNumber}</TableCell>
            <TableCell align="left">{trip && epochToMinimalDate(trip.startDate)}</TableCell>
            <TableCell align="left">{trip?.loadingPoint.name}</TableCell>
            <TableCell align="left">{trip?.loadingPoint.name}</TableCell>
            <TableCell align="left">{trip?.invoiceNumber}</TableCell>
            <TableCell align="left">{trip?.truck.transporter.name}</TableCell>
            <TableCell align="left">{trip?.truck.transporter.csmName}</TableCell>
            <TextFieldContainer id={id} setTripDetails={setTripDetails} />
        </>
    )
}
const TextFieldContainer: FC<TextFieldContainerProps> = ({ id, setTripDetails }) => {
    const [invoice, setInvoice] = useState('')
    const onSubmit = () => {
        if (invoice === '') return
        updateTransporterInvoice({ invoice, id }).then((Tripid) => {
            setInvoice('')
            setTripDetails((tripData) => tripData.filter((trip) => trip.id !== Tripid.id))
        })
    }
    return <TextFieldCell invoice={invoice} setInvoice={setInvoice} onSubmit={onSubmit} />
}
const TextFieldCell: FC<textCellProps> = ({ invoice, setInvoice, onSubmit }) => {
    return (
        <>
            <TableCell align="left">
                <TextField
                    label="Invoice Number"
                    value={invoice}
                    onChange={(event) => setInvoice(event.target.value)}
                />
            </TableCell>
            <TableCell align="left">
                <Button onClick={onSubmit}>Submit</Button>
            </TableCell>
        </>
    )
}
