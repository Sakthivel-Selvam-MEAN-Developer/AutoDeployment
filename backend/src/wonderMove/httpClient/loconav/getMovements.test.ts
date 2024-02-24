import nock from 'nock'
import configs from '../../../config.ts'
import getMovements from './getMovements.ts'
import { movement } from './loconavMovement.ts'

const mockApiCall = () => {
    const url = configs.loconavUrl || ''
    return nock(url)
        .matchHeader('User-Authentication', 'authToken')
        .get('/v1/vehicles/polyline')
        .query({
            device_id: '3',
            start_time: 1694457000,
            end_time: 1694370600
        })
        .reply(200, {
            status: true,
            data: {
                movements: [movement]
            }
        })
}

describe('loconav client', () => {
    it('should call loconav movements api for given vehicle and time range', async () => {
        const scope = mockApiCall()
        const deviceId = 3
        const from = 1694457000
        const to = 1694370600
        const movements = await getMovements(deviceId, from, to, 'authToken')
        expect(movements).toContainEqual(movement)
        expect(scope.isDone()).toBeTruthy()
    })
})
