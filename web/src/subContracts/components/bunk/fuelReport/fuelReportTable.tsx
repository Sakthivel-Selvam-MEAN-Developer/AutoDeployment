/* eslint-disable max-lines */
import { Dispatch, FC, useContext } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Pagination, Stack } from '@mui/material'
import { fuelFilters } from '../../../types/fuelFilters'
import { filterData, dispatchData } from './fuelContext/fuelReportContext'
import { getAllFuelReport } from '../../../services/fuel'
import { epochToMinimalDate } from '../../../../commonUtils/epochToTime'

const columns = [
    { field: 'id', headerName: '#', width: 5 },
    { field: 'bunkName', headerName: 'Bunk Name', width: 220 },
    { field: 'startDate', headerName: 'Start Date', width: 100 },
    { field: 'vehicleNumber', headerName: 'Vehicle Number', width: 100 },
    { field: 'fueledDate', headerName: 'Fueled Date', width: 100 },
    { field: 'loadingPoint', headerName: 'LoadingPoint Name', width: 120 },
    { field: 'stockPointName', headerName: 'StockPoint Name', width: 120 },
    { field: 'unLodaingPoint', headerName: 'UnLodaingPoint', width: 120 },
    { field: 'quantity', headerName: 'Quantity', width: 90 },
    { field: 'pricePerliter', headerName: 'Rate/Ltr', width: 90 },
    { field: 'totalprice', headerName: 'Amount', width: 100 },
    { field: 'fuelInvoiceNumber', headerName: 'Fuel Bill', width: 130 },
    { field: 'transactionId', headerName: 'Transaction Id', width: 130 },
    { field: 'tripInvoiceNumber', headerName: 'Trip InvoiceNumber', width: 130 },
    { field: 'dieselkilometer', headerName: 'Disel Kilometer', width: 80 }
]
const style = {
    display: 'flex',
    bottom: '0',
    width: '100%',
    justifyContent: 'center',
    padding: '10px 0',
    background: 'white'
}
export interface fuelFilter {
    data: fuelDataObject[]
    count: number
}
interface fuelDataObject {
    bunkName: string
    fuelInvoiceNumber: string
    fueledDate: number
    startDate: number
    id: number
    loadingPoint: string
    pricePerliter: number
    quantity: number
    stockPointName: string
    totalprice: number
    transactionId: string
    tripInvoiceNumber: string
    unLodaingPoint: string
    vehicleNumber: string
}
type DataGridTableProps = {
    fuelReportData: fuelDataObject[]
}
export type ActionType = { type: string; pageNumber: number }
interface stackProps {
    setfuelReportData: React.Dispatch<React.SetStateAction<never[]>>
    setCount: React.Dispatch<React.SetStateAction<number>>
    dispatch: Dispatch<ActionType>
    count: number
}
type FuelReportListProps = {
    setfuelReportData: React.Dispatch<React.SetStateAction<never[]>>
    fuelReportData: fuelDataObject[]
    setCount: React.Dispatch<React.SetStateAction<number>>
    count: number
}
const PaginationField = (
    dispatch: Dispatch<ActionType>,
    oldFilterData: fuelFilters | null,
    setfuelReportData: React.Dispatch<React.SetStateAction<never[]>>,
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
                    getAllFuelReport({ ...oldFilterData, pageNumber: value }).then((data) => {
                        setfuelReportData(data.data)
                        setCount(data.count)
                    })
                }
            }}
        />
    )
}
const StackPage: FC<stackProps> = ({ setfuelReportData, dispatch, count, setCount }) => {
    const oldFilterData = useContext(filterData)
    return (
        <div style={{ ...style, position: 'sticky' }}>
            <Stack spacing={10}>
                {PaginationField(dispatch, oldFilterData, setfuelReportData, count, setCount)}
            </Stack>
        </div>
    )
}
const DataGridTable: React.FC<DataGridTableProps> = ({ fuelReportData }) => {
    const formattedFuelReportData = fuelReportData.map((item) => ({
        ...item,
        fueledDate: epochToMinimalDate(item.fueledDate),
        startDate: item.startDate === 0 ? null : epochToMinimalDate(item.startDate)
    }))
    return (
        <DataGrid
            sx={{ width: '88vw', height: '27vw', marginLeft: 4 }}
            rows={formattedFuelReportData}
            columns={columns}
            getRowId={(row) => row.id}
        />
    )
}
const FuelReportList: FC<FuelReportListProps> = ({
    setfuelReportData,
    fuelReportData,
    count,
    setCount
}) => {
    const { dispatch } = useContext(dispatchData)
    if (fuelReportData && fuelReportData.length === 0) return
    return (
        <>
            <DataGridTable fuelReportData={fuelReportData} />
            <StackPage
                dispatch={dispatch}
                setfuelReportData={setfuelReportData}
                count={count}
                setCount={setCount}
            />
        </>
    )
}
export default FuelReportList
