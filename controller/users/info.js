const { User } = require('../../models');
const { Category } = require('../../models');
const { user_category } = require('../../models');
const { Url } = require('../../models');
const { Likes } = require('../../models');

const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  //req 헤더의 authorization에 access token이 담겨온다.
  const { authorization } = req.headers;
  //console.log('authorization', authorization)
  if(!authorization) {
      //header authoriaztion에 토큰이 담겨있지 않을 때
      res.status(403).send('invalid access token');
  } else {
    const token = authorization.split(' ')[1]
    //token 디코딩
    const data = jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
      if(err) {
          //토큰을 받아 왔지만 잘못된 토큰인 경우
          res.status(403).send('invalid access token')
      } else {
          return decoded
      }
    })

    console.log('data', data)

    const userInfo = await User.findOne({
        where: { email: data.email }
    })
    if(!userInfo) {
        res.status(403).send('access totken has been tempered')
    } else {
        delete userInfo.dataValues.password
        
        //user_category랑 Category를 연결한다.
        //user id와 일치하는 category name을 가져온다.

        //유저 id를 가지고 유저가 저장한 category id 찾는다.
        //category id로 category name을 찾는다.
        const favoriteCate = await user_category.findAll({
          include: [
            {
              model: Category,
              attributes: ['name']
            }
          ],
          where: {user_id: data.id}
        })
        console.log('favorite', favoriteCate);

        const likeUrl = await Url.findAll({
          include: [
            {
              model: Likes,
           
            }
          ]
        })
        console.log('likeUrl', likeUrl)
        
        res.send({
          userInfo: userInfo.dataValues,
          //favorite: favoriteCate,
          //likeUrl: likeUrl
        })
    }
  }
}