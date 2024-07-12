import { Request, Response } from 'express'
import { handlePrismaError } from '../../../prisma/errorHandler'
import { create as createEmployeeModel } from '../models/employee.ts'
export const createEmployee = (req: Request, res: Response) => {
    createEmployeeModel(req.body)
        .then((data) => res.status(200).json(data))
        .catch((error) => handlePrismaError(error, res))
}
