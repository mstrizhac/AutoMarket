const dbManager = require("../storage/dbManager");
const User = require("../storage/models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email: email}).select('+password');

    if (!user) {
        return res.status(401).json({message: 'No such user'});
    }

    if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({message: 'Invalid password'});
    }

    const token = jwt.sign({
        email: user.email,
    }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    })

    return res.status(200).json({
        token: token
    });
}

const register = async (req, res) => {
    const {email, password, name, phone} = req.body;

    if (!email || !password || !name || !phone) return res.status(400).json({message: 'All data must be provided'});

    const user = await User.findOne({email: email})
    if (user) {
        return res.status(406).json({message: 'User already exists'});
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    const nUser = new User({
        name: name,
        phone: phone,
        email: email,
        password: hashedPassword
    });
    await nUser.save();

    const token = jwt.sign({

        email: nUser.email
    }, process.env.JWT_SECRET_KEY)

    return res.status(200).json({
        token: token
    });
}

const getUserByEmail = async (req, res) => {
    const {email} = req.params;

    const user = await User.findOne({email: email}).select('-password');

    if (!user) {
        return res.status(404).json({message: 'User not found'});
    }

    res.status(200).json(user);
};

const verify = async (req, res) => {
    return res.status(200).json({message: 'Suces'});
}

module.exports = {login, register, verify,getUserByEmail};