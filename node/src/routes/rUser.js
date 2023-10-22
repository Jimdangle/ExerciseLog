const express = require('express');
const bodyParser = require('body-parser');


const sutil = require('../util/sutil.js');
const UserController = require('../controllers/cUser.js')


const UserRouter = express.Router(); // create our router object

const REQUIRED_KEYS = {
    "/info" : true,
    "/changename": ["username"],
    "/wsum": ["start", "end"]
}


UserRouter.use(bodyParser.json());

// Verify our JWT fist on this router
UserRouter.use('', (req,res,next) => {
    res.locals.bodyData = req.body
    sutil.ValidateToken(req,res,next);
})

// Check keys
UserRouter.use('', (req, res, next) => {
    sutil.Verify(req.body, REQUIRED_KEYS[req.path], next);
});

UserRouter.get('/info', UserController.GetUser);
UserRouter.post('/wsum', UserController.GetWholeSummary)

UserRouter.post('/changename', UserController.ChangeUsername);

module.exports = {UserRouter:UserRouter}