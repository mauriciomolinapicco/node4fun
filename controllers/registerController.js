const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req,res) => {
    const {user, password} = req.body;
    if (!user || !password) {
        return res.status(400).json({'message':'Username and password needed'})
    }
    // check for duplicate usernames in bd
    //console.log(usersDB.users)
    const duplicate = await User.findOne({ username:user }).exec();
    if (duplicate) return res.sendStatus(409);

    try {
        //encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10) //10 is the SALT
        //create and store new user
        const result = await User.create({
            "username": user,
            "password":hashedPassword
        });

        console.log(result);

        res.status(201).json({'Success':`New user ${user} created`})
    } catch (err) {
        res.status(500).json({'message':err.message})
    }
}

module.exports = {handleNewUser};