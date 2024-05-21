import { vi } from 'vitest'
import { render } from '@testing-library/react'
import MockDate from 'mockdate'
import MahaInvoice from './mahaInvoice'
import { billNoContext, partyNamesContext } from '../../invoiceContext'

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
            setLoading: vi.fn(),
            loading: false
        })
        const { asFragment } = render(
            <partyNamesContext.Provider
                value={{
                    partyNames: [{ invoiceNumber: 'sdfgh', partyName: 'sdfgh' }],
                    setPartyNames: () => []
                }}
            >
                <billNoContext.Provider
                    value={{
                        invoiceValues: {
                            billNo: 'asd',
                            date: 1704886154
                        },
                        setInvoiceValues: () => {}
                    }}
                >
                    <MahaInvoice {...getProps()} />
                </billNoContext.Provider>
            </partyNamesContext.Provider>
        )
        expect(asFragment()).toMatchSnapshot()
        MockDate.reset()
    })
})
