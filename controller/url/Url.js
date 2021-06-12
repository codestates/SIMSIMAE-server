const { Url } = require('../../models');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { response } = require('express');
// const CircularJson = require('circular-json');

module.exports = async (req, res) => {
  
    const randomId = Math.floor(Math.random()*100)+1
    const url = await Url.findOne({where :randomId , attributes:['url']});
    // console.log(typeof(url.url));
    

    axios.get(`https://chart.apis.google.com/chart?cht=qr&chs=150x150&chl=${url.url}`)
    .then(response => {
      // res.setHeader('image','png');
      // res.send(response)
      console.log(`https://chart.apis.google.com/chart?cht=qr&chs=150x150&chl=${url.url}`)
    }).catch(err =>
        err )
    
}


// https://chart.googleapis.com/chart?cht=qr&chs=150x150&chl=


// qr코드를 생성하여 url 데이터를 담아 유저에게 보내주는 로직 
// 회원이아닐경우 랜덤으로 데이터를 가져온다 


