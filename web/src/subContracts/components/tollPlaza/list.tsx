import { Button, Typography } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TollPlazaTable from './listForAllTrip'
import { getOveralltripByToll } from '../../services/overallTrips'
import { getOverallTripWithTollDetailsNotEmpty } from '../../services/tollPlaza'
import { overallTripp } from './type'
const button = <Link to={'/sub/tollPlaza/tollInvoice'}>{newFunction()}</Link>
function newFunction() {
    return <Button variant="contained">Download Invoice</Button>
}
const ShowButton = (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography>Toll Plaza Entries for all UnloadingTrip</Typography>
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
            {TollPlazaDisplay(trips, setReload, reload, setDisplay, display)}
        </>
    )
}
export default ListTrips
const TollPlazaDisplay = (
    trips: never[],
    setReload: React.Dispatch<React.SetStateAction<boolean>>,
    reload: boolean,
    setDisplay: React.Dispatch<React.SetStateAction<overallTripp[]>>,
    display: overallTripp[]
) => {
    return (
        <TollPlazaTable
            trip={trips}
            setReload={setReload}
            reload={reload}
            setDisplay={setDisplay}
            display={display}
        />
    )
}
