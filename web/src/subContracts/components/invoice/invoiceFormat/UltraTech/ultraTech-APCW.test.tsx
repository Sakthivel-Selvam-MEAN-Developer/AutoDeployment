import { vi } from 'vitest'
import { render } from '@testing-library/react'
import UltraTechAPCW from './ultraTech-APCW'
import MockDate from 'mockdate'

vi.mock('to-words', () => ({
    ToWords: vi.fn().mockImplementation(() => ({
        convert: vi.fn().mockReturnValue('Ten Lakhs Only')
    }))
}))

describe('UltraTech_APCW invoice component', () => {
    test('renders correctly', () => {
        MockDate.set(new Date('2021-05-31'))
        const getProps = () => ({
            tripId: [
                {
                    overallTripId: 1,
                    tripId: 1,
                    tripName: 'LoadingToUnloading'
                }
            ],
            lastBillNumber: 'MGL23A-1',
            setLoading: vi.fn(),
            loading: false
        })

        const { asFragment } = render(<UltraTechAPCW {...getProps()} />)

        expect(asFragment()).toMatchSnapshot()
        MockDate.reset()
    })
})
