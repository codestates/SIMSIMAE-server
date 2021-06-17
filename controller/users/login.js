const { User } = require('../../models');
const jwt = require('jsonwebtoken');


module.exports = async (req, res) => {
  const { email, password } = req.body

  //User 테이블에서 유저 정보 찾기 
  const userInfo = await User.findOne({
    where: { 
      email: email,
      password: password,
    }
  });

  if (!userInfo) {
    // 일치하는 유저가 없을 경우
    res.status(401).send('not authorized');
  } else if(!userInfo.status) {
    //탈퇴한 유저인 경우
    res.status(404).send('탈퇴한 유저입니다.');
  } else {
    const { id, email, name, phone, gender, age, location, created_at } = userInfo;
    const accessToken = jwt.sign({ id, email, name, phone, gender, age, location, created_at }, process.env.ACCESS_SECRET, {
      expiresIn: '1h',
    });
    const refreshToken = jwt.sign({ id, email, name, phone, gender, age, location, created_at  }, process.env.REFRESH_SECRET, {
      expiresIn: '10h',
    });
    // 생성된 refresh token을 쿠키에 담아 보내기
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


