const express = require('express');
const router = express.Router();

const { usersController } = require('../controller');

// post /user/login 
router.post('/login', usersController.login);

// post /user/logout
router.post('/logout', usersController.logout);

// post /user/signup
router.post('/signup', usersController.signUp);

// post /user/update
router.post('/update', usersController.update);

// post /user/drop
router.post('/drop', usersController.drop);

// post /user/doublecheck
router.post('/conflictemail', usersController.conflictEmail);

// get /user/info
router.get('/info', usersController.info);

// get /user/refreshtokenrequest
router.get('/refreshtokenrequest', usersController.refreshTokenRequest);

module.exports = router; 
