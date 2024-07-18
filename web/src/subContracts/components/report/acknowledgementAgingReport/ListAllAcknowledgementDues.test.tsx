import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import ListAllAcknowledgementDues from './listAllAcknowledgementDues'

const mockGetTripByUnloadDate = vi.fn()

vi.mock('../../../../services/overallTrips', () => ({
    getTripByUnloadDate: (inputs: any) => mockGetTripByUnloadDate(inputs)
}))

const mockOverallTripData = [
    {
        id: 1,
        acknowledgementStatus: false,
        loadingPointToStockPointTripId: null,
        stockPointToUnloadingPointTripId: null,
        loadingPointToUnloadingPointTripId: 1,
        shortageQuantity: {
            unloadedDate: 1707762600
        },
        loadingPointToStockPointTrip: null,
        truckId: 1,
        truck: {
            vehicleNumber: 'TN93D5512',
            transporter: {
                id: 1,
                name: 'Barath Logistics',
                csmName: 'Muthu',
                employee: {
                    name: 'Muthu'
                }
            }
        },
        loadingPointToUnloadingPointTrip: {
            id: 1,
            startDate: 1700764200,
            filledLoad: 40,
            wantFuel: null,
            tripStatus: false,
            acknowledgeDueTime: null,
            freightAmount: 1000,
            transporterAmount: 900,
            totalFreightAmount: 40000,
            totalTransporterAmount: 36000,
            margin: 4000,
            invoiceNumber: 'ABC123',
            loadingPointId: 1,
            unloadingPointId: 1,
            truckId: 1,
            loadingPoint: {
                id: 1,
                name: 'Chennai-south',
                cementCompany: {
                    name: 'ULTRATECH CEMENT LIMITED,TADIPATRI'
                }
            },
            truck: {
                vehicleNumber: 'TN93D5512',
                transporter: {
                    id: 1,
                    name: 'Barath Logistics',
                    csmName: 'Muthu',
                    employee: {
                        name: 'Muthu'
                    }
                }
            }
        }
    }
]

describe('Report Test', () => {
    beforeEach(() => {
        mockGetTripByUnloadDate.mockResolvedValue(mockOverallTripData)
    })
    test('should be able to view trip data after clicking submit', async () => {
        render(
            <BrowserRouter>
                <ListAllAcknowledgementDues />
            </BrowserRouter>
        )
        waitFor(() => {
            userEvent.type(screen.getByLabelText('Aging Date'), '4')
            expect(screen.getByText('4')).toBeInTheDocument()
            const start = screen.getByRole('button', { name: 'Filter' })
            userEvent.click(start)
            expect(screen.getByText('Vehicle Number')).toBeInTheDocument()
            expect(screen.getByText('CSM Name')).toBeInTheDocument()
            expect(screen.getByText('Invoice Number')).toBeInTheDocument()
        })
    })
    test('should to able to filter trip with user input', async () => {
        render(
            <BrowserRouter>
                <ListAllAcknowledgementDues />
            </BrowserRouter>
        )
        waitFor(() => {
            userEvent.type(screen.getByLabelText('Aging Date'), '5')

            const start = screen.getByRole('button', { name: 'Filter' })
            userEvent.click(start)

            expect(screen.getByText('Vehicle Number')).toBeInTheDocument()
            expect(screen.getByText('CSM Name')).toBeInTheDocument()
            expect(screen.getByText('Invoice Number')).toBeInTheDocument()

            expect(screen.getByText('Barath Logistics')).toBeInTheDocument()
            expect(screen.getByText('Muthu')).toBeInTheDocument()

            expect(mockGetTripByUnloadDate).toHaveBeenCalledTimes(1)
        })
    })
})
