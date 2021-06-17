const { User } = require('../../models');
const { Category } = require('../../models');
const { user_category } = require('../../models');
const { Url } = require('../../models');
const { Likes } = require('../../models');
const jwt = require('jsonwebtoken');


module.exports = async (req, res) => {

  const { authorization } = req.headers;

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

    //User 테이블에서 일치하는 유저 찾기
    const userInfo = await User.findOne({
      where: { email: data.email }
    })

    if(!userInfo) {
      res.status(403).send('access totken has been tempered')
    } else {
      delete userInfo.password
      //user_category 테이블에서 category_id를 찾는다.
      const findCategoryId = await user_category.findAll({
        where: {user_id: data.id},
        attributes: ['category_id']
      })
      //category_id만 배열로 만들기
      const idArr = findCategoryId.map(el => {
        return el.category_id
      })
      
      //Category 테이블에서 category name 찾기
      const findCategoryName = await Category.findAll({
        where: {id: idArr},
        attributes: ['name']
      })
      //category name만 배열로 만들기
      const categoryArr = findCategoryName.map(el => {
        return el.name
      })
      
      //Likes 테이블에서 url_id 찾기
      const findUrlId = await Likes.findAll({
        where: {user_id: data.id},
        attributes: ['url_id']
      })
      //url_id만 배열로 만들기
      const urlIdArr = findUrlId.map(el => {
        return el.url_id
      })
      //Url 테이블에서 url 찾기
      const findUrlName = await Url.findAll({
        where: {id: urlIdArr},
        attributes: ['url']
      })
      //url만 배열로 만들기 
      const urlArr = findUrlName.map(el => {
        return el.dataValues.url
      })
      
      res.send({
        userInfo: userInfo.dataValues,
        favorite: categoryArr,
        likeUrl: urlArr
      })
      
    }
  }
}