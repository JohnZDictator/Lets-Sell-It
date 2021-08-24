const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    bio: { type: String },
    image: { type: mongoose.Schema.Types.Map }
});

module.exports = mongoose.model('User', userSchema);