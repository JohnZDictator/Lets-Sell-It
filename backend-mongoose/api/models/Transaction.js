const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products_ids: { type: [mongoose.Schema.Types.ObjectId], ref: "Product", required: true },
});

module.exports = mongoose.model('Transaction', transactionSchema);