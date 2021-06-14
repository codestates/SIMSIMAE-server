const { restart } = require('nodemon');
const { User } = require('../../models');


module.exports = async (req,res) => {
    const { email, password, name, phone } = req.body
    console.log(req.body)
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
     
    if(createUser){
         res.status(201).send({email, name, phone}) 
    } else{
        res.status(404).send('sign-up error')
    }
}  


