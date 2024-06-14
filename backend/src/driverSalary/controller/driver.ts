import { Request, Response } from 'express'
import { exec } from 'child_process'
import { create, getAllDriver } from '../models/driver.ts'
import { getAllDriverAttendanceDetails } from '../models/driverAttendance.ts'
import { driverAttenance } from '../domain/driverDailyAttenanceFilterEvent.ts'
import prisma from '../../../prisma/index.ts'
import { handlePrismaError } from '../../../prisma/errorHandler.ts'

type type = (
    stdout: string,
    reject: (reason: string) => void,
    resolve: (value: void | PromiseLike<void>) => void
) => void
const getResponse: type = (stdout, reject, resolve) => {
    const keycloakResponse = stdout.split('\n').splice(4, 1)[0]
    if (keycloakResponse.includes('User exists with same username')) {
        const err = new Error()
        err.name = 'User already exists with the same username'
        reject(err.name)
    } else resolve()
}
export const createDriver = async (req: Request, res: Response) => {
    try {
        await prisma.$transaction(async (prismas) => {
            const data = await create(req.body, prismas)
            await new Promise<void>((resolve, reject) => {
                exec(
                    `docker-compose exec keycloak sh '/config/createDriver.sh' ${data?.name} ${data?.mobileNumber}`,
                    (_error, _stderr, stdout) => getResponse(stdout, reject, resolve)
                )
            })
            res.status(200).json(data)
        })
    } catch (error) {
        if (typeof error === 'object') return handlePrismaError(error, res)
        res.status(500).json({ error })
    }
}
export const listAllDriver = async (_req: Request, res: Response) => {
    getAllDriver()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
export const fillterDriverByAttendance = async (_req: Request, res: Response) => {
    const data = await getAllDriver()
    const driverIds = data.map((driver) => driver.id)
    const attendanceDetails = await getAllDriverAttendanceDetails(driverIds)
    await driverAttenance(data, res, attendanceDetails)
}
