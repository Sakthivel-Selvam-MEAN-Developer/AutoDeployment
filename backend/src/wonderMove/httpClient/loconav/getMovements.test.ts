import nock from 'nock'
import configs from '../../../config'
import getMovements from './getMovements'

const movement = {
    latitude: 15.012927,
    longitude: 78.014107,
    orientation: 318.0,
    speed: 0.0,
    time: 1698315362,
    speed_with_unit: {
        value: 0.0,
        unit: 'km/h'
    }
}
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
        expect(movements.status).toBeTruthy()
        expect(movements.data.movements).toContainEqual(movement)
        expect(scope.isDone()).toBeTruthy()
    })
})
