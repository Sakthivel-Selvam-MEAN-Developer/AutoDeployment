// import { TableCell, TableHead, TableRow } from '@mui/material'
// import { epochToMinimalDate } from '../../../../commonUtils/epochToTime'
// import { tripDetails } from './tableList'
// import { FC } from 'react'
// export interface cellProps {
//     cells: tripDetails
// }
// export const SelectedTableCells: FC<cellProps> = ({ cells }: { cells: tripDetails }) => {
//     return (
//         <>
//             <TableCell sx={{ textAlign: 'left' }}>{epochToMinimalDate(cells.startDate)}</TableCell>
//             <TableCell sx={{ textAlign: 'left' }}>{cells.invoiceNumber}</TableCell>
//             <TableCell sx={{ textAlign: 'left' }}>{cells.truck.vehicleNumber}</TableCell>
//             <TableCell sx={{ textAlign: 'left' }}>{cells.freightAmount}</TableCell>
//             <TableCell sx={{ textAlign: 'left' }}>{cells.totalFreightAmount}</TableCell>
//             <TableCell sx={{ textAlign: 'left' }}>{''}</TableCell>
//         </>
//     )
// }
// const cellNames = [
//     'Start Date',
//     'Invoice Number',
//     'Vehicle Number',
//     'Loading Point',
//     'Unloading Point',
//     'quantity',
//     'Freight Amount',
//     'Total Freight Amount',
//     'Action'
// ]
// const cells = (cell: string, index: number) => {
//     return (
//         <TableCell key={index} align="left">
//             {cell}
//         </TableCell>
//     )
// }
// const newLocal = <TableRow>{cellNames.map((cellName, index) => cells(cellName, index))}</TableRow>
// export const getTableHead = () => {
//     return (
//         <TableHead sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 4 }}>
//             {newLocal}
//         </TableHead>
//     )
// }
