const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const bcrypt = require('bcrypt');

const handleLogin = (req, res) => {
    const { user, password} = req.body;
    if (!user || !password) return res.status(400).json({'message':'Username and password required'})
    const foundUser = usersDB.users.find(person => person.username === user);
    console.log(foundUser);
}

module.exports = {handleLogin};