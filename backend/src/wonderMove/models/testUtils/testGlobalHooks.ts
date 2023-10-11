import cleanData from './cleanDb'

beforeEach(async () => {
    await cleanData()
})

afterAll(async () => {
    await cleanData()
})
