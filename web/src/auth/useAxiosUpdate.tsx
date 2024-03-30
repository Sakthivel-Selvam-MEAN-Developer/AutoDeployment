import { useAuth } from 'react-oidc-context'
import { initAxios } from '../apiCalls'
import { useEffect, useState } from 'react'

export const useAxiosUpdate = () => {
    const auth = useAuth()
    const [isTokenSetWithAxios, setIsTokenSetWithAxios] = useState(false)
    useEffect(() => {
        if (!auth.user) return
        initAxios(auth.user.access_token)
        setIsTokenSetWithAxios(true)
    }, [auth])
    return { isTokenSetWithAxios }
}
