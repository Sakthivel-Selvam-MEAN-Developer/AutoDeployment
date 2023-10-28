const configs = {
    traccarUrl: process.env.TRACCAR_DOMAIN || "",
    traccarUsername: process.env.TRACCAR_USERNAME || "",
    traccarPassword: process.env.TRACCAR_PASSWORD || "",
    port: process.env.PORT || "",
    loconavUrl: process.env.LOCONAV_URL || ""
}

export default configs
