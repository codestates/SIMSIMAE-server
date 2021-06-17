const { Url } = require('../../models');
const { Dislikes } = require('../../models');

module.exports = async (req, res) => {

    const {userId, url} = req.body;
    
    //Url 테이블에서 urlId 찾기
    const urlId = await Url.findOne({
        where: {url: url},
        attributes: ['id']
    })

    //Dislikes 테이블에 데이터 생성
    await Dislikes.create({
        url_id: urlId.id,
        user_id: userId    
    })

    res.status(200).send('success');
}