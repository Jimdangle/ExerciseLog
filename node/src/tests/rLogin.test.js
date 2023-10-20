
const { sign } = require('jsonwebtoken');
const request = require('./setupTests');


const user = {email: 'jester@jest.jest', pass:'badasdasdasdasdasd'};
// Send a bad email
describe('Testing Signup', () => {
    it('Bad email for signup should not work', async () => {
        const signup = {email: 'bad', pass:'notabadpassword'};
        const response = await request.post('/login/signup').send(signup)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toBe('No email provided')
        
    });

    it('Bad password for signup should not work', async () => {
        const signup = {email: 'good@email', pass:'bad'};
        const response = await request.post('/login/signup').send(signup)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toBe('too short of password')
        
    });

    it('Trying to signup with a in use email should not work', async () => {
        const signup = {email: 'admin@a', pass:'badasdasdasdasdasd'};
        const response = await request.post('/login/signup').send(signup)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toBe('Email already exists! try logging in')
        
    });

    it('Sending Legit Signup Data should work', async () => {
        const signup = user
        
        const response = await request.post('/login/signup').send(signup)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('created')
        expect(response.body.created).toBe(true)
        
    });

});


// Login failure 
describe('Test Login', () => {
    it('Sending the wrong password', async () => {
        const login = {email:user.email, pass:'notmypassword'};
        const response = await request.post('/login/login').send(login)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toBe('Passwords not a match')
        
    });

    it('Sending the wrong email', async () => {
        const login = {email: 'jester@jest.jesticles',pass:user.pass};
        const response = await request.post('/login/login').send(login)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toBe('There is no user with that email')
        
    });

    var token = null; // save this for later

    it('Sending correct info', async () => {
        const login = user;
        const response = await request.post('/login/login').send(login)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('access_token')
        token = response.body.access_token
        
    });

    it('Should delete account for jest ', async () => {
        const response = await request.post('/login/delete').set('authorization', token)
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('deleted')
        expect(response.body.deleted).toBe(true)
        
    });
});





