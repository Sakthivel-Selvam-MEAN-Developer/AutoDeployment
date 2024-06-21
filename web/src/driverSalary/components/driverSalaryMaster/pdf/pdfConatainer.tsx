import './pdf.css'
import { AdvanceTable } from './advanceTable'
import { ExpenseTable } from './expenseTable'
import { FC } from 'react'
import { driverDetailProps } from './types'
import { TripTable } from './tripTable'
import { FuelTable } from './fuelTable'
import { Header } from './header'
import { SummaryTable } from './summary'
interface PdfConatinerProps {
    tripDetails: driverDetailProps
}
export const PdfConatiner: FC<PdfConatinerProps> = ({ tripDetails }) => {
    return (
        <div className="pdf">
            <Header />
            <br />
            <h3> Details</h3>
            <TripTable tripDetails={tripDetails} />
            <br />
            <h3>Advance Details</h3>
            <AdvanceTable advanceDetails={tripDetails.advanceDetails} />
            <br />
            <h3 style={{ textAlign: 'center' }}>Expense Details</h3>
            <ExpenseTable tripDetails={tripDetails.trips} />
            <br />
            <h3>Fuel Consumption Details</h3>
            <FuelTable tripDetails={tripDetails} />
            <br />
            <h3>Summary</h3>
            <SummaryTable tripDetails={tripDetails} />
        </div>
    )
}
