const { User } = require('../../models');


module.exports = async (req,res) => {
    const { email, password } = req.body
    //User 테이블에서 유저정보 가져오기
    const dropUser = await User.findOne({ 
        where: { email: email },
        attributes: ['id', 'password' ] 
    })
    
    if(dropUser.password !== password) {
        //비밀번호가 일치하지 않을 때
        res.status(404).send('not matched password')
    } else {
        //User 테이블에 정보 업데이트
        await User.update({ status : false }, { where : { id : dropUser.id  } })
        
        res.status(200).send('complete to drop the user' )
    }
}


//유저 정보 비활성화 
