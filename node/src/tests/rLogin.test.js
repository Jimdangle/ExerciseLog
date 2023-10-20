
const { sign } = require('jsonwebtoken');
const request = require('./setupTests');

// Send a bad email
describe('Testing Bad Email', () => {
    it('Should return a message about failed signup', async () => {
        const signup = {email: 'bad', pass:'notabadpassword'};
        const response = await request.post('/login/signup').send(signup)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toBe('No email provided')
        
    });
});

// send a bad password
describe('Testing Bad Password', () => {
    it('Should return a message about failed signup', async () => {
        const signup = {email: 'good@email', pass:'bad'};
        const response = await request.post('/login/signup').send(signup)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toBe('too short of password')
        
    });
});

// send a in use email 
describe('Testing In Use Email', () => {
    it('Should return a message about failed signup', async () => {
        const signup = {email: 'admin@a', pass:'badasdasdasdasdasd'};
        const response = await request.post('/login/signup').send(signup)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toBe('Email already exists! try logging in')
        
    });
});

//Good signup
const user = {email: 'jester@jest.jest', pass:'badasdasdasdasdasd'};
describe('Testing Make a new account', () => {
    it('Should created===true', async () => {
        const signup = user
        
        const response = await request.post('/login/signup').send(signup)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('created')
        expect(response.body.created).toBe(true)
        
    });
});


// Login failure 
describe('Test Login with new Account', () => {
    it('Sending the wrong password', async () => {
        const login = {email:user.email, pass:'notmypassword'};
        const response = await request.post('/login/login').send(login)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toBe('Passwords not a match')
        
    });
});

//Wrong email
describe('Test Login with new Account', () => {
    it('Sending the wrong email', async () => {
        const login = {email: 'jester@jest.jesticles',pass:user.pass};
        const response = await request.post('/login/login').send(login)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toBe('There is no user with that email')
        
    });
});

//Good Login
var token = null; // save this for later
describe('Test Login with new Account', () => {
    it('Sending correct info', async () => {
        const login = user;
        const response = await request.post('/login/login').send(login)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('access_token')
        token = response.body.access_token
        
    });
});

// Delete the account
describe('Deleting Account', () => {
    it('Should delete account for jest ', async () => {
        const login = user;
        const response = await request.post('/login/delete').set('authorization', token)
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('deleted')
        expect(response.body.deleted).toBe(true)
        
    });
});



