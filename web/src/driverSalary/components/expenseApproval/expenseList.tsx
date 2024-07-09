import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    TextField,
    Typography
} from '@mui/material'
import React, { ChangeEvent, FC, ReactElement, useEffect, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { updateExpenseApproval } from '../../services/expenses'
import { AutoCompleteWithValue } from '../../../form/AutoCompleteWithValue'
import { Control, FieldValues, useForm } from 'react-hook-form'
import { ExpenseAccordionSummaryProps, expense, expenseApprovalProps, props, trips } from './types'
import { epochToMinimalDate } from '../../../commonUtils/epochToTime'
const divStyle = {
    display: 'flex',
    width: '100%',
    padding: '10px 0 0 0'
}
const ExpenseList: props = (expensesForApproval, setReload, reload) => {
    const { control } = useForm<FieldValues>()
    const accordianStyle = { display: 'flex', borderBottom: '1px solid grey' }
    return (
        <>
            {expensesForApproval.length !== 0 ? (
                expensesForApproval.map((tripData: expenseApprovalProps, index) => {
                    return (
                        <Accordion key={index} sx={{ marginTop: '20px' }}>
                            <AccordianSummaryField tripData={tripData} />
                            {AccordionField(accordianStyle, tripData, control, setReload, reload)}
                        </Accordion>
                    )
                })
            ) : (
                <p>No Expense for Approval..!</p>
            )}
        </>
    )
}
export default ExpenseList
interface Props {
    setReason: React.Dispatch<React.SetStateAction<string>>
    approvalType: string | null
    setApprovalType: React.Dispatch<React.SetStateAction<string | null>>
    control: Control
}
const AutoComplete: FC<Props> = ({ setReason, approvalType, setApprovalType, control }) => {
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

const getTrip = (trip: trips) => {
    return trip.loadingPointToStockPointTrip !== null
        ? trip.loadingPointToStockPointTrip
        : trip.loadingPointToUnloadingPointTrip
}

const style = { width: '100%', padding: '10px 10px 0px' }

const ExpenseAccordionSummary: FC<ExpenseAccordionSummaryProps> = ({ trip }) => {
    const driverTrip = getTrip(trip)
    const unloadingPoint =
        trip.loadingPointToStockPointTrip !== null
            ? trip.loadingPointToStockPointTrip?.stockPointToUnloadingPointTrip[0].unloadingPoint
                  .name
            : trip.loadingPointToUnloadingPointTrip?.unloadingPoint.name
    return (
        <>
            <Typography sx={style}>
                <b>{trip?.truck.vehicleNumber}</b>
            </Typography>
            <Typography sx={style}>{driverTrip?.invoiceNumber}</Typography>
            <Typography sx={style}>
                {`${driverTrip?.loadingPoint.name} - ${unloadingPoint}`}
            </Typography>
            <Typography sx={style}>{epochToMinimalDate(driverTrip?.startDate || 0)}</Typography>
        </>
    )
}
interface approvalProps {
    expense: expense
    control: Control
    setReload: React.Dispatch<React.SetStateAction<boolean>>
    reload: boolean
}
const ExpenseApprovalFormFields: FC<approvalProps> = ({ expense, control, setReload, reload }) => {
    const [reason, setReason] = useState('')
    const [acceptedExpense, setAcceptedExpense] = useState<number>(0)
    const [approvalType, setApprovalType] = useState<string | null>('')
    const [disabled, setDisabled] = useState<boolean>(true)
    const handleExpenseApproval = async () => {
        const expenseApproval = {
            acceptedAmount: approvalType === 'Acceptable' ? expense.placedAmount : acceptedExpense,
            rejectableReason: reason
        }
        await updateExpenseApproval(expenseApproval, expense.id).then(() => setReload(!reload))
    }
    useEffect(() => {
        if (approvalType === 'Acceptable') setDisabled(false)
        else if (approvalType === 'Rejectable' && reason !== '' && acceptedExpense !== 0)
            setDisabled(false)
        else setDisabled(true)
    }, [approvalType, reason, acceptedExpense])
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '10px'
            }}
        >
            <div style={{ flex: 1 }}>
                <Typography>{expense.expenseType}</Typography>
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
                <Typography>{`\u20B9 ${expense.placedAmount}`}</Typography>
            </div>
            <div style={{ flex: 1 }}>
                <AutoComplete
                    setReason={setReason}
                    approvalType={approvalType}
                    setApprovalType={setApprovalType}
                    control={control}
                />
            </div>
            <div style={{ flex: 1 }}>
                <TextField
                    disabled={approvalType === 'Acceptable'}
                    type="text"
                    value={reason}
                    label="Enter Rejection Reason"
                    name="rejectionReason"
                    variant="outlined"
                    onChange={(e) => setReason(e.target.value)}
                    sx={{ width: '300px', margin: '0 10px' }}
                />
            </div>
            <div style={{ flex: 1 }}>
                <TextField
                    disabled={approvalType === 'Acceptable'}
                    type="number"
                    value={acceptedExpense}
                    label="Enter Modified Expense Amount"
                    name="modifiedExpense"
                    variant="outlined"
                    inputProps={{ step: 1, min: 0 }}
                    onChange={(e) => {
                        if (parseInt(e.target.value) === 0 || e.target.value === '')
                            setAcceptedExpense(0)
                        else setAcceptedExpense(parseInt(e.target.value))
                    }}
                    sx={{ width: '300px', margin: '0 10px' }}
                />
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
                <Button disabled={disabled} onClick={handleExpenseApproval}>
                    Submit
                </Button>
            </div>
        </div>
    )
}
const AccordianSummaryField: FC<{ tripData: expenseApprovalProps }> = ({ tripData }) => {
    return (
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id="panel1a-header"
            sx={{ borderBottom: '1px solid grey' }}
        >
            <ExpenseAccordionSummary trip={tripData.trip} />
        </AccordionSummary>
    )
}
type type = (
    accordianStyle: { display: string; borderBottom: string },
    tripData: expenseApprovalProps,
    control: Control,
    setReload: React.Dispatch<React.SetStateAction<boolean>>,
    reload: boolean
) => ReactElement
const AccordionField: type = (accordianStyle, tripData, control, setReload, reload) => {
    return (
        <AccordionDetails sx={accordianStyle}>
            <div style={{ ...divStyle, flexDirection: 'column' }}>
                {tripData.expense &&
                    tripData.expense.map((expense: expense, index) => (
                        <ExpenseApprovalFormFields
                            key={index}
                            expense={expense}
                            control={control}
                            setReload={setReload}
                            reload={reload}
                        />
                    ))}
            </div>
        </AccordionDetails>
    )
}
