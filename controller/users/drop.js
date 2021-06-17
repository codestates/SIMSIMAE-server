const { User } = require('../../models');


module.exports = async (req,res) => {
    const { email } = req.body
    const dropUser = await User.findOne({ 
        where: { email: email },
        attributes: ['id'] 
    })
   
    if(!dropUser) {
        res.status(404).send('not matched password')
    } else {
        await User.update({ status : false }, { where : { id : dropUser.id  } })
        res.status(200).send('complete to drop the user' )
    }
}


//유저 정보 비활성화 
