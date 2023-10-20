
const request = require('./setupTests');


const user = {email: 'jester@jest.jest', pass:'badasdasdasdasdasd'};
// Signup testing
describe('Testing Signup', () => {
    //Dont signup
    it('Incorrect Email Format', async () => {
        const signup = {email: 'bad', pass:'notabadpassword'};
        const response = await request.post('/login/signup').send(signup)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toBe('No email provided')
        
    });

    //Dont signup
    it('Bad Password Format', async () => {
        const signup = {email: 'good@email', pass:'bad'};
        const response = await request.post('/login/signup').send(signup)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toBe('too short of password')
        
    });

    //Dont signup
    it('In Use Email', async () => {
        const signup = {email: 'admin@a', pass:'badasdasdasdasdasd'};
        const response = await request.post('/login/signup').send(signup)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toBe('Email already exists! try logging in')
        
    });

    //Signup
    it('Good Data', async () => {
        const signup = user
        
        const response = await request.post('/login/signup').send(signup)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('created')
        expect(response.body.created).toBe(true)
        
    });

});


// Login Testing
describe('Test Login', () => {
    //Dont signin
    it('Wrong Password', async () => {
        const login = {email:user.email, pass:'notmypassword'};
        const response = await request.post('/login/login').send(login)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toBe('Passwords not a match')
        
    });

    //Dont signin
    it('Wrong Email', async () => {
        const login = {email: 'jester@jest.jesticles',pass:user.pass};
        const response = await request.post('/login/login').send(login)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toBe('There is no user with that email')
        
    });

    var token = null; // save this for later
    //Actually signin
    it('Good Login', async () => {
        const login = user;
        const response = await request.post('/login/login').send(login)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('access_token')
        token = response.body.access_token
        
    });

    //Delete the account
    it('Delete Account ', async () => {
        const response = await request.post('/login/delete').set('authorization', token)
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('deleted')
        expect(response.body.deleted).toBe(true)
        
    });
});





