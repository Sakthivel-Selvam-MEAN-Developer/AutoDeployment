import { FC } from 'react'
import { driverDetailProps, Trip } from '../types'
interface HeaderProps {
    tripDetails: driverDetailProps
}
const findTrip = (overallTrip: Trip) => {
    if (overallTrip.loadingPointToStockPointTrip !== null) {
        return { tripData: overallTrip.loadingPointToStockPointTrip, type: 'stock' }
    } else {
        return { tripData: overallTrip.loadingPointToUnloadingPointTrip, type: 'direct' }
    }
}
export const Header: FC<HeaderProps> = ({ tripDetails }) => {
    const { tripData } = findTrip(tripDetails.trips[0])
    return (
        <div className="magnumHeader">
            <div className="magnum">
                <h2>Magnum Logistics</h2>
                <p>
                    30/A, Attayampalayam, Anthetti Thottam, Gangapuram, Erode,
                    <br />
                    Erode Dt <br />
                    Erode-638102 <br />
                    Tamil Nadu <br />
                </p>
                <br />
            </div>
            <div className="driverConatiner">
                <div className="driverName">
                    <div className="driverDetail">
                        <b>{tripDetails.driverName}</b>
                    </div>
                    <div className="driverDetail">
                        <b>Vehicle No : {tripData.truck.vehicleNumber}</b>
                    </div>
                    <div className="driverDetail">
                        <b>S/T :</b>
                    </div>
                </div>
                <div className="driverStatus">
                    <div className="driverDetail">
                        <p>
                            <b> Branch Name :</b> HO <br />
                            <b>Period :</b> 02-05-2024 To 01-06-2024 <br />
                            <b> Trip Days :</b> 12 Days <br />
                            <b>Avg. Days/Trip :</b> 2 Days
                        </p>
                    </div>
                    <div className="driverDetail">
                        <p>
                            {' '}
                            <b> Trip Sheet No :</b> 20246-46
                        </p>
                    </div>
                    <div className="driverDetail">
                        <p>
                            <b>H :</b>{' '}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
