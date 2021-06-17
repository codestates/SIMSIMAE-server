module.exports = async (req, res) => {
    const { accessToken } = req.body;
    
    if(!accessToken) {
        res.status(400).send('bad request')
    } else {
        res.status(200).send('logout success')
    }
}