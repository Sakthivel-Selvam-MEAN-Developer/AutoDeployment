import { Request, Response } from 'express'
import { handlePrismaError } from '../../../prisma/errorHandler'
import {
    create as createEmployeeModel,
    getAllEmployee,
    updateEmployee
} from '../models/employee.ts'

export const createEmployee = (req: Request, res: Response) => {
    createEmployeeModel(req.body)
        .then((data) => res.status(200).json(data))
        .catch((error) => handlePrismaError(error, res))
}

export const getAllEmployeeList = (_req: Request, res: Response) => {
    getAllEmployee()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}

export const updateEmployeeDetails = (req: Request, res: Response) => {
    const { id, data } = req.body
    updateEmployee(id, data)
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
