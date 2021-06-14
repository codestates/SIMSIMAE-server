const { restart } = require('nodemon');
const { User } = require('../../models');


module.exports = async (req,res) => {
    //받는거 locaion, age, 
    const { email, password, name, phone } = req.body
    //유저 필수 항목 정보만 DB에 저장
    const createUser = await User.create({
        email,
        password,
        name,
        phone,
        status : true,
        created_at : new Date(),
        updated_at : new Date()
    })
    if(createUser){
        res.status(201).send({email, name, phone}) 
    } else{
        res.status(404).send('sign-up error')
    }
}  


// 회원가입완료 후 / 관심사 체크 > 분기점을 만들어야하지않을까? 
// 사인업을하고 userlike라는 히스토리로 이동하게한 뒤 거기서 만들어진 유저에 추가적으로 데이터를 넣어주고 
// 카테고리에도 아이디를 넣게끔..? 찾아서 없으면 생성해주는 findOrCreate를 써주면 될 것같다. 
// 회원가입버튼 1번 / 관심사 입력버튼 1번 2번의 클릭이벤트를 줄 수 있음 
// 그렇다면 회원가입버튼 클릭 후 signUp post 요청을 보낸 뒤 엔드포인트가 /userLikes 라는 엔드포인트로 이동하게 기능을 구현하고
// 거기서 관심사 선택 후 한번더 post 요청을 보내 req.body에 담겨있는선택항목들을 findOneCreate를 이용해 데이터가없으면 생성해주게끔 하면 되지않을까? 
// 들어가야할 곳 (User의 gender, age, location) (user_category의 user_id, category_id )
