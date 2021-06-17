const { Url } = require('../../models');
const { Dislikes } = require('../../models');
const { user_category } = require('../../models');
const jwt = require('jsonwebtoken');


module.exports = async (req, res) => {
    const { authorization } = req.headers;

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

      //Dislikes 테이블에서 url_id 찾기
      const findDislikeId = await Dislikes.findAll({
        where: {user_id: data.id},
        attributes: ['url_id']
      })
      //url_id만 배열로 빼오기
      const dislikeArr = findDislikeId.map(el => {
        return el.url_id
      })
      //user_category 테이블에서 category_id 찾기
      const findCategoryId = await user_category.findAll({
        where: {user_id: data.id},
        attributes: ['category_id']
      })
      //category_id만 배열로 빼오기
      const getCategoryArr = findCategoryId.map(el => {
        return el.category_id
      })
      let randomId = Math.floor(Math.random()*100)+1  //> 1~100 90 
      const mathchCategoryId = await Url.findOne({
          where: {id: randomId},
          attributes: ['category_id']
      })
      while(dislikeArr.includes(randomId) && !getCategoryArr.includes(mathchCategoryId)) {
        randomId = Math.floor(Math.random()*100)+1 
      }
      const url = await Url.findOne({where :randomId , attributes:['url']});
      res.status(200).send(`https://chart.apis.google.com/chart?cht=qr&chs=250x250&chl=${url.url}`)
    }
  
}
