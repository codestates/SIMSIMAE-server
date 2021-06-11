module.exports = async (req, res) => { 
    const { email, password, name, phone , gender, location, age } = req.body;
    
    res.send({
        email,
        password,
        name,
        phone,
        gender,
        location,
        age
    });
}