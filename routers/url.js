const express = require('express');
const router = express.Router();

const { urlController } = require('../controller');

router.post('/like', urlController.like);

router.post('/dislike', urlController.dislike);

//비회원
router.get('/', urlController.Url);

//회원
//router.get('/')

module.exports = router;