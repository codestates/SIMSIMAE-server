const { User } = require('../../models');


module.exports = async (req,res) => {
    const { email, password, name, phone } = req.body
    const createUser = await User.create({
        email,
        password,
        name,
        phone
      })
    const conflictMail = await User.findOne({ where: { email }})
     
    if(createUser){
         res.status(201).send({email, name, phone}) 
     }else if(conflictMail){
        res.status(409).send('이미 존재하는 이메일 입니다.')
    }else{
        err => err
    }


}  


// 일반회원가입
// email password name phone을 필수로 받음 
// 위 내용이 데이터베이스에 저장이되어야함 
// 관심사 선택사항도 같이 받아야함...?
// 코드리팩토링 필요함 포스트맨으로 받아야하는데 아직 에러처리안해줬음
// 