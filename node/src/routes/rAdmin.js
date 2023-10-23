// Routes to be used for development / admin reasons
const express = require('express');
const bodyParser = require('body-parser');

const AdminController = require('../controllers/cAdmin');
const AdminRouter = express.Router();

AdminRouter.use(bodyParser.json());



const REQUIRED_KEYS = {
    "/wipe": true,
    "/load": true,
    "/cl": ["model_name"]
}

AdminRouter.get('/wipe', AdminController.Wipe)
AdminRouter.post('cl', AdminController.ClearModel)
AdminRouter.get('/load', AdminController.Load)
module.exports = {AdminRouter: AdminRouter}