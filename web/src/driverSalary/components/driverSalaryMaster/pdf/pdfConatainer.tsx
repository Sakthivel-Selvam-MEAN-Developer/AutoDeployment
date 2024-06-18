import './pdf.css'
import { AdvanceTable } from './advanceTable'
import { ExpenseTable } from './expenseTable'
import { FC } from 'react'
import { driverDetailProps } from './types'
import { TripTable } from './tripTable'
interface PdfConatinerProps {
    tripDetails: driverDetailProps
}
export const PdfConatiner: FC<PdfConatinerProps> = ({ tripDetails }) => {
    return (
        <>
            <h3> Details</h3>
            <TripTable tripDetails={tripDetails.trips} />
            <br />
            <h3>Advance Details</h3>
            <AdvanceTable advanceDetails={tripDetails.advanceDetails} />
            <br />
            <h3>Expense Details</h3>
            <ExpenseTable tripDetails={tripDetails.trips} />
        </>
    )
}
