interface Config {
    backendUrl: string;
}
const config: Record<string, Config> = {
    prod: {
        backendUrl: `http://${window.location.hostname}/api`,
    },
    dev: {
        backendUrl: `http://${window.location.hostname}/api`,
    },
    test: {
        backendUrl: `http://${window.location.hostname}/api`,
    },
}
const env = 'prod'
// if (import.meta.env.MODE == 'dev') {
//     env = 'dev'
// }

export default config[env]