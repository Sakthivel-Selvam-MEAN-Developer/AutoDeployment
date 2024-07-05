import { Box, Tab, Tabs } from '@mui/material'
import { FC, useContext } from 'react'
import { filterDataProps, invoiceFilterData } from './invoiceContext'
import { getCompanyInvoice } from '../../../services/viewInvoice'
const ListAllTripForInvoice: FC = () => {
    const { filterData, setFilterData } = useContext(invoiceFilterData)
    const handleChange = async (_event: React.SyntheticEvent, newValue: string) => {
        if (filterData.cementCompany.name === '') return
        await getCompanyInvoice(filterData).then()
        setFilterData((prevData: filterDataProps) => {
            return { ...prevData, pageName: newValue }
        })
    }
    return (
        <>
            <Box sx={{ width: '100%' }}>
                <InvoiceTabs handleChange={handleChange} />
            </Box>
        </>
    )
}
interface InvoiceTabs {
    handleChange: (_event: React.SyntheticEvent, newValue: string) => Promise<void>
}
const InvoiceTabs: FC<InvoiceTabs> = ({ handleChange }) => {
    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Direct Trip" value="LoadingToUnloading" />
                <Tab label="LoadingToStock Trip" value="LoadingToStock" />
                <Tab label="StockToUnloading Trip" value="StockToUnloading" />
            </Tabs>
        </Box>
    )
}
export default ListAllTripForInvoice
