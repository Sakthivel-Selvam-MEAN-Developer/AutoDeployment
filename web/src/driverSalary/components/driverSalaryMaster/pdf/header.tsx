import { FC } from 'react'
import { driverDetailProps } from '../types'
interface HeaderProps {
    tripDetails: driverDetailProps
}
export const Header: FC<HeaderProps> = ({ tripDetails }) => {
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
                        <b>Vehicle No : {tripDetails.trips[0].truck.vehicleNumber}</b>
                    </div>
                </div>
                <div className="driverStatus">
                    <div className="driverDetail">
                        <p>
                            <b> Branch Name :</b> HO <br />
                            <b>Period :</b> Month
                            <br />
                            <b> Trip Days :</b> {tripDetails.tripDays} Days
                            <br />
                            <b>Avg. Days/Trip :</b> {tripDetails.averageTripDays} Days
                        </p>
                    </div>
                    <div className="driverDetail">
                        <p>
                            <b> Trip Sheet No :</b> 20246-46
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
