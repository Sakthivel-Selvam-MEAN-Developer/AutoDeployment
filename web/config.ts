interface Config {
    backendUrl: string;
}
const config: Record<string, Config> = {
    prod: {
        backendUrl: `http://${window.location.hostname}/api`,
    },
    dev: {
        backendUrl: `http://${window.location.hostname}:3000`,
    },
    test: {
        backendUrl: `http://${window.location.hostname}:3000`,
    },
}
const env = 'dev'
// if (import.meta.env.MODE == 'dev') {
//     env = 'dev'
// }

export default config[env]