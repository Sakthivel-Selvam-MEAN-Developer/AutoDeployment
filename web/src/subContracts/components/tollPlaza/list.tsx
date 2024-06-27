import { Button, Typography } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getOveralltripByToll } from '../../services/overallTrips'
import { getOverallTripWithTollDetailsNotEmpty } from '../../services/tollPlaza'
import { overallTripp } from './tollTypes'
import { tollPlazaDisplay } from './editIcon'
const button = <Link to={'/sub/toll/tollInvoice'}>{newFunction()}</Link>
function newFunction() {
    return <Button variant="contained">Download Invoice</Button>
}
const ShowButton = (
    <div
        style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
        }}
    >
        <Typography sx={{ fontWeight: 'bold' }}>
            Toll Plaza Entries for all UnloadingTrip
        </Typography>
        {button}
    </div>
)
const ListTrips: FC = () => {
    const [trips, setTrips] = useState([])
    const [reload, setReload] = useState<boolean>(false)
    const [display, setDisplay] = useState<overallTripp[]>([])
    useEffect(() => {
        getOveralltripByToll().then(setTrips)
        getOverallTripWithTollDetailsNotEmpty().then(setDisplay)
    }, [reload])
    return (
        <>
            {ShowButton}
            {tollPlazaDisplay(trips, setReload, reload, setDisplay, display)}
        </>
    )
}
export default ListTrips
