const { Category } = require('../../models');
const { user_category} = require('../../models');

module.exports = async (req, res) => {
    const { id, favorite } = req.body

    // 유저의 기존 관심사 데이터를 모두 삭제 
  
     
    // post 요청으로 새로 들어온 관심사 카테고리 데이터를 생성 

    if(!Array.isArray(favorite)){
        res.status(400).send('올바른 요청이 아닙니다.')
    } else {

        const currentCategory = await user_category.destroy({ 
            where : { user_id : id } 
        }) 

        favorite.map(async (name)=> {       
            try {
                const findcategory = await Category.findOne({  
                    where : { name : name } ,  attributes : ['id']
                })
                
                if(findcategory) {
                    console.log('find', findcategory.id);
                    try {
                        const newFavorite = await user_category.create({
                            user_id : id, 
                            category_id : findcategory.dataValues.id 
                       })
                       console.log('user', newFavorite );
                    } catch(err) {
                        //console.log('2nd', err)
                    }
                    
                }
                return findcategory;
                
            } catch(err) {
                //console.log(err)
            }          
        })
        res.status(201).send( favorite )
    }
}

    



// 관심사 수정 및 업데이트 