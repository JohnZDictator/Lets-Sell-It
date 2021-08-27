const User = require('../models/User.js');
const Role = require('../models/Role.js');
const Product = require('../models/Product.js');

const isSellerOrAdmin = async (req, res, next) => {
    const { sub } = req.user;

    try {
        const user = await User.findOne({ _id: sub });
        if (!user) {
            res.status(404).json({ error: 'User Not Found...' });
            return;
        }

        const { role } = user;
        const roleExists = await Role.findOne({ _id: role });
        if (roleExists.role_name === 'SELLER') {
            next();
        } else if (roleExists.role_name === 'ADMIN') {
            // This condition is for this application only
            // If the customer is not a seller check it if it is Admin 
            // Our admin can do anything or get resources on anything...
            next();
        } else {
            res.status(401).json({ error: 'UnAuthorized User' });
            return;
        }
    } catch (err) {
        res.status(500).json({ error: err.stack });
        return;
    }
}

const isAdmin = async (req, res, next) => {
    const { sub } = req.user;

    try {
        const user = await User.findOne({ _id: sub });
        if (!user) {
            res.status(404).json({ error: 'User Not Found...' });
            return;
        }

        const { role } = user;
        const roleExists = await Role.findOne({ _id: role });
        if (roleExists.role_name === 'ADMIN') {
            next();
        } else {
            res.status(401).json({ error: 'UnAuthorized User' });
            return;
        }
    } catch (err) {
        res.status(500).json({ error: err.stack });
        return;
    }
}

const isProductOwner = async (req, res, next) => {
    const { id } = req.params;
    const product_owner = req.user.sub;

    try {
        const productExists = await Product.findOne({ _id: id });
        if (!productExists) {
            res.status(404).json({ error: 'Product Not Found...' });
            return;
        }
        const isOwner = productExists.product_owner == product_owner;
        if (!isOwner) {
            res.status(401).json({ error: 'You are not an owner of this product...' });
            return;
        }
        next();
    } catch (err) {
        res.status(500).json({ error: err.stack });
        return;
    }
}


module.exports.isSellerOrAdmin = isSellerOrAdmin;
module.exports.isAdmin = isAdmin;
module.exports.isProductOwner = isProductOwner;