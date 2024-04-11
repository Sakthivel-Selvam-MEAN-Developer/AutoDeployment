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
import React, { ChangeEvent, FC, ReactElement, useEffect, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Paper from '@mui/material/Paper'
import { getAllExpenseByTripIdForApproval } from '../../services/expenses'
import { AutoCompleteWithValue } from '../../../form/AutoCompleteWithValue'
import { FieldValues, useForm } from 'react-hook-form'
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

const AutoComplete = (
    setReason: React.Dispatch<React.SetStateAction<string>>,
    approvalType: string | null,
    setApprovalType: React.Dispatch<React.SetStateAction<string | null>>
) => {
    const { control } = useForm<FieldValues>()
    return (
        <AutoCompleteWithValue
            value={approvalType === null ? '' : approvalType}
            control={control}
            fieldName="Approval Type"
            label="Approval Type"
            options={['Acceptable', 'Rejectable']}
            onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                setApprovalType(newValue)
                setReason('')
            }}
        />
    )
}

const style = { width: '100%', padding: '10px 10px 0px' }

const button = (reason: string, approvalType: string | null) => {
    return (
        <TableCell>
            <Button disabled={reason === '' && approvalType === 'Rejectable'}>Submit</Button>
        </TableCell>
    )
}

function ExpenseTableBody({ expenseDetails }: ExpenseTableBodyProps) {
    return (
        <TableBody>
            {expenseDetails.map((expense: expenseDetailsProps) => {
                return tableRow(expense)
            })}
        </TableBody>
    )
}

const RejectionReason: FC = () => {
    const [approvalType, setApprovalType] = useState<string | null>('')
    const [reason, setReason] = useState('')
    return (
        <>
            {tableCell(reason, setReason, approvalType, setApprovalType)}
            {button(reason, approvalType)}
        </>
    )
}
type tablecellTypes = (
    reason: string,
    setReason: React.Dispatch<React.SetStateAction<string>>,
    approvalType: string | null,
    setApprovalType: React.Dispatch<React.SetStateAction<string | null>>
) => ReactElement
const tableCell: tablecellTypes = (reason, setReason, approvalType, setApprovalType) => {
    return (
        <>
            <TableCell>{AutoComplete(setReason, approvalType, setApprovalType)}</TableCell>
            <TableCell>{formfield(reason, setReason, approvalType)}</TableCell>
        </>
    )
}

function tableRow(expense: expenseDetailsProps) {
    return (
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell>{expense.expenseType}</TableCell>
            <TableCell>{expense.amount}</TableCell>
            <RejectionReason />
        </TableRow>
    )
}

function formfield(
    reason: string,
    setReason: React.Dispatch<React.SetStateAction<string>>,
    approvalType: string | null
) {
    return (
        <TextField
            disabled={approvalType === 'Acceptable'}
            value={reason}
            label="Enter Rejection Reason"
            name="rejectionReason"
            variant="outlined"
            onChange={(e) => setReason(e.target.value)}
            sx={{ width: '200px', margin: '0 10px' }}
        />
    )
}

const expensesType = (
    <TableCell>
        <b> Expense Type</b>
    </TableCell>
)
const expensesAmountAndMessage = (
    <>
        <TableCell>
            <b> Expense Amount</b>
        </TableCell>
        <TableCell>
            <b> Message</b>
        </TableCell>
    </>
)

const tableHeadRow = (
    <TableRow>
        {expensesType}
        {expensesAmountAndMessage}
        <TableCell></TableCell>
        <TableCell></TableCell>
    </TableRow>
)

function expenseTableHead() {
    return <TableHead>{tableHeadRow}</TableHead>
}

function expenseAccordionSummary() {
    return (
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
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
