const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    reviewText: {
        type: String,
        required: true,
    },

    userImage: {
        type: String,
        required: true

    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("reviews", reviewsSchema);
