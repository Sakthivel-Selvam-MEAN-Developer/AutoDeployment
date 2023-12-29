import cleanData from './cleanDb.ts'

beforeEach(async () => {
    await cleanData()
})

afterAll(async () => {
    await cleanData()
})
