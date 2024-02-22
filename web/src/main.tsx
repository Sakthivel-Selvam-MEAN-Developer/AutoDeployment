import ReactDOM from 'react-dom/client'
import { App } from './app.tsx'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import { client } from './keyCloak.tsx'

const initOptions = { onLoad: 'login-required' }
ReactDOM.createRoot(document.getElementById('root')!).render(
    <ReactKeycloakProvider authClient={client} initOptions={initOptions}>
        <App />
    </ReactKeycloakProvider>
)
