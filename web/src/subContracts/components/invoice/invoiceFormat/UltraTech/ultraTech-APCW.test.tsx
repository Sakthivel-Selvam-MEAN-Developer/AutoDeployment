import { vi } from 'vitest'
import { render } from '@testing-library/react'
import UltraTechAPCW from './ultraTech-APCW'
import MockDate from 'mockdate'
import { billNoContext } from '../../invoiceContext'

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
            setLoading: vi.fn(),
            loading: false
        })

        const { asFragment } = render(
            <billNoContext.Provider
                value={{
                    invoiceValues: {
                        billNo: 'asd',
                        date: 1704886154
                    },
                    setInvoiceValues: () => {}
                }}
            >
                <UltraTechAPCW {...getProps()} />{' '}
            </billNoContext.Provider>
        )

        expect(asFragment()).toMatchSnapshot()
        MockDate.reset()
    })
})
