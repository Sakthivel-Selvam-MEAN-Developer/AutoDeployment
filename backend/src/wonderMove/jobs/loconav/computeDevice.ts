export type FormatDetails = {
    loconavDeviceId: number
    vehicle: {
        number: string
    }
}

export interface RawDetails {
    loconavDeviceId: number
    vehicle: {
        create: {
        number: string
        }
    }
    loconavToken: string
}

const computeDetails = (formatDetails: FormatDetails[]): RawDetails[] => {
    console.log(formatDetails);
    return []
}

export default computeDetails