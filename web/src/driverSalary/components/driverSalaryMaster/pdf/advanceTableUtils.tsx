import { epochToMinimalDate } from '../../../../commonUtils/epochToTime'
import { AdvanceDetail } from '../types'
import { FC } from 'react'

interface tableCellProps {
    tripDetails: AdvanceDetail
    number: number
}
export const TableCells: FC<tableCellProps> = ({ tripDetails, number }) => {
    let count = number !== 0 ? number : 1
    if (tripDetails.advanceforTrip.length === 0) {
        count = number - 1
        return
    }
    return tripDetails.advanceforTrip.map((tripAdvance, index) => {
        return (
            <tr key={index}>
                <td className="alignLeft">{count}</td>
                <td className="alignLeft">{epochToMinimalDate(tripAdvance.advanceDate)}</td>
                <td className="alignLeft">Advance Transfered</td>
                <td className="alignRight">{tripAdvance.amount.toFixed(2)}</td>
            </tr>
        )
    })
}
