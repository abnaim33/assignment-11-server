const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Pending"
    },
    orderDate: {
        type: Object,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("orders", ordersSchema);
