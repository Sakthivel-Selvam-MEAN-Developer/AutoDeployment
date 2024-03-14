import { Request, Response } from 'express'
import { create } from '../models/driver.ts'
// import { kcAdmin } from "../../keycloak-admin";

export const createDriver = async (req: Request, res: Response) => {
    // await kcAdmin.auth({
    //     username: 'admin',
    //     password: 'admin',
    //     grantType: 'password',
    //     clientId: 'wonderwhyclient',
    // })
    // await kcAdmin.users.create({
    //     realm: 'WonderWhy',
    //     username: 'gg',
    //     email: 'gg@example.com',
    // });
    create(req.body)
        .then(() => res.sendStatus(200))
        .catch(() => res.status(500))
}
