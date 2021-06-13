module.exports = async (req, res) => {
    const {email, password} = req.body;
    
    res.send({email, password})
}