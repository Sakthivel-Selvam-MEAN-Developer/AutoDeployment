interface Config {
    backendUrl: string;
    backendPort?: number;
    REACT_APP_ORY_URL: string;
}
const config: Record<string, Config> = {
    dev: {
        backendUrl: 'http://localhost:3000',
        REACT_APP_ORY_URL: 'http://localhost:4000'
    },
    test: {
        backendUrl: 'http://127.0.0.1:3001',
        backendPort: 3001,
        REACT_APP_ORY_URL: 'http://localhost:4000'
    },
}
let env = 'test'
if (import.meta.env.MODE == 'dev') {
    env = 'dev'
}

export default config[env]