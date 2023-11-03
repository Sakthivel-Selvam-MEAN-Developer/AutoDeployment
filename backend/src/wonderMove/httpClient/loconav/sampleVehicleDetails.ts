export type DeviceDetail = {
    id: number
    number: string
    notes: string
    current_temperature: string
    last_located_at: number
    last_location: string
    status_message: {
        received_at: string
    }
    device: {
        serial_number: string
        country_code: string
        phone_number: string
        device_type: string
    }
    subscription: {
        expires_at: string
    }
    current_odometer_reading: number
    chassis_number: string
    display_number: string
}

export const vehicleDetail: DeviceDetail = {
    id: 123,
    number: 'TN52S3555',
    notes: 'abc',
    current_temperature: '40 c',
    last_located_at: 1234,
    last_location: 'Salem',
    status_message: {
        received_at: '30/10/2023, 03:51PM'
    },
    device: {
        serial_number: '0355172108032713',
        country_code: 'IN',
        phone_number: '5754210030711',
        device_type: 'Concox-V5'
    },
    subscription: {
        expires_at: '2024-01-20T10:30:13.000+05:30'
    },
    current_odometer_reading: 0.0,
    chassis_number: '',
    display_number: 'TN93D5512'
}
