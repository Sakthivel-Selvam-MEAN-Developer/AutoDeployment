import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import SubmitButton from '../../../form/button.tsx'
import { useEffect, useState } from 'react'
import SuccessDialog from '../../../commonUtils/SuccessDialog.tsx'
import ExpensesFormField from './expenseFormField.tsx'
import { getDriverTripByDriverId, updateDriverAdvance } from '../../services/driverTrip.ts'
import { ExpenseTable } from './expenseTable.tsx'
import { AddedExpense } from './addedExpenses.tsx'
import { getAllDriver } from '../../services/driver.ts'
import { getExpenseByTripId } from '../../services/expenses.ts'
export interface expenseDetailsType {
    expenseType: string
    placedAmount: number
    tripId: number | undefined
}
const ListExpenses: React.FC = () => {
    const { handleSubmit, control, setValue } = useForm<FieldValues>()
    const [driverList, setDriverList] = useState<never[]>([])
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
    const [expensesDetails, setExpensesDetails] = useState<expenseDetailsType[]>([])
    const [driverTripDetails, setDriverTripDetails] = useState([])
    const [addedExpense, setAddedExpense] = useState<expenseDetailsType[]>([])
    const [driverId, setDriverId] = useState<number>(0)
    const [driverName, setDriverName] = useState<string | null>(null)
    const [tripId, setTripId] = useState<number | undefined>(0)
    const [clear, setClear] = useState<boolean>(false)
    const [category, setCategory] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        getAllDriver().then(setDriverList)
    }, [])
    useEffect(() => {
        getDriverTripByDriverId(driverId, undefined).then((trips) =>
            setDriverTripDetails(trips.trips)
        )
    }, [driverId])
    useEffect(() => {
        if (tripId !== 0) getExpenseByTripId(tripId).then(setAddedExpense)
    }, [tripId])
    useEffect(() => {
        setExpensesDetails([])
    }, [category])
    useEffect(() => {
        setDriverId(0)
        setDriverName('')
        setValue('expenseType', '')
        setValue('amount', '')
        setValue('driverAdvance', '')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clear])
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (
            (category === 'Driver Expense' &&
                (data.expenseType === undefined || data.amount === undefined || tripId === 0)) ||
            (category === 'Driver Advance' && data.driverAdvance === undefined)
        ) {
            alert('All Fields are Required')
            return
        }
        if (category === 'Driver Advance' && data.driverAdvance !== undefined) {
            await updateDriverAdvance({ tripId, driverAdvance: data.driverAdvance }).then(() => {
                setMessage('Driver Advance Creation is Successfull')
                setOpenSuccessDialog(true)
                setClear(!clear)
            })
            return
        }
        setExpensesDetails([
            ...expensesDetails,
            { expenseType: data.expenseType, placedAmount: parseInt(data.amount), tripId: tripId }
        ])
    }
    return (
        <>
            {addedExpense.length !== 0 && <AddedExpense addedExpense={addedExpense} />}
            <form onSubmit={handleSubmit(onSubmit)}>
                <ExpensesFormField
                    control={control}
                    driverTripDetails={driverTripDetails}
                    setTripId={setTripId}
                    driverList={driverList}
                    setDriverId={setDriverId}
                    driverId={driverId}
                    setDriverName={setDriverName}
                    driverName={driverName}
                    setCategory={setCategory}
                    category={category}
                />
                <SubmitButton
                    name={category === 'Driver Advance' ? 'Add Advance' : 'Add Expense'}
                    type="submit"
                    disabled={category === ''}
                />
                <SuccessDialog
                    open={openSuccessDialog}
                    handleClose={() => setOpenSuccessDialog(false)}
                    message={message}
                />
            </form>
            {expensesDetails.length !== 0 && (
                <ExpenseTable
                    expenses={expensesDetails}
                    setDetails={setExpensesDetails}
                    setClear={setClear}
                    setMessage={setMessage}
                    clear={clear}
                    setOpen={setOpenSuccessDialog}
                />
            )}
        </>
    )
}
export default ListExpenses
