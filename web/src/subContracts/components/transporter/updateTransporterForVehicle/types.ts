import { Control } from 'react-hook-form'

export interface GetTextFildProps {
    currentTransporterName: string
}
export interface transporterProps {
    control: Control
    transporterList: transporterType[]
    setNewTranporterId: React.Dispatch<React.SetStateAction<number>>
}
export interface VehicleListProps {
    control: Control
    vehicleList: vehicleListType[]
    setTruckId: React.Dispatch<React.SetStateAction<number>>
    setCurrentTransporterName: React.Dispatch<React.SetStateAction<string>>
}
export interface vehicleListType {
    id: number
    vehicleNumber: string
    transporter: transporterType
}
export interface transporterType {
    id: number
    name: string
}
