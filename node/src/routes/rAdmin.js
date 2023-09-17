// Routes to be used for development / admin reasons
const express = require('express');
const bodyParser = require('body-parser');

const AdminController = require('../controllers/cAdmin');
const sutil = require('../util/sutil.js');
const { Motion } = require('../models/mWorkout');
const AdminRouter = express.Router();

AdminRouter.use(bodyParser.json());

const REQUIRED_KEYS = {
    "/addM": ["name", "pg", "sg", "desc"],
    "/remM": ["name"],
    "/lsM": true
}

AdminRouter.use('', (req,res,next) => {
    sutil.Verify(req.body,REQUIRED_KEYS[req.path], next);
})

AdminRouter.post('/addM', (req,res,next)=>{
    AdminController.AddMotion(req,res,next);
})
AdminRouter.post('/remM', (req,res,next)=>{
    AdminController.RemoveMotion(req,res,next);
})

AdminRouter.get('/rm', (req,res,next)=>{
    AdminController.RemoveAll(res);
})

AdminRouter.get('/lsM', (req,res,next)=>{
    AdminController.ListMotions(req,res,next);
})


module.exports = {AdminRouter: AdminRouter}