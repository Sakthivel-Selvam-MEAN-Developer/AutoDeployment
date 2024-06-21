import { FC } from 'react'
import { epochToMinimalDate } from '../../../../commonUtils/epochToTime'
import { AdvanceDetail } from './types'
import { totalAdvanceCalculation } from './totalCalulation'
interface AdvanceTableProps {
    advanceDetails: AdvanceDetail[]
}
export const AdvanceTable: FC<AdvanceTableProps> = ({ advanceDetails }) => {
    const TotalAdvance = totalAdvanceCalculation(advanceDetails)
    return (
        <table className="advanceTable" style={{ width: '100%' }}>
            <tr>
                <th className="alignLeft">SI No</th>
                <th className="alignLeft">Date</th>
                <th className="alignLeft">Particulars</th>
                <th className="alignRight">Recd. Amt.</th>
                <th className="alignRight">Distributed Amt.</th>
            </tr>
            {advanceDetails.length > 0 &&
                advanceDetails.map((tripDetails, index) => (
                    <TableCells key={index} tripDetails={tripDetails} number={index} />
                ))}
            <tr>
                <td></td>
                <td></td>
                <td className="alignRight">
                    <h4>Total</h4>
                </td>
                <td className="alignRight">
                    <h4>{TotalAdvance.toFixed(2)}</h4>
                </td>
                <td className="alignRight">
                    <h4>0.00</h4>
                </td>
            </tr>
        </table>
    )
}
interface tableCellProps {
    tripDetails: AdvanceDetail
    number: number
}
const TableCells: FC<tableCellProps> = ({ tripDetails, number }) => {
    return tripDetails.advanceforTrip.map((tripAdvance, index) => {
        return (
            <tr key={index}>
                <td className="alignLeft">{number + 1}</td>
                <td className="alignLeft">{epochToMinimalDate(tripAdvance.advanceDate)}</td>
                <td className="alignLeft">Recd From Vigneshwaran R at HO</td>
                <td className="alignRight">{tripAdvance.amount.toFixed(2)}</td>
                <td className="alignRight">0.00</td>
            </tr>
        )
    })
}
