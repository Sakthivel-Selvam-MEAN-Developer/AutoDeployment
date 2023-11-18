import { useAuth0 } from '@auth0/auth0-react'
import { ChildrenProps } from './childrenProps.tsx'
function Wrapper({ children }: ChildrenProps) {
    const { isLoading, error } = useAuth0()
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Oops... {error.message}</div>
    }
    return <>{children}</>
}
export default Wrapper
