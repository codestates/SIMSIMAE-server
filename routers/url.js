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



// 유저가 비회원일때 
// 랜덤 큐알만 보낸다 

// 유저가 회원일때
// 회원가입시 선택한 관심사 안에서 랜덤큐알을 보낸다 
// 큐알을받은 회원은 라이크 디스라이크 중에 선택할 수있다. 
// 라이크된 큐알은 마이페이지의 관심큐알에 저장이된다. 
// 추후 회원이 로그인하여 관심큐알에있는 큐알을 클릭하면 이전에했던 곳으로 사이트 이동이 가능하다. 
// 디스라이크된 큐알에 저장된 url 데이터는 추후 회원이 다시 큐알을 생성하게 버튼을 눌러도 나오면 안된다. 
