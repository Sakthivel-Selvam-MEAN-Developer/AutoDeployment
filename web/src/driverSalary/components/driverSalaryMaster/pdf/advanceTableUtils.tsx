import { epochToMinimalDate } from '../../../../commonUtils/epochToTime'
import { AdvanceDetail } from '../types'
import { FC } from 'react'

interface tableCellProps {
    tripDetails: AdvanceDetail
    number: number
}
export const TableCells: FC<tableCellProps> = ({ tripDetails, number }) => {
    return tripDetails.advanceforTrip.map((tripAdvance, index) => {
        return (
            <tr key={index}>
                <td className="alignLeft">{number + 1}</td>
                <td className="alignLeft">{epochToMinimalDate(tripAdvance.advanceDate)}</td>
                <td className="alignLeft">Recd From Vigneshwaran R at HO</td>
                <td className="alignRight">{tripAdvance.amount.toFixed(2)}</td>
            </tr>
        )
    })
}
