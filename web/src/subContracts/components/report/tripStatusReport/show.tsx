import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { epochToMinimalDate } from '../../../../commonUtils/epochToTime'
import { Button, Pagination, Stack } from '@mui/material'
import exportFromJSON from 'export-from-json'
import { CheckUser } from '../../../../auth/checkUser.tsx'
import { Dispatch, FC, useContext } from 'react'
import { dispatchData } from './tripStatusContext.ts'

interface Row {
    freightAmount: number
    transporterAmount: number
    totalFreightAmount: number
    totalTransporterAmount: number
    margin: number
    transporterBalance: number
    tripStatus: boolean
    truck: {
        vehicleNumber: string
        transporter: {
            name: string
            csmName: string
        }
    }
    endDate: number
    invoiceNumber: string
    loadingPoint: {
        name: string
    }
    unloadingPoint: {
        name: string
    }
    stockPoint: {
        name: string
    }
    filledLoad: string
    startDate: number
    sample: string
}
interface fuel {
    quantity: number
    totalprice: number
    bunk: bunk
}
interface bunk {
    bunkName: string
}
interface Props {
    acknowledgementStatus: boolean
    loadingPointToStockPointTrip: Row
    loadingPointToUnloadingPointTrip: Row
    stockPointToUnloadingPointTrip: Row
    paymentDues: paymentType[]
    fuel: fuel[]
}
interface paymentType {
    type: string
    status: boolean
}
interface listoverallTripProps {
    listoverallTrip: Props[]
}
const tableCell = [
    'Vehicle Number',
    'Start Date',
    'Invoice Number',
    'Transporter',
    'CSM Name',
    'Loading Point',
    'Stock Point',
    'Unloading Point',
    'Filled Load',
    'Freight Rate',
    'Tansporter Rate',
    'Total Freight Amount',
    'Total Tansporter Amount',
    'Margin',
    'Bunk Name',
    'Disel Quantity',
    'Disel Amount',
    'Trip Status',
    'Payment Status'
]
function getTableHead() {
    return (
        <TableHead>
            <GetTableRow />
        </TableHead>
    )
}

const GetCells = (data: Row, num: number, type: string, details: Props) => {
    const authoriser = CheckUser()
    const fuel = details.fuel.length !== 1
    return (
        <>
            <TableCell> {num} </TableCell>
            <TableCell align="left">{data.truck.vehicleNumber}</TableCell>
            <TableCell align="left">{epochToMinimalDate(data.startDate)}</TableCell>
            <TableCell align="left">{data.invoiceNumber}</TableCell>
            <TableCell align="left">{data.truck.transporter.name}</TableCell>
            <TableCell align="left">{data.truck.transporter.csmName}</TableCell>
            <TableCell align="left">{data.loadingPoint.name}</TableCell>
            <TableCell align="left">{data.stockPoint ? data.stockPoint.name : 'Null'}</TableCell>
            <TableCell align="left">
                {data.unloadingPoint ? data.unloadingPoint.name : 'Null'}
            </TableCell>
            <TableCell align="left">{data.filledLoad}</TableCell>
            {authoriser && <TableCell align="left">{data.freightAmount}</TableCell>}
            <TableCell align="left">{data.transporterAmount}</TableCell>
            {authoriser && <TableCell align="left">{data.totalFreightAmount}</TableCell>}
            <TableCell align="left">{data.totalTransporterAmount}</TableCell>
            {authoriser && <TableCell align="left">{data.margin}</TableCell>}
            <TableCell align="left">
                {fuel ? 'Not Fueled' : details.fuel[0].bunk.bunkName}
            </TableCell>
            <TableCell align="left">{fuel ? 'Not Fueled' : details.fuel[0].quantity} </TableCell>
            <TableCell align="left">{fuel ? 'Not Fueled' : details.fuel[0].totalprice} </TableCell>
            <TableCell align="left">
                {data.tripStatus === false
                    ? 'Running'
                    : details.acknowledgementStatus === false
                      ? 'Waiting For Acknowledgement'
                      : 'Completed'}
            </TableCell>
            <TableCell align="left">{type}</TableCell>
        </>
    )
}
const checkPaymentStatus = (arrayOfDues: paymentType[]) => {
    const initial = arrayOfDues.filter((due) => {
        return due.type === 'initial pay' && due.status === true
    })
    const final = arrayOfDues.filter((due) => {
        return due.type === 'final pay' && due.status === true
    })
    const gst = arrayOfDues.filter((due) => {
        return due.type === 'gst pay' && due.status === true
    })
    return initial.length !== 1
        ? 'Advance Pending'
        : final.length === 1
          ? gst.length === 1
              ? 'Completed'
              : 'GST Pending'
          : 'Balance Pending'
}

const name = ['Freight Rate', 'Total Freight Amount', 'Margin']
const GetTableRow = () => {
    const authoriser = CheckUser()
    const rowResult = authoriser ? tableCell : tableCell.filter((cell) => !name.includes(cell))
    return <TableRow>{tableBodyCell(rowResult)}</TableRow>
}
const tableBodyCell = (rowResult: string[]) => {
    return (
        <>
            <TableCell>#</TableCell>
            {rowResult.map((trip) => (
                <TableCell key={trip} align="left">
                    {trip}
                </TableCell>
            ))}
        </>
    )
}
interface tableBody {
    listoverallTrip: Props[]
}
const GetTableBody: FC<tableBody> = ({ listoverallTrip }) => {
    let number = 0
    const style = { '&:last-child td, &:last-child th': { border: 0 } }
    return (
        <TableBody>
            {listoverallTrip.map((row: Props, index: number) => (
                <TableRow key={index} sx={style}>
                    {GetCells(
                        loadingToStock(row),
                        ++number,
                        checkPaymentStatus(row.paymentDues),
                        row
                    )}
                </TableRow>
            ))}
        </TableBody>
    )
}
function download(listoverallTrip: Props[], authoriser: boolean) {
    const downloadtripData: object[] = []
    listoverallTrip.map((row: Props) => {
        if (
            row.loadingPointToStockPointTrip !== null &&
            row.loadingPointToStockPointTrip !== undefined
        ) {
            downloadCSV(
                downloadtripData,
                row.loadingPointToStockPointTrip,
                checkPaymentStatus(row.paymentDues),
                listoverallTrip.length,
                row,
                authoriser
            )
        }
        if (
            row.loadingPointToUnloadingPointTrip !== null &&
            row.loadingPointToUnloadingPointTrip !== undefined
        ) {
            downloadCSV(
                downloadtripData,
                row.loadingPointToUnloadingPointTrip,
                checkPaymentStatus(row.paymentDues),
                listoverallTrip.length,
                row,
                authoriser
            )
        }
    })
}
type CSVProps = (
    downloadtripData: object[],
    tripData: Row,
    type: string,
    num: number,
    details: Props,
    authoriser: boolean
) => void
const downloadCSV: CSVProps = (downloadtripData, tripData, type, num, details, authoriser) => {
    const addData: any = {
        vehicleNumber: tripData.truck.vehicleNumber,
        startDate: epochToMinimalDate(tripData.startDate),
        invoiceNumber: tripData.invoiceNumber,
        transporter: tripData.truck.transporter.name,
        loadingPoint: tripData.loadingPoint.name,
        stockPoint: tripData.stockPoint ? tripData.stockPoint.name : 'Null',
        unloadingPoint: tripData.unloadingPoint ? tripData.unloadingPoint.name : 'Null',
        filledLoad: tripData.filledLoad,
        tansporterAmount: tripData.transporterAmount,
        csmName: tripData.truck.transporter.csmName,
        totalTansporterAmount: tripData.totalTransporterAmount,
        bunkName: details.fuel.length !== 1 ? 'Not Fueled' : details.fuel[0].bunk.bunkName,
        diselQuantity: details.fuel.length !== 1 ? 'Not Fueled' : details.fuel[0].quantity,
        diselAmount: details.fuel.length !== 1 ? 'Not Fueled' : details.fuel[0].totalprice,
        tripStatus:
            tripData.tripStatus === false
                ? 'Running'
                : details.acknowledgementStatus === false
                  ? 'Waiting For Acknowledgement'
                  : 'completed',
        paymentStatus: type
    }
    if (authoriser) {
        addData.freightAmount = tripData.freightAmount
        addData.totalFreightAmount = tripData.totalFreightAmount
        addData.margin = tripData.margin
    }
    downloadtripData.push(addData)
    if (downloadtripData.length === num) {
        const data = downloadtripData
        const fileName = 'List of Trips'
        const exportType = exportFromJSON.types.csv
        exportFromJSON({ data, fileName, exportType })
    }
}
const style = {
    display: 'flex',
    bottom: '0',
    width: '100%',
    justifyContent: 'center',
    padding: '10px 0',
    background: 'white'
}
const ListAllDetails: React.FC<listoverallTripProps> = ({ listoverallTrip }) => {
    const authoriser = CheckUser()
    if (listoverallTrip.length == 0) {
        return
    }
    return (
        <>
            {generateCSVbutton(listoverallTrip, authoriser)}
            {tableContainer(listoverallTrip)}
            <StackPage />
        </>
    )
}

export default ListAllDetails
function tableContainer(listoverallTrip: Props[]) {
    return (
        <div style={{ marginBottom: '20px' }}>
            <TableContainer component={Paper}>{table(listoverallTrip)}</TableContainer>
        </div>
    )
}

function generateCSVbutton(listoverallTrip: Props[], authoriser: boolean) {
    return (
        <div style={{ float: 'right', marginTop: '10px' }}>
            <Button onClick={() => download(listoverallTrip, authoriser)} variant="contained">
                Generate CSV
            </Button>
        </div>
    )
}

function table(listoverallTrip: Props[]) {
    return (
        <Table sx={{ minWidth: 600 }} aria-label="simple table">
            {getTableHead()}
            <GetTableBody listoverallTrip={listoverallTrip} />
        </Table>
    )
}

const StackPage = () => {
    const { dispatch } = useContext(dispatchData)
    return (
        <div style={{ ...style, position: 'sticky' }}>
            <Stack spacing={10}>{pagination(dispatch)}</Stack>
        </div>
    )
}
export type ActionType = { type: string; pageNumber: number }
function pagination(dispatch: Dispatch<ActionType>) {
    return (
        <Pagination
            count={100}
            size="large"
            color="primary"
            onChange={(_e, value) => {
                dispatch({ pageNumber: value, type: 'updatePageNumber' })
            }}
        />
    )
}

function loadingToStock(row: Props) {
    // console.log(row)
    if (
        row.loadingPointToUnloadingPointTrip !== null &&
        row.loadingPointToStockPointTrip !== undefined
    )
        return row.loadingPointToUnloadingPointTrip
    else if (
        row.stockPointToUnloadingPointTrip !== null &&
        row.stockPointToUnloadingPointTrip !== undefined
    ) {
        console.log('Stock to unloaidng', row.stockPointToUnloadingPointTrip)
        return {
            ...row.loadingPointToStockPointTrip,
            unloadingPoint: row.stockPointToUnloadingPointTrip.unloadingPoint
        }
    } else return row.loadingPointToStockPointTrip
}
