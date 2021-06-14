const { User } = require('../../models');

module.exports = async (req, res) => {
    const { email } = req.body

    const checkEmail = await User.count({ 
        where: {email: email}
    })
    if(checkEmail) {
        res.status(409).send('이미 존재하는 이메일 입니다.')
    } else {
        res.status(200).send('사용할 수 있는 이메일 입니다.')
    }
    
}