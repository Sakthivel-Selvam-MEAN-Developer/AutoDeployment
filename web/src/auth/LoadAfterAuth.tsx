import { AuthProps } from './Auth.tsx'
import { useAxiosUpdate } from './useAxiosUpdate.tsx'
import LogingLoader from './LogingLoader.tsx'

export const LoadAfterAuth = (props: AuthProps) => {
    const { isTokenSetWithAxios } = useAxiosUpdate()
    return isTokenSetWithAxios ? <>{props.children} </> : <LogingLoader />
}
