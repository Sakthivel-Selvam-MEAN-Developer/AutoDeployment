const configs = {
    traccarUrl: process.env.TRACCAR_DOMAIN || '',
    traccarUsername: process.env.TRACCAR_USERNAME || '',
    traccarPassword: process.env.TRACCAR_PASSWORD || '',
    port: process.env.PORT || '',
    loconavUrl: process.env.LOCONAV_URL || '',
    ktTelematicsUrl: process.env.KTTELEMATICS_URL || '',
    ORY_SDK_URL: process.env.ORY_SDK_URL || '',
    PUBLIC_KEY: process.env.PUBLIC_KEY || ''
}

export default configs
