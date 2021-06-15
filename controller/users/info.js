const { User } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  //req 헤더의 authorization에 access token이 담겨온다.
  const { authorization } = req.headers;
  console.log('authorization', authorization)
  if(!authorization) {
      //header authoriaztion에 토큰이 담겨있지 않을 때
      res.status(404).send('invalid access token');
  } else {
    const token = authorization.split(' ')[1]
    //token 디코딩
    const data = jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
      if(err) {
          //토큰을 받아 왔지만 잘못된 토큰인 경우
          res.status(404).send('invalid access token')
      } else {
          return decoded
      }
    })
    const userInfo = await User.findOne({
        where: { email: data.email }
    })
    if(!userInfo) {
        res.status(403).send('access totken has been tempered')
    } else {
        delete userInfo.dataValues.password
        res.send({userInfo: userInfo.dataValues})
    }
  }
}