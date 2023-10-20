// setupTests.js
require('dotenv').config();
process.env.SERVER_PORT = 3002

const {server} = require('../../server'); // Import your Express app
const supertest = require('supertest');
const request = supertest(server);

beforeAll(async()=>{
    await new Promise((resolve)=>{
        server.on('listening', resolve)
    })
})


// After all tests have completed, stop the server
afterAll((done) => {
  server.close(()=>{done();})
});

module.exports = request; // Export the request object for use in your tests
