const { Url } = require('../../models');
const { Dislikes } = require('../../models');
const jwt = require('jsonwebtoken');
const { user_category } = require('../../models');

module.exports = async (req, res) => {
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

      //로그인한 유저의 랜덤 
      //유저가 dislike한 url id를 찾는다. (-> 배열로 만든다.)
      //url -> while문 작성  >> 배열에 포함되는지 안되는지 
      //dislike 배열에 요소과 일치하면 다시 반복문 돌리고
      //일치하지 않으면 반복문 종료 후 해당 url을 보낸다. 
      const findDislikeId = await Dislikes.findAll({
          where: {user_id: data.id},
          attributes: ['url_id']
      })
      console.log('findId', findDislikeId)
      
      const dislikeArr = findDislikeId.map(el => {
          return el.url_id
      })
      //console.log('arr', dislikeArr)

      //유저가 선택한 관심사 카테고리 id에 포함이 되는지 확인해서
      //포함이 되면 뱉어주고
      //안되면 다시 랜덤 id 부여 받기 

      //카테고리 id 찾기 
      //카테고리id를 갖는 배열 
      const findCategoryId = await user_category.findAll({
          where: {user_id: data.id},
          attributes: ['category_id']
      })
      const getCategoryArr = findCategoryId.map(el => {
          return el.category_id
      })

      //url의 카테고리 아이디랑 포함되는지 않되는지 
      console.log('getCategory', getCategoryArr)

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
