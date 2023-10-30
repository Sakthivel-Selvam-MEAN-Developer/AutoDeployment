const configs = {
    traccarUrl: process.env.TRACCAR_DOMAIN || '',
    traccarUsername: process.env.TRACCAR_USERNAME || '',
    traccarPassword: process.env.TRACCAR_PASSWORD || '',
    port: process.env.PORT || '',
    loconavUrl: process.env.LOCONAV_URL || '',
    loconavUsername: process.env.LOCONAV_USERNAME || '',
    loconavPassword: process.env.LOCONAV_PASSWORD || ''
}

export default configs
