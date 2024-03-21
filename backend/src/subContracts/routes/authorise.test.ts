import { Token } from 'keycloak-connect'
import { authorise } from './authorise.ts'

const mockKeycloak = vi.fn()
vi.mock('../../keycloak-config.ts', () => ({
    default: { protect: (x: Token) => mockKeycloak(x) }
}))

describe('authorise function', () => {
    beforeEach(() => {
        vi.resetAllMocks()
    })
    it('should return false if token is expired', () => {
        authorise([])
        const callBackFunction = mockKeycloak.mock.calls[0][0]
        expect(callBackFunction({ isExpired: () => true })).toBe(false)
    })
    it('should return true if SuperAdmin is part of the role', () => {
        authorise([])
        const isExpired = () => false
        const callBackFunction = mockKeycloak.mock.calls[0][0]
        expect(
            callBackFunction({ content: { realm_access: { roles: ['SuperAdmin'] } }, isExpired })
        ).toBe(true)
    })
    it('should return true if given role is part of the role', () => {
        authorise(['Employee'])
        const isExpired = () => false
        const callBackFunction = mockKeycloak.mock.calls[0][0]
        expect(
            callBackFunction({ content: { realm_access: { roles: ['Employee'] } }, isExpired })
        ).toBe(true)
    })
    it('should return false if given role is not part of the role', () => {
        authorise(['Admin'])
        const isExpired = () => false
        const callBackFunction = mockKeycloak.mock.calls[0][0]
        expect(
            callBackFunction({ content: { realm_access: { roles: ['Employees'] } }, isExpired })
        ).toBe(false)
    })
})
