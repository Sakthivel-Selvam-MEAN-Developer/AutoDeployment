import { Paper, Table, TableContainer, TableRow } from '@mui/material'
import { tripDetails } from './list'
import { FC, useContext, useEffect } from 'react'
import { invoiceFilterData, partyNamesContext } from './invoiceContext'
import { getSelectedTableHead } from './table'
import { SelectedProps } from './interface'
import { SelectedTableCells } from './selectedTableCells'
const SelectedTableBody: FC<SelectedProps> = ({ selectedTrip, setSelectedTrip }) => {
    const { setPartyNames } = useContext(partyNamesContext)
    const { filterData } = useContext(invoiceFilterData)
    useEffect(() => {
        setSelectedTrip([])
        setPartyNames([])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterData.pageName, filterData.cementCompanyName])
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
        <TableContainer component={Paper} sx={{ marginTop: '30px' }}>
            <Table sx={{ minWidth: 600 }} aria-label="simple table">
                {getSelectedTableHead()}
                <SelectedTableBody selectedTrip={selectedTrip} setSelectedTrip={setSelectedTrip} />
            </Table>
        </TableContainer>
    )
}
