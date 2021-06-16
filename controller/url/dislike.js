const { Url } = require('../../models');
const { Dislikes } = require('../../models');

module.exports = async (req, res) => {

    //싫어요 누르면 url 테이블에서 url과 일치하는 id 찾아와서
    //DisLikes 테이블에 넣기 dislike
    const {userId, url} = req.body;
  
    const urlId = await Url.findOne({
        where: {url: url},
        attributes: ['id']
    })
    console.log('urlId', urlId.id)

    await Dislikes.create({
        url_id: urlId.id,
        user_id: userId    
    })

    res.status(200).send('success');
}