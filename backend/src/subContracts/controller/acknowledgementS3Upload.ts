import { NextFunction, Request, Response } from 'express'
import { createMulterMiddleware } from './acknowledgementUpload'
export const handleFileUpload = async (req: Request, res: Response, next: NextFunction) => {
    const uploadMiddleware = await createMulterMiddleware('image', {
        companyName: req.query.companyName,
        invoiceNumber: req.query.invoiceNumber
    })
    await uploadMiddleware(req, res, (err: any) => {
        console.log(err)
        next()
    })
}
