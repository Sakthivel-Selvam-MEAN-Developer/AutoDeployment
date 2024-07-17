import React from 'react'
import { Box, CircularProgress } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

interface Props {
    allPricePoint: PricePointProps[]
    loading: boolean
}
interface PricePointProps {
    freightAmount: number
    transporterAmount: number
    transporterPercentage: number
    payGeneratingDuration: number
    transporterAdvancePercentage: number
    loadingPoint: LocationProps
    unloadingPoint: LocationProps
    stockPoint: LocationProps
}
interface LocationProps {
    name: string
    cementCompany: CompanyProps
}
interface CompanyProps {
    name: string
}
const columns: GridColDef[] = [
    { field: 'id', headerName: '#', width: 70 },
    { field: 'companyName', headerName: 'Company Name', width: 250 },
    { field: 'loadingPoint', headerName: 'Loading Point', width: 200 },
    { field: 'unloadingPoint', headerName: 'Unloading Point', width: 200 },
    { field: 'stockPoint', headerName: 'Stock Point', width: 200 },
    { field: 'freightAmount', headerName: 'Freight Amount', width: 150 },
    { field: 'transporterPercentage', headerName: 'Transporter %', width: 180 },
    { field: 'transporterAmount', headerName: 'Transporter Amount', width: 180 },
    { field: 'payGeneratingDuration', headerName: 'Pay Generating Duration', width: 180 },
    {
        field: 'initialPayPercentage',
        headerName: 'InitialPay %',
        width: 180
    }
]

const mapData = (allPricePoint: PricePointProps[]) => {
    return allPricePoint.map((pricePoint, index) => ({
        id: index + 1,
        companyName: pricePoint.unloadingPoint
            ? pricePoint.unloadingPoint.cementCompany.name
            : pricePoint.loadingPoint.cementCompany.name,
        loadingPoint: pricePoint.loadingPoint ? pricePoint.loadingPoint.name : 'Null',
        unloadingPoint: pricePoint.unloadingPoint ? pricePoint.unloadingPoint.name : 'Null',
        stockPoint: pricePoint.stockPoint ? pricePoint.stockPoint.name : 'Null',
        freightAmount: pricePoint.freightAmount,
        transporterPercentage: pricePoint.transporterPercentage,
        transporterAmount: pricePoint.transporterAmount,
        payGeneratingDuration: pricePoint.payGeneratingDuration,
        transporterAdvancePercentage: pricePoint.transporterAdvancePercentage
    }))
}
export const CircularLoader = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
        </Box>
    )
}
const TablePricePoint: React.FC<Props> = ({ allPricePoint, loading }) => {
    const rows = mapData(allPricePoint)
    return (
        <Box sx={{ height: 500, width: '100%' }}>
            {loading ? <CircularLoader /> : <DataGrid rows={rows} columns={columns} />}
        </Box>
    )
}
const ListAllPricePoint: React.FC<Props> = ({ allPricePoint, loading }) => {
    return (
        <>
            <TablePricePoint allPricePoint={allPricePoint} loading={loading} />
            <br />
            <br />
        </>
    )
}
export default ListAllPricePoint
