const User = require('../models/User');

exports.getAllUsers = async(req, res, next) => {
    try {
        const [users, _] = await User.findAll()
        res.status(200).json({users})
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.createNewUser = async (req, res, next) => {
    try{
        let {name} = req.body;
        let user = new User(name)
        user = await user.save()
    
        res.status(201).json({message: "User Created"})
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getUserById = async(req, res, next) => {
    try {
        let userId = req.params.id;
        let [user, _] = await User.findById(userId)
        res.status(200).json({user: user[0]})
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.findUserByName = async(req, res, next) => {
    try {
        let {name} = req.body
        let [user, _] = await User.findByName(name)
        res.status(200).json({user: user[0]})
    } catch (error) {
        console.log(error);
        next(error);
    }
}