import routes from './wonderMove/routes'
import {Application, Response } from "express";

const healthRoute = (app: Application) => {
    app.get('/health', (res: Response) => {
        res.status(200).send()
    })
}

const nonExistingRoute = (app: Application) => {
    app.use((res: Response) => {
        res.status(404).send("Sorry can't find that!!!!")
    })
}

const setRoutes = (app: Application) => {
    healthRoute(app)
    app.use('/', routes)
    nonExistingRoute(app)
}

export default setRoutes
