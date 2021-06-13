const { Url } = require('../../models');
const { Dislikes } = require('../../models');

module.exports = async (req, res) => {

    //싫어요 누르면 url 테이블에서 url과 일치하는 id 찾아와서
    //DisLikes 테이블에 넣기
    const {userId, url} = req.body;
    //console.log('userId', userId, url)
    /*
    //id를 클라이언트쪽에서 받아오면 필요없는 쿼리문
    const userId = await User.findOne({
        where: {id: userId},
        attributes: ['id']
    })
    */

    const urlId = await Url.findOne({
        where: {url: url},
        attributes: ['id']
    })
    console.log('urlId', urlId.id)

    await Dislikes.create({
        url_id: urlId.id,
        user_id: userId    
    })

    res.send('success');
}