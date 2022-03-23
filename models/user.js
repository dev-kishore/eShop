const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username: { type: String, required: [true, "Username is required!"] },
    email: { type: String, required: [true, "Email is required!"] },
    phone: { type: Number, required: [true, "Phone number is required!"] },
    address: { type: String, required: [true, "Address is required!"] },
    password: { type: String, required: [true, "Password is required!"] },
    cart: { type: Array, default: [] },
    orders: { type: Array, default: [] },
    cancelledOrders: { type: Array, default: [] },
    processedOrders: { type: Array, default: [] }
}, { collection: 'users' })


const userModel = mongoose.model('user', userSchema)


module.exports = userModel