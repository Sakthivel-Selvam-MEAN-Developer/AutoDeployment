import { Card, Box, CardContent, Typography } from '@mui/material'
import { FC } from 'react'

interface driverCardProps {
    content: string
    value: string
}

const Driver_Card: FC<driverCardProps> = ({ content, value }) => {
    return (
        <Card sx={{ display: 'flex', marginRight: '20px', marginTop: '20px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h6">
                        {content}
                    </Typography>
                    <Typography variant="h6" color="text.secondary" component="div">
                        {value}
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    )
}

export default Driver_Card
