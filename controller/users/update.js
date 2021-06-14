module.exports = async (req, res) => {
    const { category, like} = req.body
    res.send({category, like})
}