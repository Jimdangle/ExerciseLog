const request = require('./setupTests');


/* Sign in to our account
*/
var token = null;
describe('Signin To an Account', ()=>{
    
    it('Signin to admin Account', async ()=>{
        const response = await request.post('/login/login').send({email:'e@evil.com', pass:'e'})
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('access_token')
        token = response.body.access_token
    })

    
})

/* Workout Tests
    - Try to add a workout as a non user
    - Create a new workout
    - Get the workout data
    - Delete an invalid workout
    - Delete a real workout
    - Try to delete again (should return false)
    * Add a test for editing workout name
*/
describe('Workout Actions', ()=> {
    it('Fail to add workout (no token)', async ()=> {
        const response = await request.post('/workout/add')

        expect(response.status).toBe(401);
        
    })

    var workout_id = null;
    it('Add a new Workout', async ()=> {
        const response = await request.post('/workout/add').set('authorization',token)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('created')
        expect(response.body).toHaveProperty('workout_id')
        expect(response.body.created).toBe(true);
        workout_id = response.body.workout_id
    })

    it('Get the new workout', async()=>{
        const response = await request.post('/workout/get').set('authorization',token).send({workout_id:workout_id})

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('workout')
    })

    it('Delete a invalid Workout', async()=> {
        const response = await request.delete('/workout/delete').set('authorization', token).send({workout_id:"notarealone"})
        
        expect(response.status).toBe(500)
        
        
    })

    it('Delete the new Workout', async()=> {
        const response = await request.delete('/workout/delete').set('authorization', token).send({workout_id:workout_id})
        
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('deleted')
        expect(response.body.deleted).toBe(true)
        expect(response.body).toHaveProperty('workout_id')
        
    })

    it('Try to delete it again', async () => {
        const response = await request.delete('/workout/delete').set('authorization', token).send({workout_id:workout_id})
        
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('deleted')
        expect(response.body.deleted).toBe(false)
        expect(response.body).toHaveProperty('workout_id')
    })
})


/* Exercise Tests
    - Get a list of all exercises
    - Add a new workout
    - Add a exercise that does not exist
    - Add a real exercise
    - Remove an invalid exercise
    - Remove the actaul exercise from the workout
 */
var motion_id   = null
var workout_id  = null
var exercise_id = null
describe('Exercise Actions', ()=>{
    
    it('Get a list of possible exercises', async()=>{
        const response = await request.get('/motion/lsa').set('authorization', token)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('motions')
        expect(response.body.motions.length).toBeGreaterThan(0)

        motion_id = response.body.motions[0]._id
    })

    
    it('Add a new Workout', async ()=> {
        const response = await request.post('/workout/add').set('authorization',token)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('created')
        expect(response.body).toHaveProperty('workout_id')
        expect(response.body.created).toBe(true);
        workout_id = response.body.workout_id
    })

    it('Add a wrong exercise', async()=>{
        const res = await request.post('/workout/addEx').set('authorization', token).send({workout_id: workout_id, motion_id: 'abcdefg'})

        expect(res.status).toBe(500);
        
    })

    it('Add in a real exercise', async()=>{
        const res = await request.post('/workout/addEx').set('authorization', token).send({workout_id:workout_id, motion_id:motion_id})
        
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('added')
        expect(res.body.added).toBe(true);
        expect(res.body).toHaveProperty('exercise_id')
        exercise_id = res.body.exercise_id
        
    })

    it('Get the exercise', async()=>{
        const res = await request.post('/workout/getEx').set('authorization',token).send({exercise_id:exercise_id})
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('exercise');
        expect(res.body).toHaveProperty('exercise_id');
        expect(res.body.exercise).toHaveProperty('sets')
    })

    it('Remove a invalid exercise', async()=>{
        const res = await request.delete('/workout/remEx').set('authorization', token).send({workout_id:workout_id, exercise_id: 'notanid'})

        expect(res.status).toBe(500);
        
    })

    it('Remove the exercise', async()=>{
        const res = await request.delete('/workout/remEx').set('authorization',token).send({workout_id:workout_id,exercise_id:exercise_id})

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('deleted')
        expect(res.body).toHaveProperty('exercise_id')
        expect(res.body).toHaveProperty('workout_id')

        expect(res.body.deleted).toBe(true)
    })
})

/* Set Tests
    - Add a set with bad data
    - Add a set with good data
    - Remove a invalid set
    - Remove a valid set
    - 
*/
describe('Set Tests', () => {
    var set_id = null;
    it('Add in a real exercise for the sets', async()=>{
        const res = await request.post('/workout/addEx').set('authorization', token).send({workout_id:workout_id, motion_id:motion_id})
        
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('added')
        expect(res.body.added).toBe(true);
        expect(res.body).toHaveProperty('exercise_id')
        exercise_id = res.body.exercise_id
    })

    //Invalid adds
    it('Add a set with bad rep data', async()=>{
        const res = await request.post('/workout/addSet').set('authorization', token).send({rep_or_time:"notanumber",weight:0,exercise_id:exercise_id})
        expect(res.status).toBe(422);
        
    })
    it('Add a set with bad weight', async()=>{
        const res = await request.post('/workout/addSet').set('authorization', token).send({rep_or_time:1,weight:"notanumber",exercise_id:exercise_id})
        expect(res.status).toBe(422);
        
    })
    it('Add a set with invalid exercise id', async()=>{
        const res = await request.post('/workout/addSet').set('authorization', token).send({rep_or_time:1,weight:1,exercise_id:"notid"})
        expect(res.status).toBe(400);
        
    })
    it('Add a set with out of range data', async()=>{
        const res = await request.post('/workout/addSet').set('authorization', token).send({rep_or_time:-1,weight:-1,exercise_id:exercise_id})
        expect(res.status).toBe(422);
        
    })


    it('Add a set good set', async()=>{
        const res = await request.post('/workout/addSet').set('authorization', token).send({rep_or_time:1,weight:1,exercise_id:exercise_id})
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('added')
        expect(res.body.added).toBe(true)
        expect(res.body).toHaveProperty('set_id')
        set_id=res.body.set_id;//store  the id
    })

    it('Remove a set with invalid set id', async()=>{
        const res = await request.delete('/workout/remSet').set('authorization', token).send({exercise_id:exercise_id, set_id:'notid'})
        expect(res.status).toBe(400)
        
    })
    it('Remove a set with invalid exercise id', async()=>{
        const res = await request.delete('/workout/remSet').set('authorization', token).send({exercise_id:'notide', set_id:set_id})
        expect(res.status).toBe(400)
        
    })

    it('Remove a set', async()=>{
        const res = await request.delete('/workout/remSet').set('authorization', token).send({exercise_id:exercise_id, set_id:set_id})
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('deleted')
        expect(res.body.deleted).toBe(true);
    })

    it('Remove the exercise', async()=>{
        const res = await request.delete('/workout/remEx').set('authorization',token).send({workout_id:workout_id,exercise_id:exercise_id})

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('deleted')
        expect(res.body).toHaveProperty('exercise_id')
        expect(res.body).toHaveProperty('workout_id')

        expect(res.body.deleted).toBe(true)
    })


})