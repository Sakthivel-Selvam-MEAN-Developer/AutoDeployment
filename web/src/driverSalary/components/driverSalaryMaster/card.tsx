import { Card, Box, CardContent, Typography } from '@mui/material'
import { FC } from 'react'

interface driverCardProps {
    content: string
    value: string
}
function driverContainer(content: string, value: string) {
    return (
        <CardContent sx={{ flex: '1 0 auto' }}>
            {driverContent(content)}
            {driverValue(value)}
        </CardContent>
    )
}

function driverValue(value: string) {
    return (
        <Typography variant="h6" color="text.secondary" component="div">
            {value}
        </Typography>
    )
}

function driverContent(content: string) {
    return (
        <Typography component="div" variant="h6">
            {content}
        </Typography>
    )
}

const DriverCardField: FC<driverCardProps> = ({ content, value }) => {
    return (
        <Card sx={{ display: 'flex', marginRight: '20px', marginTop: '20px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {driverContainer(content, value)}
            </Box>
        </Card>
    )
}

export default DriverCardField
