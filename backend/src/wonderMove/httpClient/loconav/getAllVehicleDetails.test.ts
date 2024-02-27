import nock from 'nock'
import configs from '../../../config.ts'
import getAllVehicleDetails from './getAllVehicleDetails.ts'
import { vehicleDetail } from './sampleVehicleDetails.ts'

const mockApiCall = () => {
    const url = configs.loconavUrl || ''
    return nock(url)
        .matchHeader('User-Authentication', 'authToken')
        .get('/v1/vehicles')
        .reply(200, {
            status: true,
            data: [vehicleDetail]
        })
}
describe('locanav client for get vehicle details', () => {
    it('should get all vehicle details exists in loconav db', async () => {
        const scope = mockApiCall()
        const vehicleDetails = await getAllVehicleDetails('authToken')
        expect(vehicleDetails).toContainEqual(vehicleDetail)
        expect(scope.isDone()).toBeTruthy()
    })
})
