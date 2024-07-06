import { Paper, Table, TableContainer, TableRow } from '@mui/material'
import { tripDetails } from './list'
import { FC, useContext, useEffect } from 'react'
import { invoiceFilterData } from './invoiceContext'
import { getSelectedTableHead } from './table'
import { SelectedProps } from './interface'
import { SelectedTableCells } from './selectedTableCells'
const SelectedTableBody: FC<SelectedProps> = ({ selectedTrip, setSelectedTrip }) => {
    const { filterData } = useContext(invoiceFilterData)
    useEffect(() => {
        setSelectedTrip([])
    }, [filterData.pageName, filterData.cementCompany])
    return (
        <>
            {selectedTrip.length > 0 &&
                selectedTrip.map((data, index) => {
                    return <TableRowContainer key={index} data={data} />
                })}
        </>
    )
}
interface TableRowContainerProps {
    data: tripDetails
}
const TableRowContainer: FC<TableRowContainerProps> = ({ data }) => (
    <TableRow>
        <SelectedTableCells cells={data} />
    </TableRow>
)

export const SelectedTableContainer: FC<SelectedProps> = ({ selectedTrip, setSelectedTrip }) => {
    return (
        <TableContainer
            component={Paper}
            sx={{ marginTop: '30px', maxHeight: '300px', overflow: 'auto' }}
        >
            <Table stickyHeader sx={{ minWidth: 600 }}>
                {getSelectedTableHead()}
                <SelectedTableBody selectedTrip={selectedTrip} setSelectedTrip={setSelectedTrip} />
            </Table>
        </TableContainer>
    )
}
