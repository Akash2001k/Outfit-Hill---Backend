const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    order_details: {
        title: {
            type: String,
            required: true
        },
        brand: {
            type: String,   
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        size: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["pending", "confirmed","dispatched", "delevered"],
            default: 'pending'
        },
        price: {
            type: Number,
            required: true
        }
    },
    user_id: {
        type: String,
        required: true
    },
    product_id: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    }
})

module.exports = mongoose.model("orders", orderSchema)
