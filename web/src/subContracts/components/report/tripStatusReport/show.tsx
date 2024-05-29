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
import { FLOAT } from 'html2canvas/dist/types/css/property-descriptors/float'

interface Row {
    acknowledgementDate: number
    billNo: string
    stockPointToUnloadingPointTrip: [
        {
            unloadingPoint: {
                name: string
            }
            billNo: string
        }
    ]

    transporterInvoice: string
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
            gstPercentage: FLOAT | string
        }
    }
    endDate: number
    invoiceNumber: string
    loadingPoint: {
        name: string
        cementCompany: {
            name: string
        }
    }
    unloadingPoint: {
        name: string
    }
    loadingKilometer: number
    unloadingKilometer: number
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
    unloadedDate: number
    shortageQuantity: number | string
    shortageAmount: number | string
}
interface bunk {
    bunkName: string
}
interface Props {
    acknowledgementStatus: boolean
    acknowledgementDate: number
    loadingPointToStockPointTrip: Row
    loadingPointToUnloadingPointTrip: Row
    stockPointToUnloadingPointTrip: Row
    paymentDues: paymentType[]
    fuel: fuel[]
    shortageQuantity: shortage[]
    number: number
    transporterInvoice: string
}
interface paymentType {
    dueDate: number
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
    cementCompany: string
    vehicleNumber: string
    startDate: string
    invoiceNumber: string
    transporterName: string
    gstPercentage: FLOAT | string
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
    transporterInvoice: string
    primaryBillNo: string
    secondaryBillNo: string
    bunkName: string
    fuelQuantity: string | number
    fuelPrice: string | number
    quantity: string | number
    amount: string | number
    status: string
    acknowledgementDate: string
    unloadedDate: string
    ranKm: number
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
    { field: 'cementCompany', headerName: 'CementCompany Name', width: 240 },
    { field: 'vehicleNumber', headerName: 'Vehicle Number', width: 150 },
    { field: 'startDate', headerName: 'Start Date', width: 120 },
    { field: 'invoiceNumber', headerName: 'Invoice Number', width: 150 },
    { field: 'transporterName', headerName: 'Transporter', width: 240 },
    { field: 'gstPercentage', headerName: 'GST Percentage', width: 200 },
    { field: 'csmName', headerName: 'CSM Name', width: 130 },
    { field: 'loadingPoint', headerName: 'Loading Point', width: 150 },
    { field: 'stockPoint', headerName: 'Stock Point', width: 150 },
    { field: 'unloadingPoint', headerName: 'Unloading Point', width: 150 },
    { field: 'filledLoad', headerName: 'Filled Load', width: 100 },
    { field: 'transporterAmount', headerName: 'Transporter Rate', width: 130 },
    { field: 'totalTransporterAmount', headerName: 'Total Transporter Amount', width: 180 },
    { field: 'transporterInvoice', headerName: 'Transporter Invoice', width: 150 },
    { field: 'primaryBillNo', headerName: 'Primary BillNo', width: 150 },
    { field: 'secondaryBillNo', headerName: 'Secondary BillNo', width: 150 },
    { field: 'bunkName', headerName: 'Bunk Name', width: 190 },
    { field: 'fuelQuantity', headerName: 'Diesel Quantity', width: 140 },
    { field: 'fuelPrice', headerName: 'Diesel Amount', width: 140 },
    { field: 'unloadedDate', headerName: 'Unloaded Date', width: 150 },
    { field: 'ranKm', headerName: 'Total Ran Kilometer', width: 150 },
    { field: 'quantity', headerName: 'Shortage Quantity', width: 150 },
    { field: 'amount', headerName: 'Shortage Amount', width: 150 },
    { field: 'acknowledgementDate', headerName: 'Acknowledgement Date', width: 150 },
    { field: 'status', headerName: 'Trip Status', width: 230 },
    { field: 'type', headerName: 'Payment Status', width: 150 }
]
const checkPaymentStatus = (arrayOfDues: paymentType[]) => {
    if (!arrayOfDues || arrayOfDues.length === 0) return 'No payment data available'
    const initial = arrayOfDues.filter((due) => {
        return due.type === 'initial pay' && due.status === true
    })
    const final = arrayOfDues.filter((due) => {
        return due.type === 'final pay' && due.status === true
    })
    const gst = arrayOfDues.filter((due) => due.type === 'gst pay')
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
    if (authoriser && !columns.some((column) => column.field === 'freightAmount')) {
        const freightAmount = { field: 'freightAmount', headerName: 'Freight Rate', width: 100 }
        const totalFreightAmount = {
            field: 'totalFreightAmount',
            headerName: 'Total Freight Amount',
            width: 150
        }
        const margin = { field: 'margin', headerName: 'Margin', width: 100 }

        // Find the index of 'bunkName' field in columns array
        const bunkNameIndex = columns.findIndex((column) => column.field === 'bunkName')

        // If 'bunkName' field is found, splice the new columns at that index
        if (bunkNameIndex !== -1)
            columns.splice(bunkNameIndex, 0, freightAmount, totalFreightAmount, margin)
    }
}

const generateRow = (row: Props, index: number) => {
    const data = loadingToStock(row)
    const loadingKilometer = data.loadingKilometer
    const unloadingKilometer = data.unloadingKilometer
    const ranKm =
        unloadingKilometer - loadingKilometer >= 0 ? unloadingKilometer - loadingKilometer : 0
    let primaryBillNo = 'unbilled'
    let secondaryBillNo = 'unbilled'
    if (row.loadingPointToUnloadingPointTrip) {
        primaryBillNo = row.loadingPointToUnloadingPointTrip.billNo ?? 'unbilled'
        secondaryBillNo = 'Not Applicable'
    } else if (row.loadingPointToStockPointTrip) {
        primaryBillNo = row.loadingPointToStockPointTrip.billNo ?? 'unbilled'
        if (
            row.loadingPointToStockPointTrip.stockPointToUnloadingPointTrip &&
            row.loadingPointToStockPointTrip.stockPointToUnloadingPointTrip.length > 0
        ) {
            secondaryBillNo =
                row.loadingPointToStockPointTrip.stockPointToUnloadingPointTrip[0].billNo ??
                'unbilled'
        }
    }
    finalData.push({
        number: ++index,
        cementCompany: data.loadingPoint.cementCompany.name,
        vehicleNumber: data.truck.vehicleNumber,
        startDate: epochToMinimalDate(data.startDate),
        invoiceNumber: data.invoiceNumber,
        transporterName: data.truck.transporter.name,
        gstPercentage: data.truck.transporter.gstPercentage
            ? data.truck.transporter.gstPercentage
            : 'No GST',
        csmName: data.truck.transporter.csmName,
        loadingPoint: data.loadingPoint.name,
        stockPoint: data.stockPoint ? data.stockPoint.name : 'Null',
        unloadingPoint: data.unloadingPoint ? data.unloadingPoint.name : 'null',
        filledLoad: data.filledLoad,
        freightAmount: data.freightAmount,
        transporterAmount: data.transporterAmount,
        totalFreightAmount: data.totalFreightAmount,
        totalTransporterAmount: data.totalTransporterAmount,
        margin: data.margin,
        transporterInvoice: row.transporterInvoice ? 'Yes' : 'No',
        primaryBillNo,
        secondaryBillNo,
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
              : 'Acknowledgement received',
        type: checkPaymentStatus(row.paymentDues),
        acknowledgementDate: row.acknowledgementDate
            ? epochToMinimalDate(row.acknowledgementDate)
            : 'Needed to be Acknowledge',
        unloadedDate:
            row.shortageQuantity.length !== 0
                ? epochToMinimalDate(row.shortageQuantity[0].unloadedDate)
                : 'Not Yet Unloaded',
        ranKm
    })
    console.log(finalData)
}

const DataGridTable: FC<dataGridTableProps> = ({ overallTrips, authoriser }) => {
    finalData = []
    overallTrips.map((row: Props, index: number) => generateRow(row, index))
    addAuthorisedColumns(authoriser)
    return (
        <div>
            <DataGrid
                sx={{ width: '94vw', height: '27vw' }}
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
        row.loadingPointToUnloadingPointTrip !== undefined
    ) {
        return {
            ...row.loadingPointToUnloadingPointTrip,
            unloadingPoint: row.loadingPointToUnloadingPointTrip.unloadingPoint
        }
    } else if (
        row.loadingPointToStockPointTrip !== null &&
        row.stockPointToUnloadingPointTrip !== null
    ) {
        return {
            ...row.loadingPointToStockPointTrip,
            unloadingPoint: row.stockPointToUnloadingPointTrip.unloadingPoint
        }
    } else {
        return row.loadingPointToStockPointTrip
    }
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
