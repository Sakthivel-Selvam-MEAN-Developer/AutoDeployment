interface Config {
    backendUrl: string;
    backendPort?: number;
    REACT_APP_ORY_URL: string;
    EMPLOYEE_ID: string
}
const config: Record<string, Config> = {
    dev: {
        backendUrl: `http://${window.location.hostname}:3000`,
        REACT_APP_ORY_URL: 'http://localhost:4000',
        EMPLOYEE_ID: '1234'
    },
    test: {
        backendUrl: 'http://127.0.0.1:3001',
        backendPort: 3001,
        REACT_APP_ORY_URL: 'http://localhost:4000',
        EMPLOYEE_ID: '1234'
    },
}
let env = 'test'
if (import.meta.env.MODE == 'dev') {
    env = 'dev'
}

export default config[env]