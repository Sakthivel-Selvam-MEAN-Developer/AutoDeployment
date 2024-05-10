import React, { ReactElement, useEffect } from 'react'
import ExpenseList from './expenseList'
import { AutocompleteWithDriverName } from '../driverSalaryMaster/driverDetails'
import { getAllDriver } from '../../services/driver'
import { getAllExpenseByTripIdForApproval } from '../../services/expenses'
import { ExpenseType } from './types'
const ExpenseApprovalList: React.FC = (): ReactElement => {
    const [driverList, setDriverList] = React.useState<never[]>([])
    const [driverName, setDriverName] = React.useState<string | null>(null)
    const [driverId, setDriverId] = React.useState<number>(0)
    const [expensesForApproval, setExpensesForApproval] = React.useState([])
    const [reload, setReload] = React.useState(false)
    useEffect(() => {
        getAllDriver().then(setDriverList)
    }, [])
    useEffect(() => {
        getAllExpenseByTripIdForApproval(driverId).then(setExpensesForApproval)
    }, [driverId, reload])
    return (
        <>
            {ExpenseAutoComplete(driverList, setDriverId, driverName, setDriverName)}
            {ExpenseList(expensesForApproval, setReload, reload)}
        </>
    )
}
export default ExpenseApprovalList
const ExpenseAutoComplete: ExpenseType = (driverList, setDriverId, driverName, setDriverName) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p style={{ fontWeight: 700 }}>Users Waiting for approval</p>
            <AutocompleteWithDriverName
                driverList={driverList}
                setDriverId={setDriverId}
                driverName={driverName}
                setDriverName={setDriverName}
            />
        </div>
    )
}
