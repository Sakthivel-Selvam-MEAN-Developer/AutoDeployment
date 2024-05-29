import { DataGrid } from '@mui/x-data-grid'
import { Button, Pagination, Stack } from '@mui/material'
import exportFromJSON from 'export-from-json'
import { epochToMinimalDate } from '../../../../commonUtils/epochToTime'

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

interface Props {
    acknowledgementStatus: boolean
    loadingPointToStockPointTrip: Row
    loadingPointToUnloadingPointTrip: Row
    shortageQuantity: shortageQuantity[]
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
    { field: 'id', headerName: '#', width: 100 },
    { field: 'vehicleNumber', headerName: 'Vehicle Number', width: 200 },
    { field: 'startDate', headerName: 'Start Date', width: 200 },
    { field: 'loadingPoint', headerName: 'Loading Point', width: 200 },
    { field: 'unloadingPoint', headerName: 'Unloading Point', width: 200 },
    { field: 'unloadDate', headerName: 'Unloading Date', width: 200 },
    { field: 'invoiceNumber', headerName: 'Invoice Number', width: 200 },
    { field: 'transporterName', headerName: 'Transporter Name', width: 250 },
    { field: 'csmName', headerName: 'CSM Name', width: 250 }
]

const ListAllAcknowledgementDueDetails = ({
    acknowledgementDueDetails,
    setskipNumber,
    totalTrips
}: listoverallTripProps) => {
    const rows = acknowledgementDueDetails.map((row, index) => ({
        id: index + 1,
        vehicleNumber:
            row.loadingPointToUnloadingPointTrip !== null
                ? row.loadingPointToUnloadingPointTrip.truck.vehicleNumber
                : row.loadingPointToStockPointTrip.truck.vehicleNumber,
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
        transporterName:
            row.loadingPointToUnloadingPointTrip !== null
                ? row.loadingPointToUnloadingPointTrip.truck.transporter.name
                : row.loadingPointToStockPointTrip.truck.transporter.name,
        csmName:
            row.loadingPointToUnloadingPointTrip !== null
                ? row.loadingPointToUnloadingPointTrip.truck.transporter.csmName
                : row.loadingPointToStockPointTrip.truck.transporter.csmName
    }))
    const download = () => {
        const downloadtripData = rows.map((row) => ({
            vehicleNumber: row.vehicleNumber,
            unloadDate: row.unloadDate,
            invoiceNumber: row.invoiceNumber,
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
            <div style={{ height: 1000, width: '100%', marginTop: '70px' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[100]}
                    pagination
                    autoHeight
                />
            </div>
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
            />
            <Stack spacing={10}>
                <Pagination
                    count={Math.ceil(totalTrips / 15)}
                    size="large"
                    color="primary"
                    onChange={(_e, value) => setskipNumber(value - 1)}
                />
            </Stack>
        </>
    )
}

export default ListAllAcknowledgementDueDetails
