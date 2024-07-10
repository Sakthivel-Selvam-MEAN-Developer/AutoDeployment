import { epochToMinimalDate } from '../../../../commonUtils/epochToTime'
import { Button, Pagination, Stack } from '@mui/material'
import exportFromJSON from 'export-from-json'
import { CheckUser } from '../../../../auth/checkUser.tsx'
import { Dispatch, FC, useContext, useState } from 'react'
import { dispatchData, filterData } from './tripStatusContext.ts'
import { TripFilters } from '../../../types/tripFilters.ts'
import { tripStatusFilter } from '../../../services/overallTrips.ts'
import { overallTripsProps } from './tripFilterForm.tsx'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { FLOAT } from 'html2canvas/dist/types/css/property-descriptors/float'
import { DialogBox } from './dialogBox.tsx'

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
    unloadedQuantity: number | string
}
interface bunk {
    bunkName: string
}
interface Props {
    id: number
    acknowledgementStatus: boolean
    acknowledgementApproval: boolean
    acknowledgementDate: number
    loadingPointToStockPointTrip: Row
    loadingPointToUnloadingPointTrip: Row
    stockPointToUnloadingPointTrip: Row
    truck: {
        vehicleNumber: string
        transporter: {
            name: string
            csmName: string
            gstPercentage: FLOAT | string
        }
    }
    paymentDues: paymentType[]
    fuel: fuel[]
    shortageQuantity: shortage[]
    number: number
    transporterInvoice: string
    transporterInvoiceReceivedDate: number
}
interface paymentType {
    dueDate: number
    type: string
    status: boolean
}
interface listTripProps {
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
export interface finalDataProps {
    id: number
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
    loadedQuantity: number | string
    tripRoute: string
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
    unloadedQuantity: number | string
    shortageQuantity: string | number
    shortageAmount: string | number
    status: string
    acknowledgementDate: string
    unloadedDate: string
    ranKm: number
    paymentStatus: string
    driverName?: string | null
    totalExpense?: number | string
    advanceAmount?: number | string
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
    { field: 'number', headerName: '#', maxWidth: 40, minWidth: 10 },
    { field: 'cementCompany', headerName: 'CementCompany Name', width: 200 },
    { field: 'vehicleNumber', headerName: 'Vehicle Number', width: 150 },
    { field: 'startDate', headerName: 'Start Date', width: 80 },
    { field: 'loadedQuantity', headerName: 'Loaded Quantity', width: 80 },
    { field: 'loadingPoint', headerName: 'Loading Point', width: 150 },
    { field: 'stockPoint', headerName: 'Stock Point', width: 150 },
    { field: 'unloadingPoint', headerName: 'Unloading Point', width: 150 },
    { field: 'invoiceNumber', headerName: 'Invoice Number', width: 150 },
    { field: 'transporterName', headerName: 'Transporter', width: 240 },
    { field: 'csmName', headerName: 'CSM Name', width: 130 },
    {
        field: 'action',
        headerName: 'Action',
        width: 150,
        renderCell: (params: any) => (
            <Button onClick={() => params.handleShowMore(params.row)} variant="contained">
                Show More
            </Button>
        )
    }
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
        const bunkNameIndex = columns.findIndex((column) => column.field === 'bunkName')
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
    const unloadedQuantity =
        row.shortageQuantity.length !== 0
            ? row.shortageQuantity[0].unloadedQuantity
            : 'Not Yet Unloaded'
    finalData.push({
        id: row.id,
        number: ++index,
        cementCompany: data.loadingPoint.cementCompany.name,
        vehicleNumber: row.truck.vehicleNumber,
        startDate: epochToMinimalDate(data.startDate),
        invoiceNumber: data.invoiceNumber,
        transporterName: row.truck.transporter.name,
        gstPercentage: row.truck.transporter.gstPercentage
            ? row.truck.transporter.gstPercentage
            : 'No GST',
        csmName: row.truck.transporter.csmName,
        loadingPoint: data.loadingPoint.name,
        loadedQuantity: data.filledLoad,
        stockPoint: data.stockPoint ? data.stockPoint.name : 'Null',
        unloadingPoint: data.unloadingPoint ? data.unloadingPoint.name : 'null',
        freightAmount: data.freightAmount,
        transporterAmount: data.transporterAmount,
        totalFreightAmount: data.totalFreightAmount,
        totalTransporterAmount: data.totalTransporterAmount,
        margin: data.margin,
        transporterInvoice: row.transporterInvoice
            ? row.transporterInvoiceReceivedDate !== null
                ? epochToMinimalDate(row.transporterInvoiceReceivedDate)
                : ''
            : 'No',
        primaryBillNo,
        secondaryBillNo,
        tripRoute: `${data.loadingPoint.name} to ${data.unloadingPoint ? data.unloadingPoint.name : 'null'}`,
        bunkName: row.fuel.length !== 0 ? row.fuel[0].bunk.bunkName : 'Not Fueled',
        fuelQuantity: row.fuel.length !== 0 ? row.fuel[0].quantity : 'Not Fueled',
        fuelPrice: row.fuel.length !== 0 ? row.fuel[0].totalprice : 'Not Fueled',
        unloadedQuantity: unloadedQuantity,
        shortageQuantity:
            row.shortageQuantity.length !== 0
                ? row.shortageQuantity[0].shortageQuantity
                : 'No Shortage',
        shortageAmount:
            row.shortageQuantity.length !== 0
                ? row.shortageQuantity[0].shortageAmount
                : 'No Shortage',
        status: !data.tripStatus
            ? 'Running'
            : !row.acknowledgementStatus
              ? 'Waiting For Acknowledgement'
              : 'Acknowledgement received',
        paymentStatus: checkPaymentStatus(row.paymentDues),
        acknowledgementDate: row.acknowledgementDate
            ? epochToMinimalDate(row.acknowledgementDate)
            : 'Needed to be Acknowledge',
        unloadedDate:
            row.shortageQuantity.length !== 0
                ? epochToMinimalDate(row.shortageQuantity[0].unloadedDate)
                : 'Not Yet Unloaded',
        ranKm
    })
}
const DataGridTable: React.FC<dataGridTableProps> = ({ overallTrips, authoriser }) => {
    const [openDialog, setOpenDialog] = useState(false)
    const [selectedRow, setSelectedRow] = useState<finalDataProps | null>(null)
    const [selectedId, setSelectedId] = useState<number | undefined>(undefined)
    const handleShowMore = (row: finalDataProps) => {
        setSelectedRow(row)
        setSelectedId(row.id)
        setOpenDialog(true)
    }
    finalData = []
    overallTrips.map((row: Props, index: number) => generateRow(row, index))
    addAuthorisedColumns(authoriser)
    const adjustedColumns: GridColDef[] = columns.map((column) => ({
        flex: 0.5,
        ...column,
        type: 'string',
        renderCell: (params) => {
            if (column.field === 'action') {
                return (
                    <Button
                        onClick={() => handleShowMore(params.row)}
                        variant="contained"
                        size="small"
                    >
                        Show More
                    </Button>
                )
            }
            return params.value
        }
    }))
    return (
        <div>
            <DataGrid
                sx={{ width: '88vw', height: '27vw', marginLeft: 4 }}
                rows={finalData}
                columns={adjustedColumns}
                getRowId={(row) => row.number}
                hideFooter
            />
            {selectedRow && (
                <DialogBox
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    row={selectedRow}
                    authoriser={authoriser}
                    id={selectedId}
                    setSelectedRow={setSelectedRow}
                />
            )}
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
    } else return row.loadingPointToStockPointTrip
}

const ListAllDetails: FC<listTripProps> = ({ setOverallTrips, overallTrips, count, setCount }) => {
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
