import { Paper, Table, TableContainer } from '@mui/material'
import { FC } from 'react'
import { overallTripProps } from '../../types/tripTypes'
import { TableHeadContainer } from './tableHead'
import { TableBodyContainer } from './tableBody'
export interface ApprovalTableProps {
    tripDetails: overallTripProps[]
    setSendStatus: React.Dispatch<React.SetStateAction<boolean>>
}

const ApprovalTable: FC<ApprovalTableProps> = ({ tripDetails, setSendStatus }) => {
    return (
        <TableContainer component={Paper} sx={{ maxHeight: 750 }}>
            <Table stickyHeader sx={{ minWidth: 650 }}>
                <br />
                <TableHeadContainer />
                {tripDetails.length > 0 &&
                    tripDetails.map((overallTrip, index) => {
                        return (
                            <TableBodyContainer
                                overallTrip={overallTrip}
                                key={index}
                                setSendStatus={setSendStatus}
                            />
                        )
                    })}
            </Table>
        </TableContainer>
    )
}
export default ApprovalTable
