import React from 'react';

interface SelectedCell {
    name: string;
    durationInMillis: number;
}

interface Props {
    selectedCell: SelectedCell;
}

const PieChartDetails: React.FC<Props> = ({ selectedCell }) => {
    return (
        <>
            {selectedCell.name}
            <br />
            {selectedCell.durationInMillis}
        </>
    );
}

export default PieChartDetails
