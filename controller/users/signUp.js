const { User } = require('../../models');


module.exports = async (req,res) => {
    const { email, password, name, phone,  } = req.body
    //유저 필수 항목 정보만 DB에 저장
    const createUser = await User.create({
        email,
        password,
        name,
        phone,
        status : true,
        created_at : new Date(),
        updated_at : new Date()
    })

    //user_category 
    const conflictMail = await User.findOne({ where: { email }})
     
    if(createUser){
         res.status(201).send({email, name, phone}) 
     }else if(conflictMail){
        res.status(409).send('이미 존재하는 이메일 입니다.')
    }else{
        err => err
    }

}  


