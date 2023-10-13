// interface Configs {
//     traccarUrl: string;
//     traccarUsername: string;
//     traccarPassword: string;
//     port: string;
// }

const configs = {
    traccarUrl: process.env.TRACCAR_DOMAIN,
    traccarUsername: process.env.TRACCAR_USERNAME,
    traccarPassword: process.env.TRACCAR_PASSWORD,
    port: process.env.PORT
}

export default configs
