import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import PricePointReport from './listPricePoint'

const mockGetAllpricePoint = vi.fn()

vi.mock('../../../services/pricePoint', () => ({
    getAllpricePoint: () => mockGetAllpricePoint()
}))
const mockPricePointData = [
    {
        id: 1,
        freightAmount: 1001,
        transporterAmount: 900,
        transporterPercentage: 10,
        payGeneratingDuration: 11,
        loadingPointId: 1,
        unloadingPointId: 1,
        stockPointId: null,
        loadingPoint: {
            id: 1,
            name: 'Chennai-south',
            cementCompanyId: 1,
            pricePointMarkerId: 1,
            cementCompany: {
                id: 1,
                name: 'ULTRATECH CEMENT LIMITED,TADIPATRI',
                gstNo: 'acdd',
                address: 'chennai',
                emailId: 'sample45@gmail.com',
                contactPersonName: 'muthu',
                contactPersonNumber: 1234567890
            }
        },
        stockPoint: null,
        unloadingPoint: {
            id: 1,
            name: 'Salem',
            cementCompanyId: 1,
            pricePointMarkerId: 2,
            cementCompany: {
                id: 1,
                name: 'ULTRATECH CEMENT LIMITED,TADIPATRI',
                gstNo: 'acdd',
                address: 'chennai',
                emailId: 'sample45@gmail.com',
                contactPersonName: 'muthu',
                contactPersonNumber: 1234567890
            }
        }
    }
]
describe('PricePointReportTest', () => {
    beforeEach(() => {
        mockGetAllpricePoint.mockResolvedValue(mockPricePointData)
    })
    test.skip('should be able to view pricePoint Report', async () => {
        render(
            <BrowserRouter>
                <PricePointReport />
            </BrowserRouter>
        )
        await waitFor(() => {
            expect(screen.getByText('Company Name')).toBeInTheDocument()
            expect(screen.getByText('Loading Point')).toBeInTheDocument()
            expect(screen.getByText('Unloading Point')).toBeInTheDocument()
            expect(screen.getByText('PayGeneratingDuration')).toBeInTheDocument()
            expect(screen.getByText('11')).toBeInTheDocument()
            expect(screen.getByText('1001')).toBeInTheDocument()
        })
        expect(mockGetAllpricePoint).toHaveBeenCalledTimes(1)
    })
})
