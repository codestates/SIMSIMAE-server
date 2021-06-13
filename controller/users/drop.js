const { response } = require('express');
const { User } = require('../../models');


module.exports = async (req,res) => {
    const { email, password } = req.body
    const dropUser = await User.findOne({ 
        where: { email: email, password : password},
        attributes: ['id', 'password' ] 
    })
   
    if(!dropUser.password) {
        res.status(404).send('비밀번호가 일치하지 않습니다.')
    } else {
        await User.update({status : false}, {where : {id : dropUser.id }})
        res.status(200).send('회원 탈퇴가 완료되었습니다.' )
    }

    }


//유저 정보 비활성화 