const request = require('./setupTests');


//Get our account
var token = null;
describe('Signin To an Account', ()=>{
    
    it('Signin to admin Account', async ()=>{
        const response = await request.post('/login/login').send({email:'admin@a', pass:'a'})
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('access_token')
        token = response.body.access_token
    })

    
})

// Do some basic actions on workouts
describe('Workout Actions', ()=> {
    it('Fail to add workout (no token)', async ()=> {
        const response = await request.post('/workout/add')

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toBe('no token recieved');
        workout_id = response.body.id
    })

    var workout_id = null;
    it('Add a new Workout', async ()=> {
        const response = await request.post('/workout/add').set('authorization',token)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('created')
        expect(response.body).toHaveProperty('id')
        expect(response.body.created).toBe(true);
        workout_id = response.body.id
    })

    it('Get the new workout', async()=>{
        const response = await request.post('/workout/get').set('authorization',token).send({workout_id:workout_id})

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('workout')
    })



    it('Delete the new Workout', async()=> {
        const response = await request.delete('/workout/delete').set('authorization', token).send({workout_id:workout_id})
        
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('deleted')
        expect(response.body.deleted).toBe(true)
        
    })
})


// Do some actions on adding and removing exercises
describe('Exercise Actions', ()=>{
    var motion_id = null
    it('Get a list of possible exercises', async()=>{
        const response = await request.get('/motion/lsa').set('authorization', token)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('motions')
        expect(response.body.motions.length).toBeGreaterThan(0)

        motion_id = response.body.motions[0]._id
    })

    var workout_id = null;
    it('Add a new Workout', async ()=> {
        const response = await request.post('/workout/add').set('authorization',token)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('created')
        expect(response.body).toHaveProperty('id')
        expect(response.body.created).toBe(true);
        workout_id = response.body.id
    })

    it('Add an wrong exercise', async()=>{
        const res = await request.post('/workout/addEx').set('authorization', token).send({workout_id: workout_id, motion_id: 'abcdefg'})

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message')
    })

    it('Add in a real exercise', async()=>{
        const res = await request.post('/workout/addEx').set('authorization', token).send({workout_id:workout_id, motion_id:motion_id})
        
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('added')
        expect(res.body.added).toBe(true);
        
    })
})