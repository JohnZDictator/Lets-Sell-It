const jwt = require('jsonwebtoken');

const User = require('../models/User.js');

const verify = async (req, res, next) => {
    try {
        const token = req.header('Authorization').split(' ')[1];
        if (!token) {
            res.status(400).send('Access Denied');
            return;
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const { sub } = verified;

        const userExists = await User.findOne({ _id: sub });
        if (!userExists) {
            res.status(404).json({ error: 'User Not Found...' });
            return;
        }

        req.user = verified;
        next();
    } catch (err) {
        res.status(401).send('Invalid Token');
        return;
    }
}


module.exports = verify;