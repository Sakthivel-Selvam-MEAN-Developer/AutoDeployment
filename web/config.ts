interface Config {
    backendUrl: string;
    keycloakUrl: string;
}

const config: Record<string, Config> = {
    prod: {
        backendUrl: `http://${window.location.hostname}/api`,
        keycloakUrl: `http://auth.wondermove.in/`,
    },
    dev: {
        backendUrl: `http://${window.location.hostname}:3000/api`,
        keycloakUrl: `http://${window.location.hostname}:8080/`,
    }
}
const env = 'prod'
// if (import.meta.env.MODE == 'dev') {
//     env = 'dev'
// }

export default config[env]
