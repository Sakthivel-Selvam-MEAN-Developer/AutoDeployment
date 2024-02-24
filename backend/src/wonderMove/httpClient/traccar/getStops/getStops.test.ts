import nock from 'nock'
import configs from '../../../../config.ts'
import getStops from './index.ts'
import traccarStop from './sampleStopData.ts'

const mockApiCall = () => {
    const url = configs.traccarUrl || ''
    return nock(url)
        .get('/reports/stops')
        .basicAuth({
            user: configs.traccarUsername || '',
            pass: configs.traccarPassword
        })
        .query({
            deviceId: '3',
            from: '2023-09-11T18:30:00.000Z',
            to: '2023-09-10T18:30:00.000Z'
        })
        .reply(200, [traccarStop])
}

describe.skip('traccar client', () => {
    it('should call traccar server for given vehicle and time range', async () => {
        const scope = mockApiCall()
        const deviceId = 3
        const from = 1694457000
        const to = 1694370600
        const stops = await getStops(deviceId, from, to)
        expect(stops).toHaveLength(1)
        expect(stops).toContainEqual(traccarStop)
        expect(scope.isDone()).toBeTruthy()
    })
})
