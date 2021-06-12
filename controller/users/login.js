module.exports = async (req, res) => {
    const {email, password} = req.body;
    res.send({
        email, password
    })
}



// const { Users } = require('../../models');
// const jwt = require('jsonwebtoken');


// module.exports = async (req, res) => {
//   const userInfo = await Users.findOne({
//     where: { 
//       email: req.body.email, 
//       password: req.body.password 
//     }
//   });

//   if (!userInfo) {
//     // 일치하는 유저가 없을 경우
//     res.status(400).json({ 
//       data: null, 
//       message: 'not authorized' 
//   });
//   } else {
//     // 일치하는 유저가 있을 경우
//     // access token, refresh token 두가지를 생성
//     const { id, email, createdAt } = userInfo;
//     const accessToken = jwt.sign({ id, userId, email, createdAt }, process.env.ACCESS_SECRET, {
//       expiresIn: '1h',
//     });
//     const refreshToken = jwt.sign({ id, userId, email, createdAt}, process.env.REFRESH_SECRET, {
//       expiresIn: '10h',
//     });
//     // 생성된 refresh token을 쿠키에 담아줍니다
//     res.cookie('refreshToken', refreshToken, {
//       sameSite: 'none',
//       secure: true, 
//       httpOnly: true
//     });
//     res.status(200).json({
//       data: {
//         accessToken
//       }, 
//       message: 'ok'
//     });
//   }
// };
