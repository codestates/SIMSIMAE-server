const express = require('express');
const router = express.Router();

const { usersController } = require('../controller');

//login, logout, drop, updtate, signup, 
//accesstokenrequest, refreshtokenrequest, info

router.post('/login', usersController.login);

router.post('/logout', usersController.logout);

router.post('/signup', usersController.signUp);

router.post('/update', usersController.update);

router.post('/drop', usersController.drop);

router.get('/drop', usersController.info);

router.get('/accesstokenrequest', usersController.accessTokenRequest);

router.get('/refreshtokenrequest', usersController.refreshTokenRequest);

module.exports = router;