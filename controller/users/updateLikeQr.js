const { Url } = require('../../models');
const { Likes} = require('../../models');

module.exports = async (req, res) => {
    const { userId, url } = req.body

    if(!url) {
        //url을 받지 않은 경우
        res.status(400).send('올바른 요청이 아닙니다.')
    } else {
        //Url 테이블에서 url_id 찾기
        const findUrlId = await Url.findOne({
            where : { url : url }, atrributes : ['id']
        })

        //Likes 테이블에서 삭제
        await Likes.destroy({ 
            where : { user_id : userId , url_id : findUrlId.id } 
        }) 
    }
    res.status(200).send('요청이 올바르게 완료되었습니다.')
}

    



// 관심사 수정 및 업데이트 