import nock from 'nock'
import configs from '../../../config.ts'
import getAllVehicleDetails from './getAllVehicleDetails.ts'
import { vehicleDetail } from './sampleVehicleDetails.ts'

const mockApiCall = () => {
    const url = configs.ktTelematicsUrl || ''
    return nock(url)
        .matchHeader('X-AT-AccessToken', 'authToken')
        .get('/pandc/list')
        .reply(200, {
            success: true,
            results: [vehicleDetail]
        })
}
describe.skip('kt telematics client for get vehicle details', () => {
    it('should get all vehicle details exists in kt telematics db', async () => {
        const scope = mockApiCall()
        const vehicleDetails = await getAllVehicleDetails('authToken')
        expect(vehicleDetails).toContainEqual(vehicleDetail)
        expect(scope.isDone()).toBeTruthy()
    })
})
