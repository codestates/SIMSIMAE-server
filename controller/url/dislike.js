module.exports = async (req, res) => {
    const {email, url} =req.body;
    res.send({email, url})

}