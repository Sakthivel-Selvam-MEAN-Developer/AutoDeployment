// import { FC } from 'react'
// import { Box, Tabs, Tab } from '@mui/material'
//
// import { tripDetails, tripDetailsProps } from './types'
// export interface tripProps {
//     tripDetails: tripDetails[]
//     setTripId: React.Dispatch<React.SetStateAction<tripDetailsProps[]>>
//     setTripDetails: React.Dispatch<React.SetStateAction<tripDetails[]>>
// }
// const ListAllTripForInvoice: FC<tripProps> = ({ tripDetails, setTripId, setTripDetails }) => {
//     const { filterData, setFilterData } = useContext(invoiceFilterData)
//     const handleChange = async (_event: React.SyntheticEvent, newValue: string) => {
//         if (filterData.cementCompany.name === '') return
//         setTripDetails([])
//         setTripId([])
//         await getTripDetailsByFilterData({ ...filterData, pageName: newValue }).then(setTripDetails)
//         setFilterData((prevData: filterDataProps) => {
//             return { ...prevData, pageName: newValue }
//         })
//     }
//     return (
//         <>
//             <Box sx={{ width: '100%' }}>
//                 <InvoiceTabs handleChange={handleChange} />
//             </Box>
//             <InvoiceContainer
//                 tripDetails={tripDetails}
//                 setTripId={setTripId}
//                 setTripDetails={setTripDetails}
//             />
//         </>
//     )
// }

// interface InvoiceTabs {
//     handleChange: (_event: React.SyntheticEvent, newValue: string) => Promise<void>
// }
// const InvoiceTabs: FC<InvoiceTabs> = ({ handleChange }) => {
//     return (
//         <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//             <Tabs onChange={handleChange} aria-label="basic tabs example">
//                 <Tab label="Direct Trip" value="LoadingToUnloading" />
//                 <Tab label="LoadingToStock Trip" value="LoadingToStock" />
//                 <Tab label="StockToUnloading Trip" value="StockToUnloading" />
//             </Tabs>
//         </Box>
//     )
// }
// export default ListAllTripForInvoice
