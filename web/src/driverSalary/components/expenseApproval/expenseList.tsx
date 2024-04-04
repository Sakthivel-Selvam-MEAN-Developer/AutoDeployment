import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@mui/material'
import React, { ReactElement, useEffect, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Paper from '@mui/material/Paper'
import { getAllExpenseByTripIdForApproval } from '../../services/expenses'
interface tripDataProps {
    tripExpenses: expenseDetailsProps[]
}
interface expenseDetailsProps {
    expenseType: string
    amount: number
}
interface ExpenseTableBodyProps {
    expenseDetails: expenseDetailsProps[]
}
const ExpenseList: React.FC = (): ReactElement => {
    const [userExpenseDetails, setUserExpenseDetails] = useState([])
    const accordianStyle = { display: 'flex', borderBottom: '1px solid grey' }
    useEffect(() => {
        getAllExpenseByTripIdForApproval().then(setUserExpenseDetails)
    }, [])
    return (
        <>
            {userExpenseDetails.length !== 0 &&
                userExpenseDetails.map((tripData: tripDataProps) => {
                    return (
                        <Accordion>
                            {expenseAccordionSummary()}
                            <AccordionDetails sx={accordianStyle}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Table
                                        sx={{ width: 1100 }}
                                        component={Paper}
                                        aria-label="simple table"
                                    >
                                        <br />
                                        {expenseTableHead()}
                                        <ExpenseTableBody expenseDetails={tripData.tripExpenses} />
                                    </Table>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    )
                })}
        </>
    )
}
export default ExpenseList

const style = { width: '100%', padding: '10px 10px 0px' }

function ExpenseTableBody({ expenseDetails }: ExpenseTableBodyProps) {
    const [rejectionMessage, setRejectionMessage] = useState('')
    return (
        <TableBody>
            {expenseDetails.map((expense: expenseDetailsProps) => {
                return (
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>{expense.expenseType}</TableCell>
                        <TableCell>{expense.amount}</TableCell>
                        <TableCell>{formfield(rejectionMessage, setRejectionMessage)}</TableCell>
                        <TableCell>
                            <Button>Reject</Button>
                        </TableCell>
                        <TableCell>
                            <Button>Approve</Button>
                        </TableCell>
                    </TableRow>
                )
            })}
        </TableBody>
    )
}

function formfield(
    rejectionMessage: string,
    setRejectionMessage: React.Dispatch<React.SetStateAction<string>>
) {
    return (
        <TextField
            value={rejectionMessage}
            label="Enter Rejection Reason"
            name="rejectionReason"
            variant="outlined"
            onChange={(e) => setRejectionMessage(e.target.value)}
            sx={{ width: '200px', margin: '0 10px' }}
        />
    )
}

function expenseTableHead() {
    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    <b> Expense Type</b>
                </TableCell>
                <TableCell>
                    <b> Expense Amount</b>
                </TableCell>
                <TableCell>
                    <b> Message</b>
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
            </TableRow>
        </TableHead>
    )
}

function expenseAccordionSummary() {
    return (
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{ borderBottom: '1px solid grey' }}
        >
            <Typography sx={style}>
                Name:<b> Sakthi Vel</b>
            </Typography>
            <Typography sx={style}>
                Invoice Number:<b>ABCD1234</b>
            </Typography>
            <Typography sx={style}>
                Loading Point:<b> Salem</b>
            </Typography>
            <Typography sx={style}>
                Start date:<b>03/04/2024</b>
            </Typography>
        </AccordionSummary>
    )
}
