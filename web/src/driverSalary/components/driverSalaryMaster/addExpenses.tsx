import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import SubmitButton from '../../../form/button.tsx'
import { useEffect, useState } from 'react'
import SuccessDialog from '../../../commonUtils/SuccessDialog.tsx'
import ExpensesFormField from './expenseFormField.tsx'
import { getDriverTripByDriverId } from '../../services/driverTrip.ts'
import { ExpenseTable } from './expenseTable.tsx'
export interface expenseDetailsType {
    expenseType: string
    amount: number
    tripId: number
}
const ListExpenses: React.FC = () => {
    const { handleSubmit, control } = useForm<FieldValues>()
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
    const [expensesDetails, setExpensesDetails] = useState<expenseDetailsType[]>([])
    const [driverTripDetails, setDriverTripDetails] = useState([])
    const [tripId, setTripId] = useState(0)
    useEffect(() => {
        getDriverTripByDriverId(1).then(setDriverTripDetails)
    }, [])
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (data.expenseType === undefined || data.amount === undefined) return
        setExpensesDetails([
            ...expensesDetails,
            { expenseType: data.expenseType, amount: parseInt(data.amount), tripId: tripId }
        ])
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ExpensesFormField
                    control={control}
                    driverTripDetails={driverTripDetails}
                    setTripId={setTripId}
                />
                <SubmitButton name="Add Expense" type="submit" />
                <SuccessDialog
                    open={openSuccessDialog}
                    handleClose={() => setOpenSuccessDialog(false)}
                    message="Trip creation is successful"
                />
            </form>
            {expensesDetails.length !== 0 && <ExpenseTable expenseDetails={expensesDetails} />}
        </>
    )
}
export default ListExpenses
