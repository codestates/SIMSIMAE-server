const { User } = require('../../models');
const jwt = require('jsonwebtoken');


module.exports = async (req, res) => {
  const userInfo = await User.findOne({
    where: { 
      email: req.body.email,
      password: req.body.password
    }
  });
  
  if (!userInfo) {
    // 일치하는 유저가 없을 경우
    res.status(401).send('not authorized');
  } else {
    // 일치하는 유저가 있을 경우
    // access token, refresh token 두가지를 생성
    const { id, email, name, phone, gender, age, location, created_at } = userInfo;
    const accessToken = jwt.sign({ id, email, name, phone, gender, age, location, created_at }, process.env.ACCESS_SECRET, {
      expiresIn: '1h',
    });
    const refreshToken = jwt.sign({ id, email, name, phone, gender, age, location, created_at  }, process.env.REFRESH_SECRET, {
      expiresIn: '10h',
    });
    // 생성된 refresh token을 쿠키에 담아줍니다
    res.cookie('refreshToken', refreshToken, {
      sameSite: 'none',
      secure: true, 
      httpOnly: true
    });
    res.status(200).send({
      data: {
        accessToken
      }, 
      message: 'accessToken'
    });
  }


};




//token sprint 참고 : 유저가 이메일과 패스워드를 넣으면 데이터베이스와 일치하는지를 확인하고 토큰을 생성해준다. 
// controllers/login.js (POST /login)
// request로부터 받은 userId, password와 일치하는 유저가 DB에 존재하는지 확인합니다.
// 일치하는 유저가 없을 경우:
// 로그인 요청을 거절합니다.
// 일치하는 유저가 있을 경우:
// 필요한 데이터를 담은 두 종류의 JWT(access, refresh)를 생성합니다.
// 생성한 JWT를 적절한 방법으로 반환합니다.
// access token은 클라이언트에서 react state로 다루고 있습니다.
// refresh token은 클라이언트의 쿠키에서 다루고 있습니다.