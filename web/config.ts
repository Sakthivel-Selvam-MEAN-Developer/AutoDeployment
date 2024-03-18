interface Config {
    backendUrl: string;
    keycloakUrl: string;
}

const config: Record<string, Config> = {
    production: {
        backendUrl: `http://${window.location.hostname}/api`,
        keycloakUrl: `http://auth.${window.location.hostname}/`,
    },
    development: {
        backendUrl: `http://${window.location.hostname}:3000/api`,
        keycloakUrl: `http://${window.location.hostname}:8080/`,
    }
}

export default config[import.meta.env.MODE]
