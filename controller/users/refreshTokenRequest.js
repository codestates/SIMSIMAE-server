const { User } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    const { refreshToken } = req.cookies;
 
    if(!refreshToken) {
        //토큰이 담겨져 있지 않을 경우
        res.status(400).send('refresh token not provided');
    } else {
        const data = jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
            if(err) {
                //유효하지 안는 refresh token일 때
                res.status(403).send('invalid refresh token, please log in again')
            } else {
                return decoded
            }
        }) 

        //User 테이블 일치하는 유저 찾기
        const userInfo = await User.findOne({
            where : {email: data.email}
        })

        if(!userInfo) {
            res.status(404).send('refresh token has been tempered')
        } else {
            delete userInfo.dataValues.password;
            let payload = {...userInfo.dataValues}
            const accessToken = jwt.sign(payload, process.env.ACCESS_SECET)
            res.send({            
                accessToken: accessToken,
                userInfo: userInfo.dataValues
            })
        }
    }
}