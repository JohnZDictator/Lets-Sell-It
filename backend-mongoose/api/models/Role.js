const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    role_name: { type: String, required: true },
    role_description: { type: String, required: true }
});

module.exports = mongoose.model('Role', roleSchema);