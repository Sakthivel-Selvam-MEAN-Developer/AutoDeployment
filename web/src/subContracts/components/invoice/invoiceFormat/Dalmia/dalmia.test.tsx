import { vi } from 'vitest'
import { render } from '@testing-library/react'
import MockDate from 'mockdate'
import DalmiaDalmiapuramInvoice from './dalmiaDalmiapuram'
import DalmiaKadappaInvoice from './dalmiaKadapa'
vi.mock('to-words', () => ({
    ToWords: vi.fn().mockImplementation(() => ({
        convert: vi.fn().mockReturnValue('Ten Lakhs Only')
    }))
}))

describe('Chettinad invoice component', () => {
    test('chettinad ariyalur renders correctly', () => {
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
        const { asFragment } = render(<DalmiaDalmiapuramInvoice {...getProps()} />)
        expect(asFragment()).toMatchSnapshot()
        MockDate.reset()
    })
    test('chettinad karikali renders correctly', () => {
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
        const { asFragment } = render(<DalmiaKadappaInvoice {...getProps()} />)
        expect(asFragment()).toMatchSnapshot()
        MockDate.reset()
    })
})
