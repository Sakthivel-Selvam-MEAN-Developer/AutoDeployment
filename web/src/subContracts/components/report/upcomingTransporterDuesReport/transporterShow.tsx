import { Box, Button, Pagination, Stack } from '@mui/material'
import exportFromJSON from 'export-from-json'
import { epochToMinimalDate } from '../../../../commonUtils/epochToTime'
import { Dispatch, FC } from 'react'
import { SetStateAction } from 'jotai'
import { DataGrid } from '@mui/x-data-grid'

interface OverallProps {
    name: string
    dueDate: number
    payableAmount: number
    overallTrip: {
        loadingPointToUnloadingPointTrip: props
        loadingPointToStockPointTrip: props
    }
}
interface unloadingProps {
    unloadingPoint: {
        name: string
    }
}
interface props {
    startDate: number
    invoiceNumber: string
    truck: {
        vehicleNumber: string
        transporter: {
            csmName: string
        }
    }
    loadingPoint: {
        name: string
    }
    stockPointToUnloadingPointTrip: unloadingProps[]
    unloadingPoint:
        | {
              name: string
          }
        | undefined
}

interface listTransporterProps {
    transporterDueData: OverallProps[]
    setskipNumber: React.Dispatch<React.SetStateAction<number>>
}
interface TransporterGrid {
    gridData: {
        id: number
        vehicleNumber: string | undefined
        startDate: string | null
        invoiceNumber: string | undefined
        loadingPoint: string | undefined
        unloadingPoint: string | undefined
        transporterName: string
        csmName: string | undefined
        dueDate: string | 0
        amount: number
    }[]
}

const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'vehicleNumber', headerName: 'Vehicle Number', flex: 1 },
    { field: 'startDate', headerName: 'Start Date', flex: 1 },
    { field: 'invoiceNumber', headerName: 'Invoice Number', flex: 1 },
    { field: 'loadingPoint', headerName: 'Loading Point', flex: 1 },
    { field: 'unloadingPoint', headerName: 'Unloading Point', flex: 1 },
    { field: 'transporterName', headerName: 'Transporter Name', flex: 1 },
    { field: 'csmName', headerName: 'CSM Name', flex: 1 },
    { field: 'dueDate', headerName: 'Due Date', flex: 1 },
    { field: 'amount', headerName: 'Amount', flex: 1 }
]
const TransporterGrid: FC<TransporterGrid> = ({ gridData }) => {
    return (
        <Box sx={{ height: '26vw', width: '94vw' }}>
            <DataGrid
                loading={gridData.length === 0}
                rows={gridData}
                columns={columns}
                pageSizeOptions={[100]}
                disableRowSelectionOnClick
            />
        </Box>
    )
}

const getTripData = (data: OverallProps, trip: props | null, index: number) => {
    return {
        id: index,
        vehicleNumber: trip?.truck.vehicleNumber,
        startDate: trip && epochToMinimalDate(trip?.startDate),
        invoiceNumber: trip?.invoiceNumber,
        loadingPoint: trip?.loadingPoint.name,
        unloadingPoint:
            trip?.unloadingPoint !== undefined
                ? trip?.unloadingPoint.name
                : trip?.stockPointToUnloadingPointTrip[0].unloadingPoint.name,
        transporterName: data.name,
        csmName: trip?.truck.transporter.csmName,
        dueDate: data.dueDate && epochToMinimalDate(data.dueDate),
        amount: data.payableAmount
    }
}
interface GridContainerProps {
    transporterDueData: OverallProps[]
}
const GridContainer: FC<GridContainerProps> = ({ transporterDueData }) => {
    const data = transporterDueData.map((row, index) => getTripData(row, getTripType(row), ++index))
    return (
        <>
            <TransporterGrid gridData={data} />
        </>
    )
}

const getTripType = (row: OverallProps) => {
    return row.overallTrip.loadingPointToStockPointTrip !== null
        ? row.overallTrip.loadingPointToStockPointTrip
        : row.overallTrip.loadingPointToUnloadingPointTrip !== null
          ? row.overallTrip.loadingPointToUnloadingPointTrip
          : null
}
function download(listoverallTrip: OverallProps[]) {
    const downloadtripData: object[] = []
    listoverallTrip.map((row: OverallProps, index: number) => {
        downloadCSV(row, downloadtripData, listoverallTrip.length, getTripType(row), index)
    })
}
const downloadCSV = (
    Dues: OverallProps,
    downloadtripData: object[],
    num: number,
    trip: props | null,
    index: number
) => {
    const data = getTripData(Dues, trip, index)
    downloadtripData.push(data)
    if (downloadtripData.length === num) {
        const data = downloadtripData
        const fileName = 'Transporter Due Dates'
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
const ListAllDetails: React.FC<listTransporterProps> = ({ transporterDueData, setskipNumber }) => {
    return (
        <>
            {generateCSVButton(transporterDueData)}
            <br />
            <br />
            <br />
            <GridContainer transporterDueData={transporterDueData} />
            {stack(setskipNumber)}
        </>
    )
}

export default ListAllDetails

function stack(setskipNumber: Dispatch<SetStateAction<number>>) {
    return (
        <div style={{ ...style, position: 'sticky' }}>
            <Stack spacing={10}>{pagination(setskipNumber)}</Stack>
        </div>
    )
}

function pagination(setskipNumber: Dispatch<SetStateAction<number>>) {
    return (
        <Pagination
            count={100}
            size="large"
            color="primary"
            onChange={(_e, value) => setskipNumber(value - 1)}
        />
    )
}

function generateCSVButton(transporterDueData: OverallProps[]) {
    return (
        <div style={{ float: 'right', marginTop: '10px' }}>
            <Button onClick={() => download(transporterDueData)} variant="contained">
                Generate Form
            </Button>
        </div>
    )
}
