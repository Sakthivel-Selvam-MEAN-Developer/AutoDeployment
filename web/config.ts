interface Config {
    backendUrl: string
    keycloakUrl: string
    logoutRedirectUrl: string
}

const config: Record<string, Config> = {
    production: {
        logoutRedirectUrl: `https://${window.location.hostname}/sub`,
        backendUrl: `https://${window.location.hostname}/api`,
        keycloakUrl: `https://auth.${window.location.hostname}`,
    },
    development: {
        logoutRedirectUrl: `http://${window.location.hostname}/sub`,
        backendUrl: `http://${window.location.hostname}/api`,
        keycloakUrl: `http://${window.location.hostname}:8080`,
    }
}

if(!config[import.meta.env.MODE]) {
    import.meta.env.MODE = 'development'
}
export default config[import.meta.env.MODE]
