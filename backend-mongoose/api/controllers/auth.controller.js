const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User.js');
const Role = require('../models/Role.js');

const register = async (req, res) => {
    const { name, email, password, bio, role, image } = req.body;

    try {
        const userExists = await User.findOne({ email: email });
        if (userExists) {
            res.status(400).json({ error: 'Email Already Exist...' });
            return;
        }

        if (role) {
            const roleExists = await Role.findOne({ _id: role });
            if (!roleExists) {
                res.status(404).json({ error: 'Role Not Found' });
                return;
            }
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
            bio: bio,
            role: role,
            image: image
        });

        const user = await newUser.save();
        res.status(201).json(user);
        return;
    } catch (err) {
        res.status(500).json({ error: err.stack });
        return;
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userExists = await User.findOne({ email: email });
        if (!userExists) {
            res.status(404).json({ error: 'User Not Found' });
            return;
        }

        const checkPassword = await bcrypt.compare(password, userExists.password);
        if (!checkPassword) {
            res.status(404).json({ error: 'User Not Found' });
            return;
        }

        const token = jwt.sign({ sub: userExists._id }, process.env.JWT_SECRET_KEY,);
        // res.header('Authorization', 'Bearer ' + token).send();
        res.status(201).json({ token: 'Bearer ' + token });
        return;
    } catch (err) {
        res.status(500).json({ error: err.stack });
        return;
    }

}


module.exports.register = register;
module.exports.login = login;