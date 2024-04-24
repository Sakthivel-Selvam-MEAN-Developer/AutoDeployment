import { epochToMinimalDate } from '../../../../commonUtils/epochToTime'
import { Button, Pagination, Stack } from '@mui/material'
import exportFromJSON from 'export-from-json'
import { CheckUser } from '../../../../auth/checkUser.tsx'
import { Dispatch, FC, useContext } from 'react'
import { dispatchData, filterData } from './tripStatusContext.ts'
import { TripFilters } from '../../../types/tripFilters.ts'
import { tripStatusFilter } from '../../../services/overallTrips.ts'
import { overallTripsProps } from './tripFilterForm.tsx'
import { DataGrid } from '@mui/x-data-grid'

interface Row {
    stockPointToUnloadingPointTrip: [
        {
            unloadingPoint: {
                name: string
            }
        }
    ]
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
interface shortage {
    shortageQuantity: number | string
    shortageAmount: number | string
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
    shortageQuantity: shortage[]
    number: number
}
interface paymentType {
    type: string
    status: boolean
}
interface listoverallTripProps {
    overallTrips: Props[]
    setOverallTrips: React.Dispatch<React.SetStateAction<never[]>>
    setCount: React.Dispatch<React.SetStateAction<number>>
    count: number
}
interface stackProps {
    setOverallTrips: React.Dispatch<React.SetStateAction<never[]>>
    setCount: React.Dispatch<React.SetStateAction<number>>
    dispatch: Dispatch<ActionType>
    count: number
}
interface dataGridTableProps {
    overallTrips: Props[]
    authoriser: boolean
}
interface finalDataProps {
    number: number
    vehicleNumber: string
    startDate: string
    invoiceNumber: string
    transporterName: string
    csmName: string
    loadingPoint: string
    stockPoint: string
    unloadingPoint: string
    filledLoad: string
    freightAmount: number
    transporterAmount: number
    totalFreightAmount: number
    totalTransporterAmount: number
    margin: number
    bunkName: string
    fuelQuantity: string | number
    fuelPrice: string | number
    quantity: string | number
    amount: string | number
    status: string
    type: string
}

export type ActionType = { type: string; pageNumber: number }

const style = {
    display: 'flex',
    bottom: '0',
    width: '100%',
    justifyContent: 'center',
    padding: '10px 0',
    background: 'white'
}
let finalData: finalDataProps[] = []
const columns = [
    { field: 'number', headerName: '#', width: 50 },
    { field: 'vehicleNumber', headerName: 'Vehicle Number', width: 150 },
    { field: 'startDate', headerName: 'Start Date', width: 120 },
    { field: 'invoiceNumber', headerName: 'Invoice Number', width: 150 },
    { field: 'transporterName', headerName: 'Transporter', width: 240 },
    { field: 'csmName', headerName: 'CSM Name', width: 130 },
    { field: 'loadingPoint', headerName: 'Loading Point', width: 150 },
    { field: 'stockPoint', headerName: 'Stock Point', width: 150 },
    { field: 'unloadingPoint', headerName: 'Unloading Point', width: 150 },
    { field: 'filledLoad', headerName: 'Filled Load', width: 100 },
    { field: 'transporterAmount', headerName: 'Transporter Rate', width: 130 },
    { field: 'totalTransporterAmount', headerName: 'Total Transporter Amount', width: 180 },
    { field: 'bunkName', headerName: 'Bunk Name', width: 190 },
    { field: 'fuelQuantity', headerName: 'Diesel Quantity', width: 140 },
    { field: 'fuelPrice', headerName: 'Diesel Amount', width: 140 },
    { field: 'quantity', headerName: 'Shortage Quantity', width: 150 },
    { field: 'amount', headerName: 'Shortage Amount', width: 150 },
    { field: 'status', headerName: 'Trip Status', width: 230 },
    { field: 'type', headerName: 'Payment Status', width: 150 }
]
const checkPaymentStatus = (arrayOfDues: paymentType[]) => {
    const initial = arrayOfDues.filter((due) => {
        return due.type === 'initial pay' && due.status === true
    })
    const final = arrayOfDues.filter((due) => {
        return due.type === 'final pay' && due.status === true
    })
    const gst = arrayOfDues.filter((due) => {
        return due.type === 'gst pay'
    })
    return initial.length !== 1
        ? 'Advance Pending'
        : final.length === 1
          ? gst.length === 1
              ? gst[0].status === true
                  ? 'Completed'
                  : 'GST Pending'
              : 'Paid'
          : 'Balance Pending'
}

const downloadCSV = (listoverallTrip: Props[], authoriser: boolean) => {
    const downloadtripData: finalDataProps[] = finalData
    if (!authoriser && downloadtripData.length === listoverallTrip.length) {
        downloadtripData.forEach((data: Partial<finalDataProps>) => {
            delete data.freightAmount
            delete data.totalFreightAmount
            delete data.margin
        })
    }
    const data = downloadtripData
    const fileName = 'List_of_Trips'
    const exportType = exportFromJSON.types.csv
    exportFromJSON({ data, fileName, exportType })
}

const addAuthorisedColumns = (authoriser: boolean) => {
    if (!authoriser || columns.some((column) => Object.keys(column).includes('freightAmount')))
        return
    const freightAmount = { field: 'freightAmount', headerName: 'Freight Rate', width: 100 }
    const totalFreightAmount = {
        field: 'totalFreightAmount',
        headerName: 'Total Freight Amount',
        width: 150
    }
    const margin = { field: 'margin', headerName: 'Margin', width: 100 }
    const bunkNameIndex = columns.findIndex((column) => column.field === 'bunkName')
    if (bunkNameIndex !== -1)
        columns.splice(bunkNameIndex, 0, freightAmount, totalFreightAmount, margin)
}

const generateRow = (row: Props, index: number) => {
    const data = loadingToStock(row)
    const unloadingPoint = data.stockPointToUnloadingPointTrip
        ? data.stockPointToUnloadingPointTrip[0].unloadingPoint.name
        : data.unloadingPoint.name
    finalData.push({
        number: ++index,
        vehicleNumber: data.truck.vehicleNumber,
        startDate: epochToMinimalDate(data.startDate),
        invoiceNumber: data.invoiceNumber,
        transporterName: data.truck.transporter.name,
        csmName: data.truck.transporter.csmName,
        loadingPoint: data.loadingPoint.name,
        stockPoint: data.stockPoint ? data.stockPoint.name : 'Null',
        unloadingPoint,
        filledLoad: data.filledLoad,
        freightAmount: data.freightAmount,
        transporterAmount: data.transporterAmount,
        totalFreightAmount: data.totalFreightAmount,
        totalTransporterAmount: data.totalTransporterAmount,
        margin: data.margin,
        bunkName: row.fuel.length !== 0 ? row.fuel[0].bunk.bunkName : 'Not Fueled',
        fuelQuantity: row.fuel.length !== 0 ? row.fuel[0].quantity : 'Not Fueled',
        fuelPrice: row.fuel.length !== 0 ? row.fuel[0].totalprice : 'Not Fueled',
        quantity:
            row.shortageQuantity.length !== 0
                ? row.shortageQuantity[0].shortageQuantity
                : 'No Shortage',
        amount:
            row.shortageQuantity.length !== 0
                ? row.shortageQuantity[0].shortageAmount
                : 'No Shortage',
        status: !data.tripStatus
            ? 'Running'
            : !row.acknowledgementStatus
              ? 'Waiting For Acknowledgement'
              : 'Completed',
        type: checkPaymentStatus(row.paymentDues)
    })
}

const DataGridTable: FC<dataGridTableProps> = ({ overallTrips, authoriser }) => {
    finalData = []
    overallTrips.map((row: Props, index: number) => generateRow(row, index))
    addAuthorisedColumns(authoriser)
    return (
        <div>
            <DataGrid
                sx={{ width: '94vw' }}
                rows={finalData}
                columns={columns}
                getRowId={(row) => row.number}
            />
        </div>
    )
}

const generateCSVbutton = (listoverallTrip: Props[], authoriser: boolean) => {
    return (
        <div style={{ float: 'right', marginTop: '10px', marginBottom: '20px' }}>
            <Button onClick={() => downloadCSV(listoverallTrip, authoriser)} variant="contained">
                Generate CSV
            </Button>
        </div>
    )
}

const StackPage: FC<stackProps> = ({ setOverallTrips, dispatch, count, setCount }) => {
    const oldFilterData = useContext(filterData)
    return (
        <div style={{ ...style, position: 'sticky' }}>
            <Stack spacing={10}>
                {PaginationField(dispatch, oldFilterData, setOverallTrips, count, setCount)}
            </Stack>
        </div>
    )
}
const PaginationField = (
    dispatch: Dispatch<ActionType>,
    oldFilterData: TripFilters | null,
    setOverallTrips: React.Dispatch<React.SetStateAction<never[]>>,
    count: number,
    setCount: React.Dispatch<React.SetStateAction<number>>
) => {
    return (
        <Pagination
            count={parseInt((count / 200).toString()) + (count % 200 === 0 || count < 200 ? 0 : 1)}
            size="large"
            color="primary"
            onChange={(_e, value) => {
                if (value !== oldFilterData?.pageNumber) {
                    dispatch({ pageNumber: value, type: 'updatePageNumber' })
                    tripStatusFilter({ ...oldFilterData, pageNumber: value }).then(
                        (data: overallTripsProps) => {
                            setOverallTrips(data.filterData)
                            setCount(data.count)
                        }
                    )
                }
            }}
        />
    )
}

const loadingToStock = (row: Props) => {
    if (
        row.loadingPointToUnloadingPointTrip !== null &&
        row.loadingPointToStockPointTrip !== undefined
    )
        return row.loadingPointToUnloadingPointTrip
    else if (
        row.stockPointToUnloadingPointTrip !== null &&
        row.stockPointToUnloadingPointTrip !== undefined
    ) {
        return {
            ...row.loadingPointToStockPointTrip,
            unloadingPoint: row.stockPointToUnloadingPointTrip.unloadingPoint
        }
    } else return row.loadingPointToStockPointTrip
}

const ListAllDetails: React.FC<listoverallTripProps> = ({
    setOverallTrips,
    overallTrips,
    count,
    setCount
}) => {
    const authoriser = CheckUser()
    const { dispatch } = useContext(dispatchData)
    if (overallTrips && overallTrips.length === 0) return
    return (
        <>
            {generateCSVbutton(overallTrips, authoriser.adminAccess)}
            <DataGridTable overallTrips={overallTrips} authoriser={authoriser.adminAccess} />
            <StackPage
                dispatch={dispatch}
                setOverallTrips={setOverallTrips}
                count={count}
                setCount={setCount}
            />
        </>
    )
}

export default ListAllDetails
