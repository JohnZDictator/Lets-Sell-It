const bcrypt = require('bcryptjs');

// Importing our gridfs-stream
const init = require('../../services/gridfs_stream.js');

// Importing our Models
const User = require('../models/User.js');

const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (name || email || password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
            image: req.file
        });

        try {
            const user = await newUser.save();
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({ error: e });
        }
    } else {
        res.status(500).json({ error: "Input not Valid" });
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "My Bad" })
    }
}

const getUser = async (req, res) => {
    try {
        const gfs = await init();
        const files = await gfs.files.find().toArray();
        res.json(files);
    } catch (err) {

    }
}

const updateUser = async (req, res) => {
    try {

    } catch (err) {

    }
}

const deleteUser = async (req, res) => {
    try {

    } catch (err) {

    }
}

module.exports.createUser = createUser;
module.exports.getUsers = getUsers;
module.exports.getUser = getUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;