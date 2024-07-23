import React, { useEffect } from 'react'
import { useState } from 'react'
import DataTable from './dataGrid'
import { gridContent } from './dataGridInputs'
import { getBillsWithNoSubmissionDate } from '../../../services/invoiceSubmissionDate'
export interface billProps {
    id: number
    billNo: string
    billDate: number
    cementCompany: { name: string }
    amount: number
}
const initialState = [
    {
        id: 0,
        billNo: '',
        billDate: 21,
        cementCompany: { name: '' },
        amount: 0
    }
]
const AddSubmissionDate: React.FC = () => {
    const [billDetails, setBillDetails] = useState<billProps[]>(initialState)
    useEffect(() => {
        getBillsWithNoSubmissionDate().then(setBillDetails)
    }, [])
    const gridRows = gridContent(billDetails)
    return (
        <div>
            <h4>Add Invoice Submission Date</h4>
            <DataTable gridRows={gridRows} />
        </div>
    )
}
export default AddSubmissionDate
