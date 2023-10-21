import { Request, Response } from "express";
import { getDefaultReason } from "../models/stopReason";
import { groupByStopReason } from "../models/stops/stops.crud";
import { getGpsStops } from "../models/gpsStop";

function groupNumber(groupedData: any[], gpsStopIdToVehicleNumber: Map<any, any>) {
    return groupedData.reduce((acc, entry) => {
        const gpsStopId = entry.gpsStopId;
        const number = gpsStopIdToVehicleNumber.get(gpsStopId);
            if (!acc[number]) {
                acc[number] = {
                    number: number,
                    _count: 0
                };
            }
            acc[number]._count += entry._count;
        return acc;
    }, {})
}

const mapNumberToVehicle = async (groupedData: any[]) => {
    const gpsStop = await getGpsStops();
    const gpsStopIdToVehicleNumber = new Map();
    gpsStop.forEach(stop => {
        gpsStopIdToVehicleNumber.set(stop.id, stop.vehicleId);
    });
    const result = groupNumber(groupedData, gpsStopIdToVehicleNumber)
    return Object.values(result);
}



export const pendingStopReason = (_req: Request, res: Response) => {
    getDefaultReason()
        .then(({ id }: any) => groupByStopReason(id))
        .then(mapNumberToVehicle)
        .then((data: any) => {
            res.status(200).json(data)
        })
}

