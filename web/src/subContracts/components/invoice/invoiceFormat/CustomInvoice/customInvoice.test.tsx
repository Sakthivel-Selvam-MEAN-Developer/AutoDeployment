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
                companyDetails: [
                    {
                        label: '',
                        value: 'ASHTECH(INDIA) PRIVATE LIMITED'
                    },
                    {
                        label: '',
                        value: 'SURVEY NO 437 and 438,'
                    },
                    {
                        label: '',
                        value: 'C/O UPCL,'
                    },
                    {
                        label: '',
                        value: ' YELLUR VILLAGE,'
                    },
                    {
                        label: '',
                        value: 'PILAR POST,'
                    },
                    {
                        label: '',
                        value: 'Karnataka, 574113'
                    }
                ],
                stateDetails: [
                    {
                        label: 'GSTN:-',
                        value: '29AAECA4133B2Z5'
                    }
                ]
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
