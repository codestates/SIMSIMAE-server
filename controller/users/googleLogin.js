const { User } = require('../../models');
const jwt = require('jsonwebtoken');


module.exports = async (req, res) => {
  const { email } =req.body;
  const userInfo = await User.findOne({
    where: { 
      email: email
    }
  });
  if (!userInfo) {
    // 일치하는 유저가 없을 경우
    res.status(401).send('not authorized');
  } else {
    // 일치하는 유저가 있을 경우   
    res.status(200).send({ message: 'vaild google login user' });
  }


};


//구글소셜로그인 버튼을 클릭한 유저는 DB에 등록되어 있는 이메일이 있는 지 확인뒤 
// 있으면 loginMain페이지로 렌더되고 
// 없으면 회원가입 관심사체크페이지로 넘어가게된다. 
// 이 때 서버측에서 구글 로그인시 클라이언트에서 바디에 이메일을 담아 주고 확인하여 응답을 보내준다. 
