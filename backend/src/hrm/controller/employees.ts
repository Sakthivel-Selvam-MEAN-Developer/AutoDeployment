import { Request, Response } from 'express'
import { getEmployeeName } from '../models/employee.ts'

export const getEmployeeDetails = (req: Request, res: Response) => {
    getEmployeeName(req.params.employeeId).then((employee) => res.status(200).json(employee))
}
