import React from 'react'
import { formatDuration } from '../epochToTime.ts'

interface SelectedCell {
    name: string
    durationInMillis: number
}

interface Props {
    selectedCell: SelectedCell
}

const PieChartDetails: React.FC<Props> = ({ selectedCell }) => {
    return (
        <>
            {selectedCell.name}
            <br />
            {formatDuration(selectedCell.durationInMillis)}
        </>
    )
}

export default PieChartDetails
