const User = require('../models/User');

exports.getAllUsers = async(req, res, next) => {
    res.send("User List")
}

exports.createNewUser = async (req, res, next) => {
    let {name} = req.body;
    let user = new User(name)
    user = await user.save()

    console.log(user)
    res.send('Create user')
}

exports.getUserById = async(req, res, next) => {
    res.send("Get post By Id Route");
}