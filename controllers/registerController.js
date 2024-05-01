const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req,res) => {
    const {user, password} = req.body;
    
    if (!user || !password) {
        return res.status(400).json({'message':'Username and password needed'})
    }
    // check for duplicate usernames in bd
    //console.log(usersDB.users)
    const duplicate = JSON.parse(usersDB.users).find(person => person.username === user);
    if (duplicate) return res.sendStatus(409);

    try {
        //encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10) //10 is the SALT
        //store new user
        const newUser = {"username": user, "password":hashedPassword};
        usersDB.setUsers([...usersDB.users, newUser])
        await fsPromises.writeFile(
            path.join(__dirname, '..','model', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        res.status(201).json({'Success':`New user ${user} created`})
    } catch (err) {
        res.status(500).json({'message':err.message})
    }
}

module.exports = {handleNewUser};