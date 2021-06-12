const { User } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    const { refreshToken } = req.cookies;
    console.log('resfresh', refreshToken)
    if(!refreshToken) {
        res.status(400).send('refresh token not provided');
    } else {
        const data = jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
            if(err) {
                res.status(403).send('invalid refresh token, please log in again')
            } else {
                return decoded
            }
        }) 

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