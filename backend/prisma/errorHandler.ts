import { Response } from 'express'
import { Prisma } from '@prisma/client'

export interface ErrorMessageFunction {
    (error?: Prisma.PrismaClientKnownRequestError): string
}
export interface ErrorConfig {
    returnCode: number
    message: ErrorMessageFunction
}
export interface CodeErrorMessageMap {
    [key: string]: ErrorConfig
}

export interface HandlePrismaErrorFunction {
    (err: Prisma.PrismaClientKnownRequestError, res: Response): void
}

const codeErrorMessageMap: CodeErrorMessageMap = {
    P2002: {
        returnCode: 500,
        message: (error) => `Duplicate field value at field :  ${error?.meta?.target}`
    },
    P2014: {
        returnCode: 400,
        message: (error) => `Invalid ID at field ${error?.meta?.target}`
    },
    P2003: {
        returnCode: 400,
        message: (error) => `Invalid input data at field ${error?.meta?.target}`
    },
    WW001: {
        returnCode: 400,
        message: () => 'There is No Trip Salary Details for Specified Locations'
    }
}
export const handlePrismaError = (err: any, res: Response) => {
    const prismaError = err as Prisma.PrismaClientKnownRequestError
    const errorConfig = codeErrorMessageMap[prismaError.code]
    console.log(err)
    if (errorConfig) {
        res.status(errorConfig.returnCode).json({ error: errorConfig.message(prismaError) })
    } else {
        res.status(500).json({ error: 'Something went Wrong' })
    }
}
