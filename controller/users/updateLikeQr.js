const { Url } = require('../../models');
const { Likes} = require('../../models');

module.exports = async (req, res) => {
    const { id, url } = req.body

    if(!url){
        res.status(400).send('올바른 요청이 아닙니다.')
    } else {
        const findUrlId = await Url.findOne({
            where : { url : url }, atrributes : ['id']
        })

        const deleteLikes = await Likes.destroy({ 
            where : { user_id : id , url_id : findUrlId.id } 
        }) 
    }
    
      res.status(200).send('요청이 올바르게 완료되었습니다.')

    }

    



// 관심사 수정 및 업데이트 