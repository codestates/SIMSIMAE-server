const { urlencoded } = require('express');
const { User } = require('../../models');
const { Category } = require('../../models');
const { user_category} = require('../../models');

module.exports = async (req,res) => {
    
    const { email, password, name, phone, gender, age, location } = req.body
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
    if(createUser){
        res.status(201).send({email, name, phone}) 
    } else{
        res.status(404).send('sign-up error')
    }
    
    // 유저가 선택한 관심사 
    const { favorite } = req.body  // 배열 [name으로 들어옴]

    favorite.map(async (name)=> {       
        const findcategory = await Category.findAll({  
            where : { name : name } ,  attributes : ['id']
        })
        const userFavorite = await user_category.create({
             user_id : createUser.dataValues.id, 
             category_id : findcategory.dataValues.id 
        })
    

         
        console.log(findcategory);
        console.log(userFavorite , 'user');
        return userFavorite;

    })
      
     res.send(favorite)

}  


// 유저가 회원가입시 선택한 관심사 (카테고리의 네임 총 5개)을 토대로 
// 카테고리 아이디를 찾아 user_category에 저장해야한다. 