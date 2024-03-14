import { Router } from 'express'
import { createDriver } from '../controller/driver.ts'

const driver = (router: Router) => {
    router.post('/driver', createDriver)
}

export default driver
