import { Response } from 'express'
import { Prisma } from '@prisma/client'
import { handlePrismaError } from './errorHandler.ts'

describe('handlePrismaError', () => {
    let res: Response

    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response
    })

    test('should handle P2002 error code', () => {
        const error = {
            code: 'P2002',
            meta: { target: 'uniqueField' }
        } as unknown as Prisma.PrismaClientKnownRequestError

        handlePrismaError(error, res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({
            error: 'Duplicate field value at field :  uniqueField'
        })
    })

    test('should handle P2014 error code', () => {
        const error = {
            code: 'P2014',
            meta: { target: 'idField' }
        } as unknown as Prisma.PrismaClientKnownRequestError

        handlePrismaError(error, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({
            error: 'Invalid ID at field idField'
        })
    })

    test('should handle P2003 error code', () => {
        const error = {
            code: 'P2003',
            meta: { target: 'inputField' }
        } as unknown as Prisma.PrismaClientKnownRequestError

        handlePrismaError(error, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({
            error: 'Invalid input data at field inputField'
        })
    })

    test('should handle WW001 error code', () => {
        const error = {
            code: 'WW001'
        } as Prisma.PrismaClientKnownRequestError

        handlePrismaError(error, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({
            error: 'There is No Trip Salary Details for Specified Locations'
        })
    })

    test('should handle unknown error code', () => {
        const error = {
            code: 'UNKNOWN'
        } as Prisma.PrismaClientKnownRequestError

        handlePrismaError(error, res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ error })
    })
})
