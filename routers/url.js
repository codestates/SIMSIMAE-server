const express = require('express');
const router = express.Router();

const { urlController } = require('../controller');

// post /url/like
router.post('/like', urlController.like);

// post /url/dislike
router.post('/dislike', urlController.dislike);

// get /url
router.get('/', urlController.Url);

//get /url/userurl
router.get('/userurl', urlController.userUrl);


module.exports = router;



