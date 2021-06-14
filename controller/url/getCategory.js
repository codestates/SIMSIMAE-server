module.exports = async (req, res) => {
    const { category, like, gender, age, location} = req.body
    res.send({category, like, gender, age, location})
}
