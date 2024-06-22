import { FC } from 'react'
import { totalCalculation } from './totalCalulation'
import { driverDetailProps } from '../types'
interface SummaryTableProps {
    tripDetails: driverDetailProps
}
export const SummaryTable: FC<SummaryTableProps> = ({ tripDetails }) => {
    const { totalAdvance, totalExpense, totalBetta } = totalCalculation(tripDetails)
    const salary = (totalBetta + totalExpense - totalAdvance).toFixed(2)
    return (
        <table className="summary" style={{ width: '100%' }}>
            <tr>
                <td className="alignLeft">1</td>
                <td className="alignLeft">
                    <b>Duty Salary</b>
                </td>
                <td className="alignRight">{totalBetta.toFixed(2)}</td>
            </tr>
            <tr>
                <td className="alignLeft">2</td>
                <td className="alignLeft">
                    <b>Driver Expenses</b>
                </td>
                <td className="alignRight">{totalExpense.toFixed(2)}</td>
            </tr>
            <tr>
                <td className="alignLeft">3</td>
                <td className="alignRight">
                    <b>Total Expense</b>
                </td>
                <td className="alignRight">{(totalBetta + totalExpense).toFixed(2)}</td>
            </tr>
            <tr>
                <td className="alignLeft">4</td>
                <td className="alignRight">
                    <b>Total Advance</b>
                </td>
                <td className="alignRight">{totalAdvance.toFixed(2)}</td>
            </tr>
            <tr>
                <td className="alignLeft">5</td>
                <td className="alignLeft">
                    <b>Trip Batta</b>
                </td>
                <td className="alignRight"></td>
            </tr>
            <tr>
                <td className="alignLeft">6</td>
                <td className="alignLeft">
                    <b>Other Incentives</b>
                </td>
                <td className="alignRight">0.00</td>
            </tr>
            <tr>
                <td className="alignLeft">7</td>
                <td className="alignLeft">
                    <b>Diesel Deductions</b>
                </td>
                <td className="alignRight">0.00</td>
            </tr>
            <tr>
                <td className="alignLeft">8</td>
                <td className="alignLeft">
                    <b>Other Deductions</b>
                </td>
                <td className="alignRight">0.00</td>
            </tr>
            <tr>
                <td className="alignLeft">9</td>
                <td className="alignRight">
                    <b>Balance to be paid</b>
                </td>
                <td className="alignRight">
                    <b>{salary}</b>
                </td>
            </tr>
            <tr>
                <td colSpan={3}>
                    <b>Comments :</b> okay|Attendance - Rs 7750(+)
                </td>
            </tr>
        </table>
    )
}
