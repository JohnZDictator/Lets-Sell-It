// const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User.js');

const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
        image: req.file
    });

    res.status(200).json({ response: newUser });

}

module.exports.createUser = createUser;