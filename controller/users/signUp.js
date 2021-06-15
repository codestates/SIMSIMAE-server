const { urlencoded } = require('express');
const { User } = require('../../models');
const { Category } = require('../../models');
const { user_category} = require('../../models');

module.exports = async (req,res) => {
    
    const { email, password, name, phone, gender, age, location, favorite } = req.body
    //일반회원가입 , 소셜회원가입
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
                        //console.log('2nd', err)
                    }   
                }
                return findcategory;
                
            } catch(err) {
                //console.log(err)
            }        
        })
        res.status(201).send('회원가입이 완료되었습니다.')
    }
}  



