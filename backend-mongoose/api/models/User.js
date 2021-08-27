const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    product_ids: { type: [mongoose.Schema.Types.ObjectId], ref: "Product", required: true },
    transaction_date: { type: Date, required: true }
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    bio: { type: String },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
    image: { type: mongoose.Schema.Types.Map },
    transactions: transactionSchema
});

module.exports = mongoose.model('User', userSchema);