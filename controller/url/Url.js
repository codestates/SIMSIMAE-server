const { Url } = require('../../models');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { response } = require('express');


module.exports = async (req, res) => {
    const randomId = Math.floor(Math.random()*100)+1
    const url = await Url.findOne({where :randomId , attributes:['url']});
    // console.log(typeof(url.url));

    //무작위 랜덤 QR code 
    res.send('<img src=`https://chart.apis.google.com/chart?cht=qr&chs=150x150&chl=${url.url}` />');
}


// https://chart.googleapis.com/chart?cht=qr&chs=150x150&chl=
//구글 api 안되면 대안으로 쓸 것
//https://api.qrserver.com/v1/create-qr-code/?data=HelloWorld&amp;size=100x100

// qr코드를 생성하여 url 데이터를 담아 유저에게 보내주는 로직 
// 회원이아닐경우 랜덤으로 데이터를 가져온다 


