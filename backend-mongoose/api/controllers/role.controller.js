const Role = require('../models/Role.js');
const User = require('../models/User.js');

const createRole = async (req, res) => {
    const { role_name, role_description } = req.body;

    try {
        const roleExists = await Role.findOne({ role_name: role_name });
        if (roleExists) {
            res.status(400).json({ error: "Role Already Exist..." });
            return;
        }

        const newRole = new Role({
            role_name: role_name,
            role_description: role_description
        });

        const role = await newRole.save();
        res.status(201).json(role);
        return;
    } catch (err) {
        res.status(500).json({ error: err.stack });
        return;
    }
}

const getRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.status(200).json(roles);
        return;
    } catch (err) {
        res.status(500).json({ error: err.stack });
        return;
    }
}

const getRole = async (req, res) => {
    const { id } = req.params;

    try {
        const role = await Role.find({ _id: id });
        if (!role) {
            res.status(404).json({ error: 'Role Not Found...' });
            return;
        }

        res.status(200).json(role);
        return;
    } catch (err) {
        res.status(500).json({ error: err.stack });
        return;
    }
}

const updateRole = async (req, res) => {
    const { id } = req.params;
    const { role_name, role_description } = req.body;

    try {
        const roleExists = await Role.findOne({ _id: id });
        if (!roleExists) {
            res.status(404).json({ error: 'Role Not Found' });
            return;
        }

        const updateRole = await Role.updateOne({ _id: id }, { role_name: role_name, role_description: role_description });
        res.status(204).json(updateRole);
        return;
    } catch (err) {
        res.status(500).json({ error: err.stack });
        return;
    }
}

const deleteRole = async (req, res) => {
    const { id } = req.params;

    try {
        const roleExists = await Role.findOne({ _id: id });
        if (!roleExists) {
            res.status(404).json({ error: 'Role Not Found' });
            return;
        }

        const deleteRole = await Role.deleteOne({ _id: id });
        res.status(204).json(deleteRole);
        return;
    } catch (err) {
        res.status(500).json({ error: err.stack });
        return;
    }
}

const grantRole = async (req, res) => {
    const { user_id, role_id } = req.body;

    try {
        const userExists = await User.findOne({ _id: user_id });
        if (!userExists) {
            res.status(404).json({ error: "User Not Found" });
            return;
        }

        const roleExists = await Role.findOne({ _id: role_id });
        if (!roleExists) {
            res.status(404).json({ error: "Role Not Found" });
            return;
        }

        const grantRole = await User.updateOne({ _id: user_id }, { role: role_id });
        res.status(204).json(grantRole);
        return;
    } catch (err) {
        res.status(500).json({ error: err.stack });
        return;
    }
}

const revokeRole = async (req, res) => {
    const { user_id } = req.body;

    try {
        const userExists = await User.findOne({ _id: user_id });
        if (!userExists) {
            res.status(404).json({ error: "User Not Found" });
            return;
        }

        const revokeRole = await User.updateOne({ _id: user_id }, { role: null });
        res.status(204).json(revokeRole);
        return;
    } catch (err) {
        res.status(500).json({ error: err.stack });
        return;
    }
}


module.exports.createRole = createRole;
module.exports.getRoles = getRoles;
module.exports.getRole = getRole;
module.exports.updateRole = updateRole;
module.exports.deleteRole = deleteRole;
module.exports.grantRole = grantRole;
module.exports.revokeRole = revokeRole;
