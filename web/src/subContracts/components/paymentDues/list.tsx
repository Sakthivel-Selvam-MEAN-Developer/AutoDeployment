// import { Box, Typography } from '@mui/material'
// import { useState } from 'react'
// import BunkDues from './bunkDues'
import TransporterDues from './transporterDues'
// interface TabPanelProps {
//     children?: React.ReactNode
//     index: number
//     value: number
// }
// function CustomTabPanel(props: TabPanelProps) {
//     const { children, value, index, ...other } = props
//     return (
//         <div
//             role="tabpanel"
//             hidden={value !== index}
//             id={`simple-tabpanel-${index}`}
//             aria-labelledby={`simple-tab-${index}`}
//             {...other}
//         >
//             {value === index && (
//                 <Box sx={{ p: 3 }}>
//                     <Typography>{children}</Typography>
//                 </Box>
//             )}
//         </div>
//     )
// }
const PaymentDuesList: React.FC = () => {
    // const [value, setValue] = useState(0)
    // const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    //     setValue(newValue)
    // }
    return (
        <>
            {/* <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tabs value={value} onChange={handleChange} textColor="inherit" variant="fullWidth">
                    <Tab sx={{ borderBottom: '1px solid #e8e8e8' }} label="Transporter Dues" />
                    <Tab sx={{ borderBottom: '1px solid #e8e8e8' }} label="Bunk Dues" />
                </Tabs>
            </Box> */}
            {/* <CustomTabPanel value={value} index={0}> */}
            <TransporterDues />
            {/* </CustomTabPanel> */}
            {/* <CustomTabPanel value={value} index={1}>
                <BunkDues />
            </CustomTabPanel> */}
        </>
    )
}
export default PaymentDuesList
