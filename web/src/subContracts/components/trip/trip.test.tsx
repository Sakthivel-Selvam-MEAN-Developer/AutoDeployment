import { render, screen, waitFor } from '@testing-library/react'
import TripList from './list'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
// import ListAllTrip from './show'
// import NewTrip from './newTrip'

const mockAllTrip = vi.fn()

vi.mock('../../services/trip', () => ({
    getAllTrip: () => mockAllTrip()
}))

describe('Trip Test', () => {
    test('should fetch data from Db', async () => {
        const mockTripData = [
            {
                startDate: 1696934739,
                endDate: 1697798739,
                factory: {
                    location: 'salem'
                },
                deliveryPoint: {
                    location: 'erode'
                },
                truck: {
                    vehicleNumber: 'TN93D5512',
                    transporter: {
                        name: 'Barath'
                    }
                }
            }
        ]
        mockAllTrip.mockResolvedValue(mockTripData)
        render(
            <BrowserRouter>
                <TripList />
            </BrowserRouter>
        )
        await waitFor(() => {
            expect(screen.getByText('TN93D5512')).toBeInTheDocument()
            expect(screen.getByText('Oct 20, 2023')).toBeInTheDocument()
            expect(screen.getByText('salem')).toBeInTheDocument()
        })
        expect(mockAllTrip).toHaveBeenCalledTimes(1)
    })
    // test('checking the component called TripList', () => {
    //     render(
    //         <BrowserRouter><TripList /></BrowserRouter>)
    //     expect(screen.getByText('List Of Trips')).toBeInTheDocument()
    //     expect(screen.getByText('Assign New Trip')).toBeInTheDocument()
    //     fireEvent.click(screen.getByTestId('new-trip-button'))
    // })
    // test('checking the component called NewTrip', () => {
    //     render(
    //         <BrowserRouter><NewTrip /></BrowserRouter>)
    //     expect(screen.getByText('Start')).toBeInTheDocument()

    // })
    // test('checking the component called ListAllTrip', () => {
    //     render(
    //         <BrowserRouter><ListAllTrip allTrips={[]} /></BrowserRouter>)
    //     expect(screen.getByText('Vehicle Number')).toBeInTheDocument()
    //     expect(screen.getByText('Filled Load')).toBeInTheDocument()
    //     })
})
