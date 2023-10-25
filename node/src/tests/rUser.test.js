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
        
        expect(res.status).toBe(401);
    })

    it('Login to Account', async ()=>{
        const response = await request.post('/login/login').send({email:'e@evil.com', pass:'e'})
        
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

/* Change username tests
    - No token
    - Change username
*/
describe('Change username', ()=>{
    it('Try to change without a token', async ()=> {
        const res = await request.post('/user/changename').send({username: 'ICantDoThis'})
        expect(res.status).toBe(401);

    })

    it('Change name', async()=>{
        const res = await request.post('/user/changename').set('authorization', token).send({username:"CoolName"})
        expect(res.status).toBe(200);
    })
})

/* Summary tests 
    - Send wrong format for dates -> 400
    - Request a summary when we have 0 workouts available -> 404?
    - Request a summary with flipped dates -> 400
    - Request a summary with valid dates -> 200 and summary
*/
describe('Summary Tests', ()=>{
    it('Invalid date format', async ()=> {
        const res = await request.post('/user/wsum').set('authorization', token).send({start:"notdata", end:"notdata"});

        expect(res.status).toBe(400);
    })

    it('No Workouts to look at', async ()=>{
        const off = Date.now() + (1000*60*60*24*20);
        const res = await request.post('/user/wsum').set('authorization', token).send({start:0, end:1});

        expect(res.status).toBe(204);
    })

    it('Dates in wrong order', async () => {
        const off = Date.now() + (1000*60*60*24*20);
        const dif = 1000*3600*24
        const res = await request.post('/user/wsum').set('authorization', token).send({start:off+dif, end:off});

        expect(res.status).toBe(416);
    })


    it('Valid summary generation', async () => {
        const time = Date.now()+1000000;
        const res = await request.post('/user/wsum').set('authorization', token).send({start:0, end:time});

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('summary')

    })
})
