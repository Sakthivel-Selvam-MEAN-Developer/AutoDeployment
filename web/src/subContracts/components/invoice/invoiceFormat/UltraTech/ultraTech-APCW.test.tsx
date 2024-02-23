import { vi } from 'vitest'
import { render } from '@testing-library/react'
import UltraTech_APCW from './ultraTech-APCW'

vi.mock('to-words', () => ({
    ToWords: vi.fn().mockImplementation(() => ({
        convert: vi.fn().mockReturnValue('Ten Lakhs Only')
    }))
}))

describe('UltraTech_APCW invoice component', () => {
    test('renders correctly', () => {
        const tripId = [
            {
                overallTripId: 1,
                tripId: 1,
                tripName: 'LoadingToUnloading'
            }
        ]
        const company = 'UltraTech'

        const { asFragment } = render(
            <UltraTech_APCW tripId={tripId} company={company} lastBillNumber="MGL23A-1" />
        )

        expect(asFragment()).toMatchSnapshot()
    })
})
