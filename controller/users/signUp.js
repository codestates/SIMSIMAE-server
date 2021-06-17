const { urlencoded } = require('express');
const { User } = require('../../models');
const { Category } = require('../../models');
const { user_category} = require('../../models');

module.exports = async (req,res) => {
    
    const { email, password, name, phone, gender, age, location, favorite } = req.body
    //User 테이블에 회원 생성
    const createUser = await User.create({
        email,
        password,
        name,
        phone,
        status : true,
        gender,
        age, 
        location,
        created_at : new Date(),
        updated_at : new Date()
    })

    if(!createUser){
        //DB에 생성 실패했을 때
        res.status(404).send('sign-up error')
    } else {
        favorite.map(async (name)=> {       
            try {
                const findcategory = await Category.findOne({  
                where : { name : name } ,  attributes : ['id']
                })
            
                if(findcategory) {
                    try {
                        await user_category.create({
                            user_id : createUser.dataValues.id, 
                            category_id : findcategory.dataValues.id 
                        })
                    } catch(err) {
                        throw err
                    }   
                }
                return findcategory;
                
            } catch(err) {
                throw err
            }        
        })
        res.status(201).send('회원가입이 완료되었습니다.')
    }
}  



