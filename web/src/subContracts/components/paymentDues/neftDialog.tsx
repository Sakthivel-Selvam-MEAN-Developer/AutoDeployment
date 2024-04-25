import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableCell,
    TableRow,
    TableBody
} from '@mui/material'
import React, { FC, MouseEventHandler, useEffect } from 'react'
import { NEFTDetailsProps } from './list'
import { gstNEFTDetailsProps } from './gstDues'

interface neftDialogProps {
    setActivate: React.Dispatch<React.SetStateAction<boolean>>
    NEFTDetails: NEFTDetailsProps[]
    gstNEFTDetails: gstNEFTDetailsProps[]
    handleDonwloadNEFT: MouseEventHandler<HTMLButtonElement>
    type: string
}

const OtherPays = (
    setAmount: React.Dispatch<React.SetStateAction<number>>,
    NEFTDetails: NEFTDetailsProps[]
) => {
    let amount = 0
    useEffect(() => {
        setAmount(amount)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [amount])
    return (
        <>
            {NEFTDetails.map((neft) => (
                <TableRow key={neft.id}>
                    <div style={{ display: 'none' }}>{(amount += neft.payableAmount)}</div>
                    <TableCell align="center">{neft.transporterName}</TableCell>
                    <TableCell align="center">{neft.vehicleNumber}</TableCell>
                    <TableCell align="center">{neft.location}</TableCell>
                    <TableCell align="center">{neft.type}</TableCell>
                    <TableCell align="center">{neft.invoiceNumber}</TableCell>
                    <TableCell align="center">{neft.date}</TableCell>
                    <TableCell align="center">
                        <b>{neft.payableAmount.toFixed(2)}</b>
                    </TableCell>
                </TableRow>
            ))}
        </>
    )
}

const GstPay = (
    setAmount: React.Dispatch<React.SetStateAction<number>>,
    gstNEFTDetails: gstNEFTDetailsProps[]
) => {
    let amount = 0
    useEffect(() => {
        setAmount(amount)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [amount])
    return (
        <>
            {gstNEFTDetails.map((neft) => (
                <TableRow key={neft.id}>
                    <div style={{ display: 'none' }}>{(amount += neft.payableAmount)}</div>
                    <TableCells neft={neft} />
                </TableRow>
            ))}
        </>
    )
}
interface tableCellProps {
    neft: gstNEFTDetailsProps
}
const TableCells: FC<tableCellProps> = ({ neft }) => {
    return (
        <>
            <TableCell align="center">{neft.transporterName}</TableCell>
            <TableCell align="center">{neft.vehicleNumber}</TableCell>
            <TableCell align="center">{neft.type}</TableCell>
            <TableCell align="center">
                <b>{neft.payableAmount.toFixed(2)}</b>
            </TableCell>
        </>
    )
}

const otherPayTableHeadCells = [
    'Transporter Name',
    'Vehicle Number',
    'Loading - Unloading Point',
    'Type',
    'Invoice Number',
    'Date',
    'Amount'
]

const gstPayTableHeadCells = ['Transporter Name', 'Vehicle Number', 'Type', 'Amount']

const otherPayTableCell = (name: string, type: string) => {
    return (
        <TableCell align="center" key={name}>
            {name === 'Loading - Unloading Point' && type === 'fuel pay' ? 'Location' : name}
        </TableCell>
    )
}
const otherPayTableHead = (type: string) => {
    return (
        <TableRow>{otherPayTableHeadCells.map((name) => otherPayTableCell(name, type))}</TableRow>
    )
}
const gstPayTableCell = (name: string) => {
    return (
        <TableCell align="center" key={name}>
            {name}
        </TableCell>
    )
}
const gstPayTableHead = () => {
    return <TableRow>{gstPayTableHeadCells.map((name) => gstPayTableCell(name))}</TableRow>
}

const NEFTDialog: FC<neftDialogProps> = ({
    setActivate,
    NEFTDetails,
    handleDonwloadNEFT,
    gstNEFTDetails,
    type
}) => {
    const [open, setOpen] = React.useState(true)
    const [amount, setAmount] = React.useState(0)
    const descriptionElementRef = React.useRef<HTMLElement>(null)
    const handleClose = () => {
        setActivate(false)
        setOpen(false)
    }
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef
            if (descriptionElement !== null) descriptionElement.focus()
        }
    }, [open])
    useEffect(() => {
        // if()
    }, [])
    return (
        <Dialog
            maxWidth={'xl'}
            open={open}
            onClose={handleClose}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle id="scroll-dialog-title">NEFT File Preview</DialogTitle>
            <DialogContent>
                <DialogContentText
                    id="scroll-dialog-description"
                    ref={descriptionElementRef}
                    tabIndex={-1}
                >
                    <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
                        <Table sx={{ minWidth: 1200 }} aria-label="simple table">
                            <TableHead sx={{ background: '#00000029' }}>
                                {type !== 'gst pay'
                                    ? otherPayTableHead(NEFTDetails[0].type)
                                    : gstPayTableHead()}
                            </TableHead>
                            <TableBody>
                                {type !== 'gst pay'
                                    ? OtherPays(setAmount, NEFTDetails)
                                    : GstPay(setAmount, gstNEFTDetails)}
                                <TableRow>
                                    <TableCell align="right" colSpan={type !== 'gst pay' ? 6 : 3}>
                                        Total Payable Amount
                                    </TableCell>
                                    <TableCell align="center">
                                        <b>{amount.toFixed(2)}</b>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="outlined" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleDonwloadNEFT}>
                    Generate File
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default NEFTDialog
