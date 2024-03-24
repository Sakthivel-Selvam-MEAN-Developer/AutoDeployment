interface Config {
    backendUrl: string;
    keycloakUrl: string;
}

const config: Record<string, Config> = {
    production: {
        backendUrl: `https://${window.location.hostname}/api`,
        keycloakUrl: `https://auth.${window.location.hostname}`,
    },
    development: {
        backendUrl: `http://${window.location.hostname}:3000/api`,
        keycloakUrl: `http://${window.location.hostname}:8080`,
    }
}

if(!config[import.meta.env.MODE]) {
    import.meta.env.MODE = 'development'
}
export default config[import.meta.env.MODE]
