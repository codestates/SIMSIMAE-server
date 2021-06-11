module.exports = async (req, res) => {
    const {category, like, password, gender, age, location} = req.body
    res.send({category, like, password, gender, age, location})
}