const bcrypt = require('bcryptjs');

// Importing our gridfs-stream
const init = require('../../services/gridfs_stream.js');

// Importing our Models
const User = require('../models/User.js');

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
        return;
    } catch (err) {
        res.status(500).json({ error: "My Bad" })
        return;
    }
}

const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findOne({ _id: id });
        if (!user) {
            res.status(404).json({ error: 'User Not Found...' });
            return;
        }

        res.status(200).json(user);
        return;
    } catch (err) {
        res.status(500).json({ error: err.stack });
        return;
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, bio, role } = req.body;

    try {
        const userExists = await User.findOne({ _id: id });
        if (!userExists) {
            res.status(404).json({ error: 'User Not Found...' });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const updateUser = await User.updateOne({ _id: id }, { name: name, email: email, password: hashedPassword, bio: bio, role: role });
        res.status(204).json(updateUser);
        return;
    } catch (err) {
        res.status(500).json({ error: err.stack });
        return;
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const userExists = await User.findOne({ _id: id });
        if (!userExists) {
            res.status(404).json({ error: 'User Not Found...' });
            return;
        }

        const deleteuser = await User.deleteOne({ _id: id });
        res.status(204).json(deleteUser);
        return;
    } catch (err) {
        res.status(500).json({ error: err.stack });
        return;
    }
}


module.exports.getUsers = getUsers;
module.exports.getUser = getUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;