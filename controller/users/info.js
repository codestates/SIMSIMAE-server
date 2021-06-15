const { User } = require('../../models');
const { Category } = require('../../models');
const { user_category } = require('../../models');
const { Url } = require('../../models');
const { Likes } = require('../../models');
const jwt = require('jsonwebtoken');


/*
const initModels = require('../../models/init-models');
const models = initModels
const User = models.User
console.log(User)
const Category = models.Category
const user_category = models.user_category
const Likes = models.Likes
*/


module.exports = async (req, res) => {
  //req 헤더의 authorization에 access token이 담겨온다.
  const { authorization } = req.headers;
  //console.log('authorization', authorization)
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

    console.log('data', data)

    const userInfo = await User.findOne({
        where: { email: data.email }
    })
    if(!userInfo) {
        res.status(403).send('access totken has been tempered')
    } else {
        delete userInfo.dataValues.password

      
        //유저 id를 가지고 유저가 저장한 category id 찾는다.
        //category id로 category name을 찾는다.
        const findCategoryId = await user_category.findAll({
          where: {user_id: data.id},
          attributes: ['category_id']
        })
        const idArr = findCategoryId.map(el => {
          return el.dataValues.category_id
        })
        
        const findCategoryName = await Category.findAll({
          where: {id: idArr},
          attributes: ['name']
        })
        //console.log('findName',findCategoryName)

        const categoryArr = findCategoryName.map(el => {
          return el.dataValues.name
        })

        //좋아요를 누른 qr의 url을 보내준다. 
        //유저가 좋아요한 url id를 찾는다.
        //url id로 url에서 url을 찾는다. 
        const findUrlId = await Likes.findAll({
          where: {user_id: data.id},
          attributes: ['url_id']
        })
        const urlIdArr = findUrlId.map(el => {
          return el.dataValues.url_id
        })
        
        const findUrlName = await Url.findAll({
          where: {id: urlIdArr},
          attributes: ['url']
        })
        //console.log('findName',findCategoryName)

        const urlArr = findUrlName.map(el => {
          return el.dataValues.url
        })

        res.send({
          userInfo: userInfo.dataValues,
          favorite: categoryArr,
          likeUrl: urlArr
        })
        


        //user_category랑 Category를 연결한다.
        //user id와 일치하는 category name을 가져온다.
        /*
        const favoriteCate = await user_category.findAll({
          include: [
            {
              model: Category,
              attributes: ['name']
            }, 
            {
              model: User,
              attributes: ['id', 'email']
            }
          ]        
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
        */


        
    }
  }
}