const { User } = require('../../models');


module.exports = async (req,res) => {
    const { email, password, name, phone } = req.body
    const createUser = await User.create({
        email,
        password,
        name,
        phone,
        status : true,
        created_at : new Date(),
        updated_at : new Date()

      })
    const conflictMail = await User.findOne({ where: { email }})

    const userLikes = await User.findOrCreate()
     
    if(createUser){
         res.status(201).send({email, name, phone}) 
     }else if(conflictMail){
        res.status(409).send('이미 존재하는 이메일 입니다.')
    }else{
        err => err
    }


}  


// 회원가입완료 후 / 관심사 체크 > 분기점을 만들어야하지않을까? 
// 사인업을하고 userlike라는 히스토리로 이동하게한 뒤 거기서 만들어진 유저에 추가적으로 데이터를 넣어주고 
// 카테고리에도 아이디를 넣게끔..? 찾아서 없으면 생성해주는 findOrCreate를 써주면 될 것같다. 

