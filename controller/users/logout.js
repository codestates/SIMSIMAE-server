module.exports = async (req, res) => {
    res.send('로그아웃이 완료되었습니다')
}


// /logout endpoint로 accesstoken을 서버로 보낸다 
// 서버에서 유저 확인이되면 메세지만 null 값으로 바꾸라는 응답을 보낸다 
// 실제 유저의 accesstoken 상태 업데이트는 클라이언트에서 null 값으로 바꿔준다. 
//  