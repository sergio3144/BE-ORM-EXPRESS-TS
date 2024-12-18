/* import request from 'supertest'
import server from '../server'

describe('GET /api', () => {
  it('shoulds send back a json response', async () => {
    const res = await request(server).get('/api')
    
    expect(res.status).toBe(200)
    console.log(res.status)

    expect(res.status).not.toBe(404)
    expect(res.body.msg).not.toBe('Desde API')
  })
})
 */

