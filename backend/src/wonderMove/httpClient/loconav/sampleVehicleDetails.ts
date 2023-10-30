export const vehicleDetail = {
    status: true,
    data: [
        {
            id: 12345,
            number: 'TEST',
            notes: '',
            current_temperature: 'NA',
            gps_status: 'Stopped since 03:11 PM',
            last_located_at: 1662004691.0,
            last_location: 'Bhawrasla, Indore, Indore, Madhya Pradesh, 453555, India',
            last_status_received_at: '01/09/2022, 03:11PM',
            status_message: {
                // optional
                received_at: '2022-09-01T15:23:34.874+05:30',
                io_state: '00000000',
                gsm_strength: '4',
                voltage: null,
                alarm: '0'
            },
            device: {
                // optional
                serial_number: '0355172105645723',
                country_code: 'IN',
                phone_number: '1234567890',
                device_type: 'Concox-V5'
            },
            additional_attributes: {
                // optional - fetch_motion_status=true
                movement_metrics: {
                    speed: {
                        value: 0.0,
                        unit: 'km/h'
                    },
                    location: {
                        lat: 23.028635,
                        address: 'Vikram Nagar, Ahmedabad, Gujarat 380054, India',
                        received_ts: 1678940958,
                        long: 72.498684
                    },
                    motion_status: 'stopped',
                    state_since_ts: 1662025260,
                    ignition: 'off',
                    share_link: 'https://loconav.com/v2/track-a-day/abcd?locale=en'
                }
            },
            subscription: {
                //Optional
                expires_at: '2023-09-01T15:18:37.000+05:30'
            },
            chassis_number: '',
            display_number: 'TestVehicle',
            created_at: 1648651027,
            updated_at: 1648651027,
            fuel_type: 'petrol',
            current_odometer_reading: 0.0, // optional (Unit - KM)
            is_mobilized: true, // optional, if fetch_mobilization_details = true
            last_mobilization_request: {
                // optional, if fetch_mobilization_details = true
                id: 923533,
                vehicle_id: 12345,
                status: 'success',
                message: 'Restore fuel supply: Success!',
                mobilize: true,
                created_at: 1679988622,
                updated_at: 1679988650,
                creator_type: 'User',
                creator_email: 'test-user@loconav.com'
            }
        }
    ],
    pagination: {
        total_count: 1,
        per_page: 10,
        current_page: 1
    }
}
