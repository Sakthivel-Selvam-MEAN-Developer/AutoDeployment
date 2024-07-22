import React, { useEffect } from 'react'
import { useState } from 'react'
import DataTable from './dataGrid'
import { gridContent } from './dataGridInputs'
import { getBillsWithNoSubmissionDate } from '../../../services/invoiceSubmissionDate'
export interface tripProp {
    data: billProps[]
}
export interface billProps {
    id: number
    billNo: string
    billDate: number
    cementCompany: { name: string }
    amount: number
}
const initialState = {
    data: [
        {
            id: 0,
            billNo: '',
            billDate: 21,
            cementCompany: { name: '' },
            amount: 0
        }
    ]
}
const AddSubmissionDate: React.FC = () => {
    const [billDetails, setBillDetails] = useState<tripProp>(initialState)
    useEffect(() => {
        getBillsWithNoSubmissionDate().then(setBillDetails)
    }, [])
    const gridRows = gridContent(billDetails.data)
    return (
        <>
            <DataTable gridRows={gridRows} />
        </>
    )
}
export default AddSubmissionDate
