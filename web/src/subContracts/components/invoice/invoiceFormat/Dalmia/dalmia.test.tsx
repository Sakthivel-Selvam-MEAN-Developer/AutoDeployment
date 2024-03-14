import { vi } from 'vitest'
import { render } from '@testing-library/react'
import MockDate from 'mockdate'
import Dalmia_Dalmiapuram_Invoice from './dalmiaDalmiapuram'
import Dalmia_Kadappa_Invoice from './dalmiaKadapa'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import { client, client1 } from '../../../../../keycloakTest'
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
        const { asFragment } = render(
            <ReactKeycloakProvider authClient={client}>
                <Dalmia_Dalmiapuram_Invoice {...getProps()} />
            </ReactKeycloakProvider>
        )
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
        const { asFragment } = render(
            <ReactKeycloakProvider authClient={client1}>
                <Dalmia_Kadappa_Invoice {...getProps()} />
            </ReactKeycloakProvider>
        )
        expect(asFragment()).toMatchSnapshot()
        MockDate.reset()
    })
})
