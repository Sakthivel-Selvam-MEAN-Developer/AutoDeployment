import * as React from 'react'
import { useEffect } from 'react'
import { keycloak } from './index.ts'

export interface AuthProps {
    children?: React.ReactNode
}

const Auth = (props: AuthProps) => {
    useEffect(() => {
        keycloak.init({ onLoad: 'login-required' })
    }, [])
    return <>{props.children}</>
}

export default Auth
