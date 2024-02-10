import { vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

const mockGroupedGSTDues = vi.fn()
const mockExportFile = vi.fn()

vi.mock('../../services/paymentDues', () => ({
    getGstDues: (status: boolean) => mockGroupedGSTDues(status)
}))

vi.mock('./NEFTForm/exportFile', () => ({
    exportFile: () => mockExportFile()
}))

const mockPaymentGSTDuesData = [
    {
        name: 'Dalmia Cements',
        dueDetails: {
            count: 1,
            payableAmount: 1296
        },
        bankDetails: [],
        tripDetails: [
            {
                id: 3,
                vehicleNumber: 'KR10S1290',
                type: 'gst pay',
                amount: 1296
            }
        ]
    }
]
// const props: GenerateFormProps = {
//     gstNEFTDetails: [],
//     setGstNEFTDetails: () => {},
//     paymentDueId: [],
//     setPaymentDueId: () => {},
//     refresh: false
// }
describe('Generate NEFT Form', () => {
    test.skip('should generate GST NEFT form', async () => {
        mockGroupedGSTDues.mockResolvedValue(mockPaymentGSTDuesData)
        render(
            <BrowserRouter>
                {/* <GSTDues
                    gstNEFTDetails={props.gstNEFTDetails}
                    setGstNEFTDetails={props.setGstNEFTDetails}
                    paymentDueId={props.paymentDueId}
                    setPaymentDueId={props.setPaymentDueId}
                    refresh={props.refresh}
                /> */}
            </BrowserRouter>
        )
        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).not.toBeChecked()
        expect(screen.getByRole('textbox', { name: 'Gst Number' })).toBeDisabled()
        fireEvent.click(checkbox)
        expect(await screen.findByText('Dalmia Cements')).toBeInTheDocument()
        expect(await screen.findByText('1296')).toBeInTheDocument()
        const transporter = screen.getByText('Dalmia Cements')
        await userEvent.click(transporter)

        expect(await screen.findByText('TN93D3445')).toBeInTheDocument()
        expect(await screen.findByText('1296')).toBeInTheDocument()

        expect(screen.getByRole('button', { name: 'Generate Form' }))
        expect(mockGroupedGSTDues).toHaveBeenCalledTimes(1)
        expect(mockExportFile).toHaveBeenCalledTimes(1)
    })
})
