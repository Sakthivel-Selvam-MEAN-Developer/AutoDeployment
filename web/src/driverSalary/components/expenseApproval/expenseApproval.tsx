import React, { ReactElement } from 'react'
import ExpenseList from './expenseList'

const ExpenseApprovalList: React.FC = (): ReactElement => {
    return (
        <>
            <b>Users Waiting for approval</b>
            <br />
            <br />
            <ExpenseList />
        </>
    )
}
export default ExpenseApprovalList
