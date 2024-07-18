import { DataGrid } from '@mui/x-data-grid'
import { Box, Button, Pagination, Stack } from '@mui/material'
import exportFromJSON from 'export-from-json'
import { epochToMinimalDate } from '../../../../commonUtils/epochToTime'
import { FC } from 'react'

interface unloadingProps {
    unloadingPoint: {
        name: string
    }
}

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
            employee?: {
                name: string
            }
        }
    }
    stockPointToUnloadingPointTrip: unloadingProps[]
    endDate: number
    invoiceNumber: string
    loadingPoint: {
        name: string
    }
    unloadingPoint: {
        name: string
    }
    filledLoad: string
    startDate: number
}
interface truck {
    vehicleNumber: string
    transporter: {
        name: string
        csmName: string
        employee?: {
            name: string
        }
    }
}
interface Props {
    acknowledgementStatus: boolean
    loadingPointToStockPointTrip: Row
    loadingPointToUnloadingPointTrip: Row
    shortageQuantity: shortageQuantity[]
    truck: truck
}

interface shortageQuantity {
    unloadedDate: number
}

interface listoverallTripProps {
    acknowledgementDueDetails: Props[]
    setskipNumber: React.Dispatch<React.SetStateAction<number>>
    totalTrips: number
}

const columns = [
    { field: 'id', headerName: '#', flex: 1, minWidth: 100 },
    { field: 'vehicleNumber', headerName: 'Vehicle Number', flex: 1, minWidth: 100 },
    { field: 'startDate', headerName: 'Start Date', flex: 1, minWidth: 100 },
    { field: 'loadingPoint', headerName: 'Loading Point', flex: 1, minWidth: 100 },
    { field: 'unloadingPoint', headerName: 'Unloading Point', flex: 1, minWidth: 100 },
    { field: 'unloadDate', headerName: 'Unloading Date', flex: 1, minWidth: 100 },
    { field: 'invoiceNumber', headerName: 'Invoice Number', flex: 1, minWidth: 100 },
    { field: 'transporterName', headerName: 'Transporter Name', flex: 1, minWidth: 100 },
    { field: 'csmName', headerName: 'CSM Name', flex: 1, minWidth: 100 }
]

const ListAllAcknowledgementDueDetails = ({
    acknowledgementDueDetails,
    setskipNumber,
    totalTrips
}: listoverallTripProps) => {
    const rows = acknowledgementDueDetails.map((row, index) => ({
        id: index + 1,
        vehicleNumber: row.truck.vehicleNumber,
        startDate: epochToMinimalDate(
            row.loadingPointToUnloadingPointTrip !== null
                ? row.loadingPointToUnloadingPointTrip.startDate
                : row.loadingPointToStockPointTrip.startDate
        ),
        loadingPoint:
            row.loadingPointToUnloadingPointTrip !== null
                ? row.loadingPointToUnloadingPointTrip.loadingPoint.name
                : row.loadingPointToStockPointTrip.loadingPoint.name,
        unloadingPoint:
            row.loadingPointToUnloadingPointTrip !== null
                ? row.loadingPointToUnloadingPointTrip.unloadingPoint.name
                : row.loadingPointToStockPointTrip.stockPointToUnloadingPointTrip[0].unloadingPoint
                      .name,
        unloadDate: epochToMinimalDate(row.shortageQuantity[0].unloadedDate),
        invoiceNumber:
            row.loadingPointToUnloadingPointTrip !== null
                ? row.loadingPointToUnloadingPointTrip.invoiceNumber
                : row.loadingPointToStockPointTrip.invoiceNumber,
        transporterName: row.truck.transporter.name,
        csmName: row.truck.transporter.employee?.name || row.truck.transporter.csmName
    }))
    const download = () => {
        const downloadtripData = rows.map((row) => ({
            vehicleNumber: row.vehicleNumber,
            startDate: row.startDate,
            invoiceNumber: row.invoiceNumber,
            unloadDate: row.unloadDate,
            transporterName: row.transporterName,
            csmName: row.csmName
        }))
        const fileName = 'Acknowledgement Due Dates'
        const exportType = exportFromJSON.types.csv
        exportFromJSON({ data: downloadtripData, fileName, exportType })
    }

    return (
        <>
            <br />
            <div style={{ float: 'right', marginTop: '10px' }}>
                <Button onClick={download} variant="contained">
                    Generate Form
                </Button>
            </div>
            <br />
            <br />
            <br />
            <Box sx={{ height: 400, width: '94vw' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[100]}
                    disableRowSelectionOnClick
                    hideFooter
                />
            </Box>
            <div
                style={{
                    display: 'flex',
                    bottom: 0,
                    width: '100%',
                    justifyContent: 'center',
                    padding: '10px 0',
                    background: 'white',
                    position: 'sticky'
                }}
            >
                <PaginationContainer totalTrips={totalTrips} setskipNumber={setskipNumber} />
            </div>
        </>
    )
}
interface PaginationProps {
    setskipNumber: React.Dispatch<React.SetStateAction<number>>
    totalTrips: number
}
const PaginationContainer: FC<PaginationProps> = ({ totalTrips, setskipNumber }) => {
    return (
        <Stack spacing={10}>
            <Pagination
                count={Math.ceil(totalTrips / 15)}
                size="large"
                color="primary"
                onChange={(_e, value) => setskipNumber(value - 1)}
            />
        </Stack>
    )
}
export default ListAllAcknowledgementDueDetails
