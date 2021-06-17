const { Url } = require('../../models');


module.exports = async (req, res) => {
    const randomId = Math.floor(Math.random()*100)+1
    //Url 테이블에서 랜덤으로 뽑아오기
    const url = await Url.findOne({where :randomId , attributes:['url']});

    //무작위 랜덤 QR code 
    res.status(200).send(`https://chart.apis.google.com/chart?cht=qr&chs=250x250&chl=${url.url}`)
}
