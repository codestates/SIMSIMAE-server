const { Url } = require('../../models');
const { Likes } = require('../../models');

module.exports = async (req, res) => {
    const {userId, url} = req.body;

    //좋아요 누르면 url 테이블에서 url과 일치하는 id 찾아와서
    //Likes 테이블에 넣기
    const urlId = await Url.findOne({
        where: {url: url},
        attributes: ['id']
    })
    //console.log('urlId', urlId.id);
    await Likes.create({
        url_id: urlId.dataValues.id,
        user_id: userId    
    })
    res.status(200).send('success');
}