const { Category } = require('../../models');
const { user_category} = require('../../models');

module.exports = async (req, res) => {
    const { userId, favorite } = req.body

    if(!Array.isArray(favorite)){
        //favorite이 안들어왔을 때
        res.status(400).send('올바른 요청이 아닙니다.')
    } else {
        //user_category 테이블에서 해당 user 삭제 
        await user_category.destroy({ 
            where : { user_id : userId } 
        }) 

        favorite.map(async (name)=> {       
            try {
                //Category 테이블에서 category_id 찾기 
                const findcategory = await Category.findOne({  
                    where : { name : name } ,  attributes : ['id']
                })
                
                if(findcategory) {
                    try {
                        //user_category 테이블에 관심사 추가 
                        const newFavorite = await user_category.create({
                            user_id : userId, 
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
        res.status(201).send( favorite )
    }
}

    



// 관심사 수정 및 업데이트 