import { Application, Request, Response, NextFunction } from 'express';
import routes from './wonderMove/routes';

const healthRoute = (app: Application): void => {
    app.get('/health', (req: Request, res: Response) => {
        res.status(200).send();
    });
}

const nonExistingRoute = (app: Application): void => {
    app.use((req: Request, res: Response, next: NextFunction) => {
        next(res.status(404).send("Sorry can't find that!!!!"));
    });
}

const setRoutes = (app: Application): void => {
    healthRoute(app);
    app.use('/', routes);
    nonExistingRoute(app);
}

export default setRoutes;
