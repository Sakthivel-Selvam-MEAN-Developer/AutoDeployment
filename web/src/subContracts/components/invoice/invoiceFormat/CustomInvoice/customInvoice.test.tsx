import { vi } from 'vitest'
import { render } from '@testing-library/react'
import CustomInvoice from './customInvoice'
import MockDate from 'mockdate'
import { billNoContext } from '../../invoiceContext'

vi.mock('to-words', () => ({
    ToWords: vi.fn().mockImplementation(() => ({
        convert: vi.fn().mockReturnValue('Ten Lakhs Only')
    }))
}))

describe('CustomInvoice component', () => {
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
            loading: false,
            address: {
                address: `<h4>M/s ASHTECH(INDIA) PRIVATE LIMITED</h4>
                              <h4>SURVEY NO 437 and 438,C/O UPCL</h4>
                              <h4>YELLUR VILLAGE, PILAR POST,</h4>
                              <h4>Karnataka, 574113</h4><br>
                              <h4>GSTN:- 29AAECA4133B2Z5</h4>`
            }
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
                <CustomInvoice {...getProps()} />{' '}
            </billNoContext.Provider>
        )

        expect(asFragment()).toMatchSnapshot()
        MockDate.reset()
    })
})
