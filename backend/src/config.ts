const configs = {
    traccarUrl: process.env.TRACCAR_DOMAIN || '',
    traccarUsername: process.env.TRACCAR_USERNAME || '',
    traccarPassword: process.env.TRACCAR_PASSWORD || '',
    port: process.env.PORT || '',
    loconavUrl: process.env.LOCONAV_URL || '',
    ktTelematicsUrl: process.env.KTTELEMATICS_URL || '',
    ORY_SDK_URL: process.env.ORY_SDK_URL || '',
    keycloakPublicKey: process.env.PUBLIC_KEY || '',
    keycloakUrl: process.env.KEYCLOAK_URL || '',
    publicKey: process.env.PUBLIC_KEY || '',
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY || '',
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
    S3_BUCKET: process.env.S3_BUCKET || '',
    REGION: process.env.REGION || '',
    TEST_PATH: process.env.TEST_PATH || ''
}

export default configs
