import { Box, CircularProgress } from '@mui/material'
import ListAllTrip from './show'
import { FC } from 'react'

interface listTripsProps {
    allTrips: never[]
    allStockTrips: never[]
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>
    update: boolean
    loading: boolean
}

const ListTrips: FC<listTripsProps> = ({ allTrips, allStockTrips, setUpdate, update, loading }) => {
    return (
        <>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <ListAllTrip
                    allTrips={allTrips}
                    allStockTrips={allStockTrips}
                    setUpdate={setUpdate}
                    update={update}
                />
            )}
        </>
    )
}
export default ListTrips
