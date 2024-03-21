import ReactDOM from 'react-dom/client'
import { App } from './app.tsx'
import Auth from './auth/Auth.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Auth>
        <App />
    </Auth>
)
