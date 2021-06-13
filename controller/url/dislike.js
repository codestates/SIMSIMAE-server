const { Url } = require('../../models');
const { Likes } = require('../../models');
const { User } = require('../../models')

module.exports = async (req, res) => {

    //싫어요 누르면 url 테이블에서 url과 일치하는 id 찾아와서
    //DisLikes 테이블에 넣기
    const {email, url} = req.body;

    const userId = await User.findOne({
        where: {email: email},
        attributes: ['id']
    })
   
    const urlId = await Url.findOne({
        where: {url: url},
        attributes: ['id']
    })

    await DisLikes.create({
        user_id: userId,
        url_id: urlId
    })
    res.send({
        message: 'success'
    })
}