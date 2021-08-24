const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    account_balance: { type: Number, required: true, default: 0 }
});

module.exports = mongoose.model('Account', accountSchema);