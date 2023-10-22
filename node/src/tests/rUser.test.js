/* Need to test 
    user info,
    change username,
    summary data,
*/

const request = require('./setupTests');
var token = null

/* User Info Tests
    - Fail at getting user id
    - Signin
    - Get user id 
*/
describe('User Info', () => {
    it('Try to get our user data with no token', async()=>{
        const res = await request.get('/user/info')
        
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message')
    })

    it('Login to Account', async ()=>{
        const response = await request.post('/login/login').send({email:'admin@a', pass:'a'})
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('access_token')
        token = response.body.access_token
    })

    it('Get user id from request', async()=> {
        const res = await request.get('/user/info').set('authorization',token)
        
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('user')
    })
})