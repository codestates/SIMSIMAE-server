const { Url } = require('../../models');
const { Likes } = require('../../models');

module.exports = async (req, res) => {
    const {userId, url} = req.body;

    //Url 테이블에서 urlId 찾기
    const urlId = await Url.findOne({
        where: {url: url},
        attributes: ['id']
    })
    
    //Likes 테이블에 데이터 생성
    await Likes.create({
        url_id: urlId.dataValues.id,
        user_id: userId    
    })
    
    res.status(200).send('success');
}