import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import SubmitButton from '../../../form/button.tsx'
import { useEffect, useState } from 'react'
import SuccessDialog from '../../../commonUtils/SuccessDialog.tsx'
import ExpensesFormField from './expenseFormField.tsx'
import { getDriverTripByDriverId } from '../../services/driverTrip.ts'
import { ExpenseTable } from './expenseTable.tsx'
import { AddedExpense } from './addedExpenses.tsx'
import { getAllDriver } from '../../services/driver.ts'
export interface expenseDetailsType {
    expenseType: string
    placedAmount: number
    tripId: number
}
const ListExpenses: React.FC = () => {
    const { handleSubmit, control } = useForm<FieldValues>()
    const [driverList, setDriverList] = useState<never[]>([])
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
    const [expensesDetails, setExpensesDetails] = useState<expenseDetailsType[]>([])
    const [driverTripDetails, setDriverTripDetails] = useState([])
    const [addedExpense] = useState<expenseDetailsType[]>([])
    const [driverId, setDriverId] = useState<number>(0)
    const [driverName, setDriverName] = useState<string | null>(null)
    const [tripId, setTripId] = useState(0)
    const [clear, setClear] = useState<boolean>(false)
    useEffect(() => {
        getAllDriver().then(setDriverList)
    }, [])
    useEffect(() => {
        getDriverTripByDriverId(driverId).then((trips) => setDriverTripDetails(trips.trips))
    }, [driverId])
    useEffect(() => {
        setDriverId(0)
        setDriverName('')
    }, [clear])
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (data.expenseType === undefined || data.amount === undefined || tripId === 0) {
            alert('All Fields are Required')
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
                />
                <SubmitButton name="Add Expense" type="submit" />
                <SuccessDialog
                    open={openSuccessDialog}
                    handleClose={() => setOpenSuccessDialog(false)}
                    message="Trip creation is successful"
                />
            </form>
            {expensesDetails.length !== 0 && (
                <ExpenseTable
                    expenseDetails={expensesDetails}
                    setExpensesDetails={setExpensesDetails}
                    setClear={setClear}
                    clear={clear}
                />
            )}
        </>
    )
}
export default ListExpenses
