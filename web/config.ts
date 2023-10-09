interface Config {
    backendUrl: string;
    backendPort?: number;
}
const config: Record<string, Config> = {
    dev: {
        backendUrl: 'http://localhost:3000',
    },
    test: {
        backendUrl: 'http://127.0.0.1:3001',
        backendPort: 3001,
    },
}
let env = 'test'
if (import.meta.env.MODE == 'dev') {
    env = 'dev'
}

export default config[env]