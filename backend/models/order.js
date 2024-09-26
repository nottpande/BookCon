const mongoose = require("mongoose");

const order = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: "user",
        },
        username: {
            type: String,
            required: true,
        },
        book: {
            type: mongoose.Types.ObjectId,
            ref: "books",
        },
        bookname: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: "Order placed",
            enum: ["Order placed", "Out for delivery", "Delivered", "Canceled"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("order", order);
