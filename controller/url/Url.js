const { Url } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    const url = await Url.findOne({where: {id:1}});
    console.log(url.url);
    res.send(url.url);
}